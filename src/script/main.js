// =========================================
// DADOS DOS PROJETOS (usados no preview)
// =========================================
const projectsData = {
  "job-scraper": {
    title: "Sistema de busca de vagas de emprego",
    // caminhos de todas as imagens/screenshots do projeto.
    // A primeira da lista aparece como imagem principal do preview.
    images: [
      "src/capa-projetos/job-scraper.jpg",
      "src/capa-projetos/job-scraper-2.jpg",
      "src/capa-projetos/job-scraper-3.jpg",
    ],
    description:
      "Automatiza a busca por vagas de emprego, coletando oportunidades de diferentes plataformas (como LinkedIn e Indeed) e centralizando tudo em um bot do Telegram. O sistema roda em intervalos programados, filtra vagas repetidas e envia apenas as novas oportunidades, reduzindo bastante o tempo gasto em pesquisas manuais.",
    tech: ["Python", "Telegram Bot API", "Web Scraping", "PostgreSQL", "HTML5", "CSS3", "JavaScript", "API IA", "Docker"],
    github: "https://github.com/DenisGoes/job-web-scraper",
  },
  "sensor-estacionamento": {
    title: "Sensor de Estacionamento",
    images: [
      "src/capa-projetos/sensor-estacionamento.jpg",
      "src/capa-projetos/sensor-estacionamento-2.jpg",
    ],
    description:
      "Projeto de sensor de estacionamento com leitura de distância em tempo real, indicando via LED/display se a vaga está livre ou ocupada. Pensado para ambientes com poucas vagas onde a sinalização visual ajuda o motorista a estacionar com mais segurança.",
    tech: ["C++", "ESP32", "Sensores Ultrassônico HC-SR04", "HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/DenisGoes/SmartVagas",
  },
  "nt-scraper": {
    title: "NT Scraper",
    images: [
      "src/capa-projetos/scraper-noticias.jpg",
      "src/capa-projetos/scraper-noticias-2.jpg",
      "src/capa-projetos/scraper-noticias-3.jpg",
    ],
    description:
      "NT Scraper é um sistema de busca e coleta automatizada de notícias de tecnologia, reunindo conteúdo de diferentes fontes, como Hacker News, Tecnoblog e outros portais. Desenvolvido para pessoas que gostam de tecnologia e querem se manter atualizadas sobre as principais notícias do setor sem precisar visitar vários sites separadamente.",
    tech: ["Python", "Telegram Bot API", "Web Scraping", "PostgreSQL", "HTML5", "CSS3", "JavaScript", "API IA", "Docker"],
    github: "https://github.com/DenisGoes/scraping-noticias",
  },
};

// =========================================
// PREVIEW DO PROJETO (abrir / fechar)
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  const preview = document.getElementById("projectPreview");
  const previewImage = document.getElementById("previewImage");
  const previewGallery = document.getElementById("previewGallery");
  const previewTitle = document.getElementById("previewTitle");
  const previewDesc = document.getElementById("previewDesc");
  const previewTech = document.getElementById("previewTech");
  const previewGithub = document.getElementById("previewGithub");
  const closeBtn = document.getElementById("previewClose");

  let lastFocusedElement = null;

  function renderGallery(images, title) {
    previewGallery.innerHTML = "";

    // Com só uma imagem não faz sentido mostrar miniaturas
    if (!images || images.length < 2) {
      previewGallery.style.display = "none";
      return;
    }

    previewGallery.style.display = "flex";

    images.forEach((src, index) => {
      const thumb = document.createElement("img");
      thumb.src = src;
      thumb.alt = `Screenshot ${index + 1} do projeto ${title}`;
      if (index === 0) thumb.classList.add("is-active");

      thumb.addEventListener("click", () => {
        previewImage.src = src;
        previewGallery
          .querySelectorAll("img")
          .forEach((img) => img.classList.remove("is-active"));
        thumb.classList.add("is-active");
      });

      previewGallery.appendChild(thumb);
    });
  }

  function openPreview(projectId) {
    const data = projectsData[projectId];
    if (!data || !preview) return;

    const images = data.images || [];

    previewImage.src = images[0] || "";
    previewImage.alt = `Capa do projeto ${data.title}`;
    previewTitle.textContent = data.title;
    previewDesc.textContent = data.description;
    previewGithub.href = data.github;

    renderGallery(images, data.title);

    previewTech.innerHTML = "";
    data.tech.forEach((item) => {
      const span = document.createElement("span");
      span.textContent = item;
      previewTech.appendChild(span);
    });

    lastFocusedElement = document.activeElement;

    preview.classList.add("is-open");
    preview.setAttribute("aria-hidden", "false");
    document.body.classList.add("preview-open");

    closeBtn.focus();
  }

  function closePreview() {
    if (!preview) return;

    preview.classList.remove("is-open");
    preview.setAttribute("aria-hidden", "true");
    document.body.classList.remove("preview-open");

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  // Abre o preview ao clicar em "Ver projeto"
  document.querySelectorAll("[data-preview]").forEach((button) => {
    button.addEventListener("click", () => {
      openPreview(button.dataset.preview);
    });
  });

  // Fecha ao clicar no "x"
  if (closeBtn) {
    closeBtn.addEventListener("click", closePreview);
  }

  // Fecha ao clicar fora do card (no fundo escurecido)
  if (preview) {
    preview.addEventListener("click", (event) => {
      if (event.target === preview) {
        closePreview();
      }
    });
  }

  // Fecha com a tecla ESC
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && preview.classList.contains("is-open")) {
      closePreview();
    }
  });
});
