import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
});
const siteUrl = "https://cabraiz.github.io/paola-cabral-arquitetura";
const title = "Paola Cabral | Arquitetura e Interiores em Fortaleza";
const description =
  "Estúdio de arquitetura e interiores em Fortaleza, Ceará. Projetos residenciais, comerciais e consultorias com conforto, identidade e atenção ao clima.";
const services = [
  "Arquitetura residencial",
  "Arquitetura de interiores",
  "Projetos comerciais",
  "Consultoria de arquitetura",
];
const faqs = [
  [
    "Quais tipos de projeto o estúdio desenvolve?",
    "Arquitetura residencial, interiores, espaços comerciais e consultorias para imóveis novos ou existentes.",
  ],
  [
    "O atendimento acontece somente em Fortaleza?",
    "Fortaleza e Ceará são a base de atuação. A viabilidade de projetos em outras localidades é avaliada conforme escopo e etapa.",
  ],
  [
    "É possível contratar apenas uma consultoria?",
    "Sim. A consultoria atende decisões pontuais de layout, materialidade, iluminação e direcionamento estético ou funcional.",
  ],
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#estudio`,
      name: "Paola Cabral",
      alternateName: "Paola Cabral Arquitetura",
      description,
      url: `${siteUrl}/`,
      image: `${siteUrl}/og.jpg`,
      priceRange: "$$$",
      areaServed: [
        { "@type": "City", name: "Fortaleza" },
        { "@type": "State", name: "Ceará" },
      ],
      founder: { "@id": `${siteUrl}/#paola-cabral` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços de arquitetura",
        itemListElement: services.map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
            areaServed: "Fortaleza e Ceará",
            provider: { "@id": `${siteUrl}/#estudio` },
          },
        })),
      },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#paola-cabral`,
      name: "Paola Cabral",
      jobTitle: "Profissional de arquitetura e interiores",
      description:
        "Profissional à frente do estúdio Paola Cabral, com base em Fortaleza, Ceará.",
      url: `${siteUrl}/`,
      worksFor: { "@id": `${siteUrl}/#estudio` },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Paola Cabral Arquitetura",
      description,
      inLanguage: "pt-BR",
      publisher: { "@id": `${siteUrl}/#estudio` },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#pagina-inicial`,
      url: `${siteUrl}/`,
      name: title,
      description,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#estudio` },
      mainEntity: { "@id": `${siteUrl}/#estudio` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteUrl}/og.jpg`,
        width: 1200,
        height: 630,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#perguntas`,
      mainEntity: faqs.map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      })),
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Paola Cabral Arquitetura",
  authors: [{ name: "Paola Cabral" }],
  creator: "Paola Cabral",
  publisher: "Paola Cabral",
  category: "arquitetura",
  alternates: {
    canonical: `${siteUrl}/`,
    types: { "text/markdown": `${siteUrl}/index.md` },
  },
  keywords: [
    "Paola Cabral",
    "Paola Cabral arquitetura",
    "arquiteta em Fortaleza",
    "arquitetura em Fortaleza",
    "arquitetura de interiores Fortaleza",
    "projeto residencial Ceará",
    "projeto de interiores Fortaleza",
    "consultoria de arquitetura Fortaleza",
  ],
  openGraph: {
    title,
    description,
    url: `${siteUrl}/`,
    siteName: "Paola Cabral Arquitetura",
    images: [
      {
        url: `${siteUrl}/og.jpg`,
        width: 1200,
        height: 630,
        alt: "Arquitetura tropical contemporânea",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/og.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <html lang="pt-BR" className={`${sans.variable} ${serif.variable}`}>
      <head>
        <link
          rel="describedby"
          href={`${basePath}/llms.txt`}
          type="text/markdown"
        />
        <link
          rel="icon"
          href={`${basePath}/favicon.svg`}
          type="image/svg+xml"
        />
        <meta name="theme-color" content="#22251f" />
        <script /* biome-ignore lint/security/noDangerouslySetInnerHtml: owned static JSON-LD. */
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
          type="application/ld+json"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
