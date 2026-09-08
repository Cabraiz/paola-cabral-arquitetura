"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Miniature = {
  id: string;
  label: string;
  title: string;
  description: string;
  model: string;
  poster: string;
  cameraOrbit: string;
};

const miniatures: readonly Miniature[] = [
  {
    id: "villa-jardim",
    label: "Casa jardim",
    title: "Villa Jardim",
    description:
      "Volumes contemporâneos, áreas abertas e paisagismo integrados em uma maquete 3D navegável.",
    model: "/models/miniatures/garden-villa.glb",
    poster: "/images/miniatures/cidade.webp",
    cameraOrbit: "35deg 64deg 85%",
  },
  {
    id: "apartamento-terraco",
    label: "Apartamento",
    title: "Apartamento Terraço",
    description:
      "Uma leitura completa da planta, dos ambientes e do terraço em uma maquete 3D interativa.",
    model: "/models/miniatures/terrace-apartment.glb",
    poster: "/images/miniatures/apartamento.webp",
    cameraOrbit: "35deg 63deg 90%",
  },
] as const;

type MiniatureHeroProps = {
  basePath: string;
};

type ProgressEvent = CustomEvent<{ totalProgress: number }>;

export function MiniatureHero({ basePath }: MiniatureHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewerAvailable, setViewerAvailable] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [viewerElement, setViewerElement] = useState<HTMLElement | null>(null);
  const scene = miniatures[activeIndex];

  useEffect(() => {
    let active = true;

    import("@google/model-viewer")
      .then(() => {
        if (active) setViewerAvailable(true);
      })
      .catch(() => {
        if (active) setViewerAvailable(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const viewer = viewerElement;
    if (!viewer) return;

    const handleLoad = () => {
      setLoadProgress(1);
      setModelLoaded(true);
    };
    const handleProgress = (event: Event) => {
      setLoadProgress((event as ProgressEvent).detail.totalProgress);
    };

    viewer.addEventListener("load", handleLoad);
    viewer.addEventListener("progress", handleProgress);

    return () => {
      viewer.removeEventListener("load", handleLoad);
      viewer.removeEventListener("progress", handleProgress);
    };
  }, [viewerElement]);

  if (!scene) return null;

  function selectMiniature(index: number) {
    if (index === activeIndex) return;
    setModelLoaded(false);
    setLoadProgress(0);
    setActiveIndex(index);
  }

  function step(direction: number) {
    selectMiniature(
      (activeIndex + direction + miniatures.length) % miniatures.length,
    );
  }

  return (
    <section aria-labelledby="hero-title" className="showcase-hero" id="inicio">
      <div className="showcase-aura" aria-hidden="true" />

      <div className="showcase-copy">
        <p className="eyebrow">Arquitetura e interiores · Fortaleza, Ceará</p>
        <h1 id="hero-title">
          Imagine por inteiro,
          <br /> antes de <em>construir.</em>
        </h1>
        <p className="showcase-intro">
          Duas formas de morar apresentadas como maquetes 3D realistas. Arraste
          para girar, aproxime para ver os detalhes e escolha um projeto para
          explorar.
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

      <div className="showcase-stage">
        <div className="showcase-shadow" aria-hidden="true" />
        <div className="showcase-float">
          <div className="showcase-model" key={scene.id}>
            <div
              className={`showcase-viewer-shell${modelLoaded ? " is-loaded" : ""}`}
            >
              <Image
                alt=""
                aria-hidden="true"
                className="showcase-poster"
                draggable={false}
                height={853}
                priority={activeIndex === 0}
                src={`${basePath}${scene.poster}`}
                width={1280}
              />
              {viewerAvailable ? (
                <model-viewer
                  alt={`Maquete 3D interativa de ${scene.title}`}
                  auto-rotate
                  auto-rotate-delay="2600"
                  camera-controls
                  camera-orbit={scene.cameraOrbit}
                  className="showcase-viewer"
                  environment-image="neutral"
                  exposure="1.08"
                  field-of-view="28deg"
                  interaction-prompt="auto"
                  loading="eager"
                  ref={setViewerElement}
                  rotation-per-second="10deg"
                  shadow-intensity="0.72"
                  shadow-softness="0.9"
                  src={`${basePath}${scene.model}`}
                  touch-action="pan-y"
                />
              ) : null}
              {!modelLoaded ? (
                <span className="showcase-loading" role="status">
                  Carregando 3D · {Math.round(loadProgress * 100)}%
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <span className="showcase-drag-hint" aria-hidden="true">
          Arraste para girar · aproxime para explorar
        </span>
      </div>

      <div
        aria-label="Maquetes 3D disponíveis"
        className="showcase-tabs"
        role="tablist"
      >
        {miniatures.map((item, index) => (
          <button
            aria-controls="showcase-project"
            aria-selected={index === activeIndex}
            className={index === activeIndex ? "active" : ""}
            key={item.id}
            onClick={() => selectMiniature(index)}
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
