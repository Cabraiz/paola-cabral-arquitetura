import { readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const dist = resolve("dist");
const files = [
  "index.html",
  "index.md",
  "llms.txt",
  "llms-full.txt",
  "robots.txt",
  "sitemap.xml",
];
const content = Object.fromEntries(
  await Promise.all(
    files.map(async (file) => [file, await readFile(join(dist, file), "utf8")]),
  ),
);
const checks = [
  [
    "markdown-identity",
    content["index.md"].includes("# Paola Cabral Arquitetura"),
  ],
  [
    "markdown-services",
    content["index.md"].includes("Arquitetura residencial"),
  ],
  [
    "markdown-transparency",
    content["index.md"].includes("não representam obras executadas"),
  ],
  [
    "llms-summary",
    content["llms.txt"].includes("> Site oficial de Paola Cabral"),
  ],
  ["llms-full", content["llms-full.txt"].includes("## Abordagem de projeto")],
  [
    "llms-discovery",
    content["index.html"].includes('rel="describedby"') &&
      content["index.html"].includes("/llms.txt"),
  ],
  [
    "markdown-alternate",
    content["index.html"].includes('type="text/markdown"') &&
      content["index.html"].includes("/index.md"),
  ],
  [
    "structured-data",
    content["index.html"].includes('type="application/ld+json"'),
  ],
  ["oai-search", content["robots.txt"].includes("User-Agent: OAI-SearchBot")],
  [
    "perplexity-search",
    content["robots.txt"].includes("User-Agent: PerplexityBot"),
  ],
];
const failed = checks.filter(([, passed]) => !passed);
const report = {
  standard: "paola-agent-readiness-v1",
  generatedAt: new Date().toISOString(),
  summary: { passed: checks.length - failed.length, failed: failed.length },
  checks: checks.map(([id, passed]) => ({
    id,
    status: passed ? "pass" : "fail",
  })),
  notes: [
    "GitHub Pages não fornece logs de acesso nem negociação HTTP por Accept.",
  ],
};
await writeFile(
  join(dist, "agent-readiness.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);
if (failed.length)
  throw new Error(
    `Prontidão para agentes reprovada: ${failed.map(([id]) => id).join(", ")}`,
  );
console.log(
  `Prontidão para agentes aprovada: ${checks.length} verificações passaram.`,
);
