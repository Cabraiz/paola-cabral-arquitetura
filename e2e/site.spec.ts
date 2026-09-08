import { expect, test } from "@playwright/test";

test("renders the complete portfolio without broken assets or horizontal overflow", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const failedResponses: string[] = [];
  page.on("response", (response) => {
    if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`);
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /imagine por inteiro/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /atmosferas que orientam/i })).toBeVisible();
  await expect(page.getByText("Não representam obras executadas.")).toBeVisible();

  const imageCount = await page.locator("img").count();
  expect(imageCount).toBe(4);
  for (const image of await page.locator("img").all()) {
    await image.evaluate((element) => element.scrollIntoView({ block: "center" }));
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

test("moves the realistic hero and switches all five miniatures", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("#inicio");
  await expect(page.getByText("Casa Pátio do Sertão", { exact: true })).toBeVisible();
  await hero.screenshot({ path: `artifacts/${test.info().project.name}-miniatures.png` });

  const stage = hero.locator(".showcase-stage");
  const model = stage.locator(".showcase-model");
  const initialTransform = await model.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  const bounds = await stage.boundingBox();
  expect(bounds).not.toBeNull();
  if (bounds) {
    await page.mouse.move(bounds.x + bounds.width * 0.75, bounds.y + bounds.height * 0.25);
    await expect
      .poll(() => model.evaluate((element) => getComputedStyle(element).transform))
      .not.toBe(initialTransform);
  }

  const scenes = [
    ["Fazenda", "Fazenda Boa Vista"],
    ["Apartamento", "Apartamento Entre Luzes"],
    ["Casa de praia", "Casa Duna"],
    ["Casa na cidade", "Casa Urbana 08"],
  ] as const;

  for (const [tab, title] of scenes) {
    await page.getByRole("tab", { name: new RegExp(tab, "i") }).click();
    await expect(page.getByText(title, { exact: true })).toBeVisible();
    await expect(hero.locator(".showcase-image")).toHaveJSProperty("complete", true);
  }

  await expect(
    page.getByRole("img", { name: /render isométrico realista de casa na cidade/i }),
  ).toBeVisible();
});
