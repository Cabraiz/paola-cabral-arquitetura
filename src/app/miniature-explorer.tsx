"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useRef, useState } from "react";

type Block = {
  x: number;
  y: number;
  width: number;
  depth: number;
  height: number;
  tone?: "clay" | "dark" | "glass" | "light" | "wood";
};

type Feature = {
  x: number;
  y: number;
  width: number;
  depth: number;
  type: "garden" | "path" | "pool" | "sand" | "water";
};

type Scene = {
  id: string;
  label: string;
  kicker: string;
  title: string;
  description: string;
  terrain: string;
  facts: readonly string[];
  blocks: readonly Block[];
  features: readonly Feature[];
};

const scenes: readonly Scene[] = [
  {
    id: "sitio",
    label: "Sítio",
    kicker: "Terreno e paisagem",
    title: "Casa Pátio do Sertão",
    description:
      "Volumes baixos abraçam o jardim, preservam árvores e criam sombra para uma vida voltada ao exterior.",
    terrain: "#647155",
    facts: ["1 pavimento", "pátio central", "ventilação cruzada"],
    blocks: [
      { x: 82, y: 72, width: 210, depth: 62, height: 42, tone: "light" },
      { x: 82, y: 134, width: 68, depth: 130, height: 42, tone: "clay" },
      { x: 224, y: 134, width: 68, depth: 130, height: 42, tone: "wood" },
      { x: 150, y: 216, width: 74, depth: 48, height: 30, tone: "light" },
    ],
    features: [
      { x: 154, y: 140, width: 66, depth: 70, type: "garden" },
      { x: 318, y: 82, width: 92, depth: 40, type: "pool" },
      { x: 300, y: 136, width: 114, depth: 12, type: "path" },
    ],
  },
  {
    id: "fazenda",
    label: "Fazenda",
    kicker: "Produção e permanência",
    title: "Fazenda Boa Vista",
    description:
      "Casa, varanda e apoio produtivo organizados em torno de um terreiro protegido, com leitura simples dos fluxos.",
    terrain: "#7c7651",
    facts: ["setores independentes", "grande varanda", "materiais locais"],
    blocks: [
      { x: 72, y: 88, width: 238, depth: 68, height: 48, tone: "clay" },
      { x: 104, y: 156, width: 170, depth: 42, height: 25, tone: "wood" },
      { x: 338, y: 78, width: 82, depth: 148, height: 58, tone: "dark" },
      { x: 76, y: 250, width: 116, depth: 50, height: 34, tone: "light" },
    ],
    features: [
      { x: 204, y: 216, width: 122, depth: 70, type: "sand" },
      { x: 310, y: 232, width: 104, depth: 12, type: "path" },
      { x: 38, y: 54, width: 56, depth: 48, type: "garden" },
    ],
  },
  {
    id: "apartamento",
    label: "Apartamento",
    kicker: "Interiores e rotina",
    title: "Apartamento Entre Luzes",
    description:
      "Uma planta aberta conecta estar, cozinha e varanda enquanto núcleos compactos preservam intimidade e silêncio.",
    terrain: "#777b70",
    facts: ["planta integrada", "marcenaria contínua", "luz filtrada"],
    blocks: [
      { x: 72, y: 62, width: 286, depth: 18, height: 30, tone: "light" },
      { x: 72, y: 80, width: 18, depth: 218, height: 30, tone: "light" },
      { x: 340, y: 80, width: 18, depth: 218, height: 30, tone: "light" },
      { x: 72, y: 280, width: 286, depth: 18, height: 30, tone: "light" },
      { x: 218, y: 80, width: 16, depth: 94, height: 24, tone: "wood" },
      { x: 234, y: 158, width: 124, depth: 16, height: 24, tone: "wood" },
      { x: 90, y: 198, width: 92, depth: 16, height: 15, tone: "dark" },
      { x: 255, y: 218, width: 74, depth: 34, height: 18, tone: "clay" },
    ],
    features: [
      { x: 94, y: 94, width: 108, depth: 82, type: "garden" },
      { x: 98, y: 224, width: 86, depth: 44, type: "path" },
      { x: 246, y: 92, width: 84, depth: 46, type: "water" },
    ],
  },
  {
    id: "praia",
    label: "Casa de praia",
    kicker: "Brisa e horizonte",
    title: "Casa Duna",
    description:
      "Uma estrutura leve se eleva da areia, enquadra o mar e cria camadas de sombra para atravessar o dia com conforto.",
    terrain: "#c9aa72",
    facts: ["estrutura elevada", "proteção solar", "aberturas generosas"],
    blocks: [
      { x: 92, y: 82, width: 224, depth: 72, height: 62, tone: "light" },
      { x: 92, y: 154, width: 76, depth: 102, height: 62, tone: "wood" },
      { x: 240, y: 154, width: 76, depth: 102, height: 62, tone: "glass" },
      { x: 168, y: 214, width: 72, depth: 42, height: 22, tone: "light" },
    ],
    features: [
      { x: 342, y: 56, width: 78, depth: 250, type: "water" },
      { x: 176, y: 162, width: 56, depth: 44, type: "pool" },
      { x: 44, y: 62, width: 38, depth: 226, type: "sand" },
    ],
  },
  {
    id: "cidade",
    label: "Casa na cidade",
    kicker: "Densidade e privacidade",
    title: "Casa Urbana 08",
    description:
      "Em um lote compacto, vazios estratégicos levam luz ao centro da casa e separam a vida íntima do movimento da rua.",
    terrain: "#555b55",
    facts: ["lote estreito", "dois pavimentos", "jardins internos"],
    blocks: [
      { x: 96, y: 54, width: 104, depth: 104, height: 92, tone: "dark" },
      { x: 200, y: 54, width: 122, depth: 62, height: 92, tone: "light" },
      { x: 226, y: 142, width: 96, depth: 118, height: 58, tone: "clay" },
      { x: 96, y: 202, width: 96, depth: 58, height: 42, tone: "wood" },
      { x: 344, y: 54, width: 42, depth: 206, height: 28, tone: "dark" },
    ],
    features: [
      { x: 96, y: 164, width: 104, depth: 30, type: "garden" },
      { x: 204, y: 118, width: 114, depth: 18, type: "path" },
      { x: 50, y: 280, width: 364, depth: 16, type: "path" },
    ],
  },
] as const;

function styleOf(values: Record<string, string>): CSSProperties {
  return values as CSSProperties;
}

export function MiniatureExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewerRef = useRef<HTMLDivElement>(null);
  const scene = scenes[activeIndex];

  if (!scene) return null;

  function tilt(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    viewerRef.current?.style.setProperty("--tilt-x", `${x * 10}deg`);
    viewerRef.current?.style.setProperty("--tilt-y", `${y * -8}deg`);
    viewerRef.current?.style.setProperty("--light-x", `${50 + x * 28}%`);
    viewerRef.current?.style.setProperty("--light-y", `${36 + y * 24}%`);
  }

  function resetTilt() {
    viewerRef.current?.style.setProperty("--tilt-x", "0deg");
    viewerRef.current?.style.setProperty("--tilt-y", "0deg");
  }

  function step(direction: number) {
    setActiveIndex(
      (current) => (current + direction + scenes.length) % scenes.length,
    );
  }

  return (
    <section
      className="miniatures section-pad"
      id="maquetes"
      aria-labelledby="miniatures-title"
    >
      <div className="miniature-heading reveal">
        <div>
          <p className="section-label">Maquetes interativas</p>
          <h2 className="display-heading miniature-title" id="miniatures-title">
            Cinco maneiras de imaginar o morar.
          </h2>
        </div>
        <p>
          Explore estudos volumétricos leves. Mova o cursor sobre a maquete ou
          use os controles para mudar de contexto.
        </p>
      </div>

      <div
        className="miniature-tabs reveal"
        role="tablist"
        aria-label="Tipos de projeto"
      >
        {scenes.map((item, index) => (
          <button
            aria-controls="miniature-panel"
            aria-selected={index === activeIndex}
            className={index === activeIndex ? "active" : ""}
            id={`tab-${item.id}`}
            key={item.id}
            onClick={() => setActiveIndex(index)}
            role="tab"
            type="button"
          >
            <span className="miniature-tab-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item.label}
          </button>
        ))}
      </div>

      <div
        className="miniature-panel reveal"
        id="miniature-panel"
        role="tabpanel"
        aria-labelledby={`tab-${scene.id}`}
      >
        <div className="miniature-copy" aria-live="polite">
          <p>{scene.kicker}</p>
          <h3>{scene.title}</h3>
          <p>{scene.description}</p>
          <ul>
            {scene.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
          <div className="miniature-arrows">
            <button
              aria-label="Maquete anterior"
              onClick={() => step(-1)}
              type="button"
            >
              ←
            </button>
            <span className="miniature-count">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(scenes.length).padStart(2, "0")}
            </span>
            <button
              aria-label="Próxima maquete"
              onClick={() => step(1)}
              type="button"
            >
              →
            </button>
          </div>
        </div>

        <div
          aria-label={`Maquete pseudo 3D: ${scene.label}`}
          className="miniature-viewer"
          onPointerLeave={resetTilt}
          onPointerMove={tilt}
          ref={viewerRef}
          role="img"
        >
          <div className="model-glow" />
          <div
            className="model-world"
            style={{ "--terrain": scene.terrain } as CSSProperties}
          >
            <div className="model-ground">
              <div className="model-grid" />
              {scene.features.map((feature) => (
                <span
                  className={`model-feature ${feature.type}`}
                  key={`${scene.id}-feature-${feature.type}-${feature.x}-${feature.y}`}
                  style={styleOf({
                    "--x": `${feature.x}px`,
                    "--y": `${feature.y}px`,
                    "--w": `${feature.width}px`,
                    "--d": `${feature.depth}px`,
                  })}
                />
              ))}
              {scene.blocks.map((block) => (
                <span
                  className={`model-block ${block.tone ?? "light"}`}
                  key={`${scene.id}-block-${block.x}-${block.y}-${block.width}-${block.depth}`}
                  style={styleOf({
                    "--x": `${block.x}px`,
                    "--y": `${block.y}px`,
                    "--w": `${block.width}px`,
                    "--d": `${block.depth}px`,
                    "--h": `${block.height}px`,
                  })}
                >
                  <i className="model-top" />
                  <i className="model-front" />
                  <i className="model-side" />
                </span>
              ))}
            </div>
          </div>
          <span className="model-orbit orbit-one" />
          <span className="model-orbit orbit-two" />
          <span className="model-hint">mova para explorar</span>
        </div>
      </div>
    </section>
  );
}
