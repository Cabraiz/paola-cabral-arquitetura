import { readFileSync } from "node:fs";
import { join } from "node:path";

const dist = join(process.cwd(), "dist");
const read = (path) => readFileSync(join(dist, path), "utf8");
const homepage = read("index.html");
const robots = read("robots.txt");
const sitemap = read("sitemap.xml");

function expect(content, signal, label) {
  if (!content.includes(signal))
    throw new Error(`SEO inválido: ${label} ausente.`);
}

const title = homepage.match(/<title>([^<]+)<\/title>/)?.[1] ?? "";
const description =
  homepage.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? "";
if (title.length < 35 || title.length > 65)
  throw new Error(`SEO inválido: título com ${title.length} caracteres.`);
if (description.length < 120 || description.length > 165)
  throw new Error(
    `SEO inválido: descrição com ${description.length} caracteres.`,
  );

for (const [signal, label] of [
  ["Paola Cabral | Arquitetura e Interiores em Fortaleza", "título local"],
  [
    'rel="canonical" href="https://cabraiz.github.io/paola-cabral-arquitetura/"',
    "canônica",
  ],
  ['type="application/ld+json"', "JSON-LD"],
  ['"@type":"ProfessionalService"', "ProfessionalService"],
  ['"@type":"FAQPage"', "FAQPage"],
  ["Arquitetura residencial", "serviço residencial"],
  ["Fortaleza", "localidade"],
  ["Não representam obras executadas", "transparência do portfólio"],
  ["Cinco maneiras de imaginar o morar", "maquetes interativas"],
  ["Casa de praia", "tipologia de praia"],
])
  expect(homepage, signal, label);

if ((homepage.match(/<h1[ >]/g) ?? []).length !== 1)
  throw new Error("SEO inválido: esperado exatamente um h1.");
if (/noindex|nofollow/i.test(homepage))
  throw new Error("SEO inválido: diretiva de bloqueio encontrada.");

for (const bot of [
  "Googlebot",
  "Google-Extended",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "*",
]) {
  expect(robots, `User-Agent: ${bot}`, `regra para ${bot}`);
}
expect(
  robots,
  "Sitemap: https://cabraiz.github.io/paola-cabral-arquitetura/sitemap.xml",
  "sitemap em robots.txt",
);
expect(
  sitemap,
  "<loc>https://cabraiz.github.io/paola-cabral-arquitetura/</loc>",
  "URL no sitemap",
);
console.log(
  "SEO aprovado: metadados, conteúdo local, JSON-LD, sitemap e crawlers de busca/IA validados.",
);
