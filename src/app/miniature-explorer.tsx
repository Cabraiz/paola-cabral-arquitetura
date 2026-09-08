"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useRef, useState } from "react";

type Miniature = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
};

const miniatures: readonly Miniature[] = [
  {
    id: "sitio",
    label: "Sítio",
    title: "Casa Pátio do Sertão",
    description: "Pátio vivo, sombra generosa e natureza no centro da rotina.",
    image: "/images/miniatures/sitio.webp",
  },
  {
    id: "fazenda",
    label: "Fazenda",
    title: "Fazenda Boa Vista",
    description:
      "Hospitalidade rural organizada ao redor de um grande terreiro.",
    image: "/images/miniatures/fazenda.webp",
  },
  {
    id: "apartamento",
    label: "Apartamento",
    title: "Apartamento Entre Luzes",
    description:
      "Conforto urbano, circulação clara e ambientes que se conectam.",
    image: "/images/miniatures/apartamento.webp",
  },
  {
    id: "praia",
    label: "Casa de praia",
    title: "Casa Duna",
    description:
      "Leveza, ventilação e uma vida aberta para a paisagem costeira.",
    image: "/images/miniatures/praia.webp",
  },
  {
    id: "cidade",
    label: "Casa na cidade",
    title: "Casa Urbana 08",
    description: "Um lote compacto transformado por luz, jardim e privacidade.",
    image: "/images/miniatures/cidade.webp",
  },
] as const;

type MiniatureHeroProps = {
  basePath: string;
};

export function MiniatureHero({ basePath }: MiniatureHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const scene = miniatures[activeIndex];

  if (!scene) return null;

  function updateTilt(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    const strength = draggingRef.current ? 18 : 9;

    stageRef.current?.style.setProperty("--rotate-x", `${y * -strength}deg`);
    stageRef.current?.style.setProperty("--rotate-y", `${x * strength}deg`);
    stageRef.current?.style.setProperty("--shift-x", `${x * 18}px`);
    stageRef.current?.style.setProperty("--shift-y", `${y * 12}px`);
    stageRef.current?.style.setProperty("--shadow-x", `${x * -26}px`);
    stageRef.current?.style.setProperty("--shadow-y", `${y * -18}px`);
  }

  function resetTilt() {
    draggingRef.current = false;
    stageRef.current?.classList.remove("is-dragging");
    stageRef.current?.style.setProperty("--rotate-x", "0deg");
    stageRef.current?.style.setProperty("--rotate-y", "0deg");
    stageRef.current?.style.setProperty("--shift-x", "0px");
    stageRef.current?.style.setProperty("--shift-y", "0px");
    stageRef.current?.style.setProperty("--shadow-x", "0px");
    stageRef.current?.style.setProperty("--shadow-y", "0px");
  }

  function beginDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    stageRef.current?.classList.add("is-dragging");
    updateTilt(event);
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    resetTilt();
  }

  function step(direction: number) {
    setActiveIndex(
      (current) =>
        (current + direction + miniatures.length) % miniatures.length,
    );
  }

  return (
    <section
      aria-labelledby="hero-title"
      className="showcase-hero"
      id="inicio"
      style={{ "--scene-index": activeIndex } as CSSProperties}
    >
      <div className="showcase-aura" aria-hidden="true" />

      <div className="showcase-copy">
        <p className="eyebrow">Arquitetura e interiores · Fortaleza, Ceará</p>
        <h1 id="hero-title">
          Imagine por inteiro,
          <br /> antes de <em>construir.</em>
        </h1>
        <p className="showcase-intro">
          Cinco formas de morar apresentadas como maquetes realistas. Arraste
          para sentir o volume e escolha um contexto para explorar.
        </p>
        <div
          aria-live="polite"
          className="showcase-project"
          id="showcase-project"
          role="tabpanel"
        >
          <span>{scene.label}</span>
          <strong>{scene.title}</strong>
          <p>{scene.description}</p>
        </div>
      </div>

      <div
        className="showcase-stage"
        onPointerCancel={endDrag}
        onPointerDown={beginDrag}
        onPointerLeave={resetTilt}
        onPointerMove={updateTilt}
        onPointerUp={endDrag}
        ref={stageRef}
      >
        <div className="showcase-shadow" aria-hidden="true" />
        <div className="showcase-float">
          <div className="showcase-model" key={scene.id}>
            <Image
              alt={`Render isométrico realista de ${scene.label.toLowerCase()}`}
              className="showcase-image"
              draggable={false}
              height={853}
              preload={activeIndex === 0}
              src={`${basePath}${scene.image}`}
              width={1280}
            />
          </div>
        </div>
        <span className="showcase-drag-hint" aria-hidden="true">
          Arraste para mover
        </span>
      </div>

      <div
        aria-label="Tipos de residência"
        className="showcase-tabs"
        role="tablist"
      >
        {miniatures.map((item, index) => (
          <button
            aria-controls="showcase-project"
            aria-selected={index === activeIndex}
            className={index === activeIndex ? "active" : ""}
            key={item.id}
            onClick={() => setActiveIndex(index)}
            role="tab"
            type="button"
          >
            <span className="showcase-tab-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item.label}
          </button>
        ))}
      </div>

      <div className="showcase-arrows">
        <button
          aria-label="Maquete anterior"
          onClick={() => step(-1)}
          type="button"
        >
          ←
        </button>
        <span className="showcase-count">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(miniatures.length).padStart(2, "0")}
        </span>
        <button
          aria-label="Próxima maquete"
          onClick={() => step(1)}
          type="button"
        >
          →
        </button>
      </div>
    </section>
  );
}
