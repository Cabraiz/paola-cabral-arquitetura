import Image from "next/image";
import { Experience } from "./experience";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const services = [
  [
    "01",
    "Arquitetura residencial",
    "Casas e apartamentos pensados a partir da rotina, do clima e da identidade de quem vive cada espaço.",
  ],
  [
    "02",
    "Interiores",
    "Materialidade, iluminação, mobiliário e detalhes reunidos em ambientes coerentes, acolhedores e duráveis.",
  ],
  [
    "03",
    "Espaços comerciais",
    "Projetos que traduzem posicionamento de marca em jornadas claras, memoráveis e eficientes.",
  ],
  [
    "04",
    "Consultoria de projeto",
    "Direcionamento técnico e criativo para decisões de layout, acabamentos, ambientação e potencial do imóvel.",
  ],
] as const;

const processSteps = [
  [
    "01",
    "Escuta",
    "Contexto, desejos, limites e prioridades viram um briefing claro.",
  ],
  [
    "02",
    "Estratégia",
    "Leitura do lugar, programa, referências e alternativas de implantação.",
  ],
  [
    "03",
    "Projeto",
    "Do conceito ao detalhamento, cada escolha ganha precisão técnica.",
  ],
  [
    "04",
    "Acompanhamento",
    "Apoio nas decisões para preservar a intenção do projeto na execução.",
  ],
] as const;

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

export default function Home() {
  return (
    <Experience>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Paola Cabral, início">
          <span>PAOLA</span>
          <span>CABRAL</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#estudos">Portfólio</a>
          <a href="#servicos">Serviços</a>
          <a href="#sobre">Estúdio</a>
        </nav>
        <a className="header-cta" href="#contato">
          Iniciar projeto <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <Image
            alt="Estudo arquitetônico de residência contemporânea tropical ao entardecer"
            className="hero-image"
            height="1024"
            loading="eager"
            preload
            src={`${basePath}/images/hero.webp`}
            width="1820"
          />
          <div className="hero-shade" />
          <div className="hero-content reveal">
            <p className="eyebrow">
              Arquitetura e interiores · Fortaleza, Ceará
            </p>
            <h1 id="hero-title">
              Espaços com <em>essência,</em>
              <br /> desenhados para durar.
            </h1>
            <p className="hero-intro">
              Arquitetura contemporânea, sensível ao clima e à vida real.
              Projetos que transformam intenção em pertencimento.
            </p>
            <a className="text-link light" href="#estudos">
              Conheça a abordagem <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="hero-index" aria-hidden="true">
            01 / 03
          </p>
        </section>

        <section
          className="manifesto section-pad"
          aria-labelledby="manifesto-title"
        >
          <p className="section-label reveal">Nossa perspectiva</p>
          <div className="manifesto-grid">
            <h2 className="display-heading reveal" id="manifesto-title">
              O essencial aparece
              <br /> quando cada escolha
              <br /> tem <em>razão de existir.</em>
            </h2>
            <div className="manifesto-copy reveal">
              <p>
                Um bom projeto nasce da escuta. Da luz que muda ao longo do dia,
                dos percursos cotidianos, do que precisa permanecer e do que
                pode ser reinventado.
              </p>
              <p>
                Paola Cabral desenvolve arquitetura com clareza, proporção e
                materialidade honesta, conectando conforto, identidade e
                contexto em todas as escalas.
              </p>
            </div>
          </div>
        </section>

        <section
          className="studies section-pad"
          id="estudos"
          aria-labelledby="studies-title"
        >
          <div className="section-heading reveal">
            <div>
              <p className="section-label">Estudos selecionados</p>
              <h2 id="studies-title">Atmosferas que orientam o projeto.</h2>
            </div>
            <p>
              Imagens conceituais autorais que apresentam a linguagem e as
              possibilidades do estúdio. Não representam obras executadas.
            </p>
          </div>
          <article className="project project-wide reveal">
            <Image
              alt="Estudo conceitual de casa tropical integrada à paisagem"
              height="1024"
              src={`${basePath}/images/hero.webp`}
              width="1820"
            />
            <div className="project-meta">
              <h3>Casa Horizonte</h3>
              <p>Arquitetura residencial · Ceará</p>
              <span>Estudo conceitual</span>
            </div>
          </article>
          <div className="project-pair">
            <article className="project reveal">
              <Image
                alt="Estudo conceitual de interiores com madeira, pedra e luz natural"
                height="1024"
                src={`${basePath}/images/interior.webp`}
                width="1536"
              />
              <div className="project-meta">
                <h3>Apartamento Luz</h3>
                <p>Interiores · Fortaleza</p>
                <span>Estudo conceitual</span>
              </div>
            </article>
            <article className="project project-offset reveal">
              <Image
                alt="Estudo conceitual de pavilhão com cobogós e jardim tropical"
                height="1024"
                src={`${basePath}/images/pavilion.webp`}
                width="1536"
              />
              <div className="project-meta">
                <h3>Pátio Essencial</h3>
                <p>Comercial e hospitalidade · Ceará</p>
                <span>Estudo conceitual</span>
              </div>
            </article>
          </div>
        </section>

        <section
          className="services section-pad"
          id="servicos"
          aria-labelledby="services-title"
        >
          <p className="section-label reveal">O que fazemos</p>
          <div className="services-layout">
            <h2 className="display-heading reveal" id="services-title">
              Da primeira ideia
              <br /> ao espaço <em>vivido.</em>
            </h2>
            <div className="service-list">
              {services.map(([number, title, text]) => (
                <article className="service reveal" key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="process section-pad"
          aria-labelledby="process-title"
        >
          <div className="section-heading reveal">
            <div>
              <p className="section-label">Como acontece</p>
              <h2 id="process-title">
                Um processo claro, do encontro à matéria.
              </h2>
            </div>
            <p>
              Cada etapa reduz incertezas e aproxima o projeto da rotina, do
              orçamento e da expressão desejada.
            </p>
          </div>
          <ol className="process-list">
            {processSteps.map(([number, title, text]) => (
              <li className="reveal" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="about" id="sobre" aria-labelledby="about-title">
          <div
            className="about-image reveal"
            role="img"
            aria-label="Detalhe de arquitetura tropical com cobogós e jardim"
            style={{ backgroundImage: `url(${basePath}/images/pavilion.webp)` }}
          />
          <div className="about-copy section-pad reveal">
            <p className="section-label">Paola Cabral</p>
            <h2 className="display-heading" id="about-title">
              Técnica e sensibilidade em <em>equilíbrio.</em>
            </h2>
            <p>
              Com base em Fortaleza, o estúdio atua em arquitetura e interiores
              buscando soluções precisas, naturais e conectadas ao modo de viver
              de cada cliente.
            </p>
            <p>
              O trabalho valoriza luz, ventilação, materiais duráveis e relações
              generosas entre dentro e fora, com atenção contínua ao detalhe.
            </p>
          </div>
        </section>

        <section className="faq section-pad" aria-labelledby="faq-title">
          <div>
            <p className="section-label reveal">Perguntas frequentes</p>
            <h2 className="display-heading reveal" id="faq-title">
              Antes de começar.
            </h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details className="reveal" key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          className="contact section-pad"
          id="contato"
          aria-labelledby="contact-title"
        >
          <p className="section-label reveal">Seu projeto começa aqui</p>
          <h2 className="reveal" id="contact-title">
            Vamos imaginar o espaço
            <br /> que ainda não existe?
          </h2>
          <p className="contact-note reveal">
            Canal oficial de atendimento em atualização. Enquanto isso, conheça
            a abordagem, reúna referências e volte em breve para iniciar a
            conversa.
          </p>
          <a className="contact-link reveal" href="#inicio">
            Paola Cabral <span>Arquitetura e interiores · Fortaleza, CE</span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Paola Cabral</p>
        <p>Arquitetura · Interiores · Consultoria</p>
        <a href={`${basePath}/llms.txt`}>Informações para agentes de IA</a>
        <a href="#inicio">Voltar ao topo ↑</a>
      </footer>
    </Experience>
  );
}
