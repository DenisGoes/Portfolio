// =========================================
// DADOS DOS PROJETOS (usados no preview)
// =========================================
const projectsData = {
  "job-scraper": {
    title: "Sistema de busca de vagas de emprego",
    // caminhos de todas as imagens/screenshots do projeto.
    // A primeira da lista aparece como imagem principal do preview.
    images: [
      "src/imagens/capa-projetos/job-scraper.jpg",
    ],
    description:
      "Automatiza a busca de vagas em diferentes fontes, permite filtrar oportunidades por palavras-chave e reúne os resultados em um canal do Telegram. Conta com API REST, persistência em banco de dados, acompanhamento das vagas pelo Telegram, análise com Gemini e geração de currículo personalizado em DOCX.",
    tech: ["Python", "FastAPI", "Playwright", "PostgreSQL", "SQLAlchemy", "Telegram Bot API", "GitHub Actions"],
    github: "https://github.com/DenisGoes/job-web-scraper",
  },
  "sensor-estacionamento": {
    title: "Sensor de Estacionamento",
    images: [
      "src/imagens/capa-projetos/sensor-estacionamento.jpg",
    ],
    description:
      "Painel web em HTML, CSS e JavaScript que recebe em tempo real as leituras dos sensores ultrassônicos conectados ao ESP32. Os dados atualizam a interface para indicar quais vagas estão livres e quais estão ocupadas.",
    tech: ["HTML5", "CSS3", "JavaScript", "ESP32", "Sensores ultrassônicos"],
    github: "https://github.com/DenisGoes/SmartVagas",
  },
  "nt-scraper": {
    title: "NT Scraper",
    images: [
      "src/imagens/capa-projetos/scraper-noticias.jpg",
    ],
    description:
      "Sistema que busca, extrai e armazena notícias de tecnologia de fontes como Hacker News e Tecnoblog, distribuindo-as em um canal do Telegram. Possui API e webhook para integração com o bot, além de execução automatizada diária.",
    tech: ["Python", "FastAPI", "Playwright", "PostgreSQL", "SQLAlchemy", "Telegram Bot API", "GitHub Actions", "Docker"],
    github: "https://github.com/DenisGoes/scraping-noticias",
  },
};

// =========================================
// PREVIEW DO PROJETO (abrir / fechar)
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  const burgerCheckbox = document.getElementById("burger-checkbox");
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (burgerCheckbox) burgerCheckbox.checked = false;
    });
  });

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const submitButton = contactForm.querySelector('[type="submit"]');
      const formStatus = document.getElementById("formStatus");
      const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        _replyto: formData.get("email"),
        message: formData.get("message"),
        _subject: `Contato pelo portfólio: ${formData.get("name")}`,
      };

      submitButton.disabled = true;
      formStatus.textContent = "Enviando mensagem…";
      formStatus.classList.remove("is-error", "is-success");

      fetch("https://formsubmit.co/ajax/d.goesdev@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(async (response) => {
          const result = await response.json();
          if (!response.ok || result.success === false) {
            throw new Error(result.message || "Não foi possível enviar a mensagem.");
          }
          contactForm.reset();
          formStatus.textContent = "Mensagem enviada! Obrigado pelo contato.";
          formStatus.classList.add("is-success");
        })
        .catch(() => {
          formStatus.textContent =
            "Não foi possível enviar agora. Tente novamente em instantes.";
          formStatus.classList.add("is-error");
        })
        .finally(() => {
          submitButton.disabled = false;
        });
    });
  }

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
