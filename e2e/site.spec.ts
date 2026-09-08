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

test("loads, rotates and switches only the two optimized 3D miniatures", async ({ page }) => {
  const modelRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().endsWith(".glb")) modelRequests.push(request.url());
  });

  await page.goto("/");
  const hero = page.locator("#inicio");
  await expect(page.getByText("Villa Jardim", { exact: true })).toBeVisible();
  await hero.screenshot({ path: `artifacts/${test.info().project.name}-miniatures.png` });

  const viewer = hero.locator("model-viewer");
  await expect
    .poll(() => viewer.evaluate((element) => (element as HTMLElement & { src: string }).src))
    .toMatch(/garden-villa\.glb$/);
  await expect(hero.locator(".showcase-viewer-shell")).toHaveClass(/is-loaded/, {
    timeout: 20_000,
  });
  await hero.screenshot({
    path: `artifacts/${test.info().project.name}-3d-villa-loaded.png`,
  });
  expect(modelRequests.some((url) => url.endsWith("garden-villa.glb"))).toBe(true);
  expect(modelRequests.some((url) => url.endsWith("terrace-apartment.glb"))).toBe(false);

  const initialOrbit = await viewer.evaluate(
    (element) => (element as HTMLElement & { getCameraOrbit(): { theta: number } }).getCameraOrbit().theta,
  );
  const bounds = await viewer.boundingBox();
  expect(bounds).not.toBeNull();
  if (bounds) {
    await page.mouse.move(bounds.x + bounds.width * 0.65, bounds.y + bounds.height * 0.5);
    await page.mouse.down();
    await page.mouse.move(bounds.x + bounds.width * 0.35, bounds.y + bounds.height * 0.5, {
      steps: 8,
    });
    await page.mouse.up();
    await expect
      .poll(() =>
        viewer.evaluate(
          (element) =>
            (element as HTMLElement & { getCameraOrbit(): { theta: number } }).getCameraOrbit().theta,
        ),
      )
      .not.toBe(initialOrbit);
  }

  await page.getByRole("tab", { name: /apartamento/i }).click();
  await expect(page.getByText("Apartamento Terraço", { exact: true })).toBeVisible();
  await expect
    .poll(() =>
      hero
        .locator("model-viewer")
        .evaluate((element) => (element as HTMLElement & { src: string }).src),
    )
    .toMatch(/terrace-apartment\.glb$/);
  await expect(hero.locator(".showcase-viewer-shell")).toHaveClass(/is-loaded/, {
    timeout: 20_000,
  });
  await hero.screenshot({
    path: `artifacts/${test.info().project.name}-3d-apartment-loaded.png`,
  });
  expect(modelRequests.some((url) => url.endsWith("terrace-apartment.glb"))).toBe(true);

  await expect(
    page.getByRole("img", { name: /maquete 3d interativa de apartamento terraço/i }),
  ).toBeVisible();
});
