import { expect, test } from "@playwright/test";

test("renders the complete portfolio without broken assets or horizontal overflow", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const failedResponses: string[] = [];
  page.on("response", (response) => {
    if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`);
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /espaços com essência/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /atmosferas que orientam/i })).toBeVisible();
  await expect(page.getByText("Não representam obras executadas.")).toBeVisible();

  const imageCount = await page.locator("img").count();
  expect(imageCount).toBe(4);
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("complete", true);
    expect(await image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  expect(failedResponses).toEqual([]);

  await page.screenshot({ fullPage: true, path: `artifacts/${test.info().project.name}-full.png` });
});

test("navigation and FAQ remain usable", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Serviços", exact: true }).click();
  await expect(page.locator("#servicos")).toBeInViewport();
  const question = page.getByText("É possível contratar apenas uma consultoria?");
  await question.scrollIntoViewIfNeeded();
  await question.click();
  await expect(page.getByText(/consultoria atende decisões pontuais/i)).toBeVisible();
});

test("switches between all five pseudo 3D miniatures", async ({ page }) => {
  await page.goto("/");
  const explorer = page.locator("#maquetes");
  await explorer.scrollIntoViewIfNeeded();
  await expect(page.getByRole("heading", { name: "Casa Pátio do Sertão" })).toBeVisible();
  await explorer.screenshot({ path: `artifacts/${test.info().project.name}-miniatures.png` });

  const scenes = [
    ["Fazenda", "Fazenda Boa Vista"],
    ["Apartamento", "Apartamento Entre Luzes"],
    ["Casa de praia", "Casa Duna"],
    ["Casa na cidade", "Casa Urbana 08"],
  ] as const;

  for (const [tab, title] of scenes) {
    await page.getByRole("tab", { name: new RegExp(tab, "i") }).click();
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
  }

  await expect(page.getByRole("img", { name: /maquete pseudo 3d: casa na cidade/i })).toBeVisible();
});
