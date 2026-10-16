// assets/js/main.js
// Lógica de interação do Site da Padaria Piko

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  renderMenu("todos");
  initMenuFilters();
  renderReviews();
  initGalleryModal();
  initGallerySlider();
  updateCurrentYear();
});

// Número de WhatsApp configurável da padaria (com DDD, somente números)
// Exemplo: 5511999999999
const BAKERY_WHATSAPP = "5511999999999";

/* ========================================================
   1. MENU MOBILE & NAVBAR SCROLL
   ======================================================== */
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const links = document.querySelectorAll(".nav-link");

  // Alternar menu hamburguer no mobile
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");
      navToggle.setAttribute("aria-expanded", isOpen);
      navToggle.classList.toggle("open");
    });
  }

  // Fechar menu mobile ao clicar em um link
  links.forEach(link => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        if (navToggle) navToggle.classList.remove("open");
      }
    });
  });

  // Efeito de sombra/fundo na barra ao rolar a página
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/* ========================================================
   2. RENDERIZAÇÃO DO CARDÁPIO & FILTROS POR CATEGORIA
   ======================================================== */
function renderMenu(filterCategory = "todos") {
  const menuGrid = document.getElementById("menuGrid");
  if (!menuGrid || typeof menuData === "undefined") return;

  // Filtragem dos itens
  const filteredItems = filterCategory === "todos"
    ? menuData
    : menuData.filter(item => item.category === filterCategory);

  menuGrid.innerHTML = "";

  if (filteredItems.length === 0) {
    menuGrid.innerHTML = `
      <div class="menu-empty">
        <p>Nenhum produto encontrado nesta categoria no momento.</p>
      </div>
    `;
    return;
  }

  filteredItems.forEach(item => {
    const card = document.createElement("article");
    card.className = "menu-card";

    // Criação do link direto para WhatsApp com mensagem personalizada
    const message = encodeURIComponent(`Olá, Padaria Piko! Gostaria de pedir: *${item.name}* (${item.price}).`);
    const waLink = `https://wa.me/${BAKERY_WHATSAPP}?text=${message}`;

    card.innerHTML = `
      <div class="menu-card-image-wrap">
        <img src="${item.image}" alt="${item.name}" loading="lazy" class="menu-card-image">
        ${item.badge ? `<span class="badge-tag">${item.badge}</span>` : ""}
      </div>
      <div class="menu-card-content">
        <div class="menu-card-header">
          <h3 class="menu-card-title">${item.name}</h3>
          <span class="menu-card-price">${item.price}</span>
        </div>
        <p class="menu-card-desc">${item.description}</p>
        <div class="menu-card-footer">
          <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-wa">
            <svg class="icon-sm" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.06c-1.52 0-3-.41-4.3-1.18l-.31-.18-3.19.84.85-3.11-.2-.32a8.13 8.13 0 01-1.25-4.3c0-4.5 3.66-8.15 8.15-8.15 2.18 0 4.22.85 5.76 2.39a8.1 8.1 0 012.39 5.76c0 4.5-3.66 8.13-8.15 8.13z"/>
            </svg>
            Pedir no WhatsApp
          </a>
        </div>
      </div>
    `;

    menuGrid.appendChild(card);
  });
}

function initMenuFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-category");
      renderMenu(category);
    });
  });
}

/* ========================================================
   3. RENDERIZAÇÃO DAS AVALIAÇÕES (COMENTÁRIOS)
   ======================================================== */
function renderReviews() {
  const reviewsContainer = document.getElementById("reviewsGrid");
  if (!reviewsContainer || typeof reviewsData === "undefined") return;

  reviewsContainer.innerHTML = "";

  reviewsData.forEach(review => {
    const card = document.createElement("div");
    card.className = "review-card";

    // Geração das estrelas (1 a 5)
    let starsHtml = "";
    for (let i = 0; i < 5; i++) {
      starsHtml += `<span class="star-icon ${i < review.rating ? 'filled' : ''}">★</span>`;
    }

    card.innerHTML = `
      <div class="review-stars">${starsHtml}</div>
      <p class="review-text">"${review.comment}"</p>
      <div class="review-author">
        <div class="review-avatar">${review.name.charAt(0)}</div>
        <div class="review-meta">
          <h4 class="review-name">${review.name}</h4>
          <span class="review-role">${review.role} • <time>${review.date}</time></span>
        </div>
      </div>
    `;

    reviewsContainer.appendChild(card);
  });
}

/* ========================================================
   4. MODAL / LIGHTBOX PARA A GALERIA DE FOTOS
   ======================================================== */
function initGalleryModal() {
  const modal = document.getElementById("galleryModal");
  const modalImg = document.getElementById("galleryModalImg");
  const modalCaption = document.getElementById("galleryModalCaption");
  const modalClose = document.getElementById("galleryModalClose");
  const galleryItems = document.querySelectorAll(".gallery-item img");

  if (!modal || !modalImg) return;

  galleryItems.forEach(img => {
    img.addEventListener("click", () => {
      modal.classList.add("active");
      modalImg.src = img.src;
      modalCaption.textContent = img.alt || "Galeria Padaria Piko";
    });
  });

  const closeModal = () => {
    modal.classList.remove("active");
  };

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

/* ========================================================
   5. SLIDER / DESLIZE DA GALERIA DE FOTOS
   ======================================================== */
function initGallerySlider() {
  const track = document.getElementById("galleryTrack");
  const prevBtn = document.getElementById("galleryPrevBtn");
  const nextBtn = document.getElementById("galleryNextBtn");
  const dots = document.querySelectorAll(".gallery-dot");
  if (!track) return;

  function updateControls() {
    const scrollLeft = track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const slideWidth = track.clientWidth;
    const currentSlide = Math.round(scrollLeft / (slideWidth > 0 ? slideWidth : 1));

    if (prevBtn) prevBtn.disabled = scrollLeft <= 15;
    if (nextBtn) nextBtn.disabled = scrollLeft >= maxScroll - 15;

    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentSlide);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      track.scrollTo({ left: idx * track.clientWidth, behavior: "smooth" });
    });
  });

  track.addEventListener("scroll", () => {
    window.requestAnimationFrame(updateControls);
  }, { passive: true });

  // Suporte a deslize arrastando com o mouse (Drag to Scroll)
  let isDown = false;
  let startX = 0;
  let scrollLeftStart = 0;
  let hasDragged = false;

  track.addEventListener("mousedown", (e) => {
    isDown = true;
    hasDragged = false;
    startX = e.pageX - track.offsetLeft;
    scrollLeftStart = track.scrollLeft;
    track.classList.add("dragging");
  });

  window.addEventListener("mouseup", () => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove("dragging");
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 8) {
      hasDragged = true;
      e.preventDefault();
      track.scrollLeft = scrollLeftStart - walk;
    }
  });

  // Previne abertura indevida do modal ao arrastar com mouse
  track.querySelectorAll(".gallery-item img").forEach(img => {
    img.addEventListener("click", (e) => {
      if (hasDragged) {
        e.stopImmediatePropagation();
        e.preventDefault();
        hasDragged = false;
      }
    }, true);
  });

  // Navegação por teclado ao focar no track
  track.setAttribute("tabindex", "0");
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
    }
  });

  // Atualizar estado inicial e em redimensionamento
  updateControls();
  window.addEventListener("resize", updateControls);
}

/* ========================================================
   6. UTILITÁRIOS
   ======================================================== */
function updateCurrentYear() {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ========================================================
   LÓGICA DOS CARDÁPIOS E PEDIDOS WHATSAPP - PADARIA PIKO
   ======================================================== */

const PIKO_WHATSAPP = "5548996210970";

const pikoSalgadosFritos = [
  "Bolinha de Queijo",
  "Coxinha",
  "Kibe",
  "Pastel de Carne",
  "Salsichinha",
  "Risoles de Frango",
  "Risoles de Palmito",
  "Risoles de Presunto e Queijo"
];

const pikoSalgadosAssados = [
  "Mini Assado de Frango",
  "Mini Assado de Calabresa",
  "Mini Croissant de Frango",
  "Mini Croissant de Presunto e Queijo"
];

const pikoTortasGourmet = [
  "Alpino",
  "Charge",
  "Ferrero Rocher",
  "Kinder Bueno",
  "Morango com Ferrero Rocher",
  "Morango com Nutella",
  "Nutella com Creme de Ninho",
  "Rafaello"
];

const pikoTortasTradicionais = [
  "Abacaxi com Coco",
  "Abacaxi e Creme de Ninho",
  "Ameixa com Coco",
  "Brigadeiro e Beijinho",
  "Frutas Tropicais",
  "Morango e Bombom",
  "Morango e Creme de Ninho",
  "Morango com Beijinho",
  "Morango com Brigadeiro",
  "Ouro Branco e 4 Leites",
  "Ouro Branco e Creme de Ninho",
  "Paçoca",
  "Prestígio",
  "Quatro Leites",
  "Sonho de Valsa e 4 Leites",
  "Sonho de Valsa e Creme Ninho"
];

const pikoSobremesas = [
  { nome: "Banoffee", preco: 49.99 },
  { nome: "Morangonoffe", preco: 54.99 },
  { nome: "Torta Alemã", preco: 65.99 },
  { nome: "Torta de Limão", preco: 49.99 },
  { nome: "Pudim de Leite Condensado", preco: 49.99 }
];

// Estado interno do pedido
const pikoSalgadosQty = {};
let pikoSelectedTorta = "";
const pikoSobremesasKg = {};

function initPikoMenus() {
  // 1. Salgados Fritos
  const fritosEl = document.getElementById("piko-list-fritos");
  if (fritosEl) {
    pikoSalgadosFritos.forEach((nome, idx) => {
      const key = `frito_${idx}`;
      pikoSalgadosQty[key] = 0;
      fritosEl.innerHTML += renderPikoSalgadoRow(key, nome, 1.00);
    });
  }

  // 2. Salgados Assados
  const assadosEl = document.getElementById("piko-list-assados");
  if (assadosEl) {
    pikoSalgadosAssados.forEach((nome, idx) => {
      const key = `assado_${idx}`;
      pikoSalgadosQty[key] = 0;
      assadosEl.innerHTML += renderPikoSalgadoRow(key, nome, 1.80);
    });
  }

  // 3. Tortas Gourmet (Radio - 1 sabor)
  const gourmetEl = document.getElementById("piko-list-tortas-gourmet");
  if (gourmetEl) {
    pikoTortasGourmet.forEach((sabor) => {
      gourmetEl.innerHTML += renderPikoTortaRadio(sabor, "Gourmet");
    });
  }

  // 4. Tortas Tradicionais (Radio - 1 sabor)
  const tradEl = document.getElementById("piko-list-tortas-tradicionais");
  if (tradEl) {
    pikoTortasTradicionais.forEach((sabor) => {
      tradEl.innerHTML += renderPikoTortaRadio(sabor, "Tradicional");
    });
  }

  // 5. Sobremesas
  const sobremesasEl = document.getElementById("piko-list-sobremesas");
  if (sobremesasEl) {
    pikoSobremesas.forEach((item, idx) => {
      pikoSobremesasKg[idx] = 0;
      sobremesasEl.innerHTML += `
        <div class="piko-item-row" id="piko-row-sob-${idx}">
          <div>
            <span class="piko-item-info">${item.nome}</span>
            <span class="piko-item-sub">R$ ${item.preco.toFixed(2).replace('.', ',')} / kg</span>
          </div>
          <div class="piko-qty-controls">
            <button type="button" class="piko-qty-btn" onclick="changePikoSobremesaKg(${idx}, -0.5)">-</button>
            <input type="number" class="piko-qty-input" id="piko-input-sob-${idx}" value="0" min="0" step="0.5"
              onchange="setPikoSobremesaKg(${idx}, this.value)">
            <button type="button" class="piko-qty-btn" onclick="changePikoSobremesaKg(${idx}, 0.5)">+</button>
            <span style="font-size:0.85rem; color:var(--text-muted); margin-left:4px;">kg</span>
          </div>
        </div>
      `;
    });
  }
}

function renderPikoSalgadoRow(key, nome, unitPrice) {
  return `
    <div class="piko-item-row" id="piko-row-${key}">
      <div>
        <span class="piko-item-info">${nome}</span>
        <span class="piko-item-sub">R$ ${(unitPrice * 100).toFixed(2).replace('.', ',')} / cento</span>
      </div>
      <div class="piko-qty-controls">
        <button type="button" class="piko-qty-btn" onclick="changePikoSalgadoQty('${key}', -5)">-5</button>
        <input type="number" class="piko-qty-input" id="piko-input-${key}" value="0" min="0" step="1"
          oninput="setPikoSalgadoQty('${key}', this.value)">
        <button type="button" class="piko-qty-btn" onclick="changePikoSalgadoQty('${key}', 5)">+5</button>
      </div>
    </div>
  `;
}

function renderPikoTortaRadio(sabor, categoria) {
  const fullVal = `${sabor} (${categoria})`;
  return `
    <label class="piko-radio-card" onclick="selectPikoTorta(this, '${fullVal}')">
      <input type="radio" name="piko_torta_sabor" value="${fullVal}">
      <span>${sabor}</span>
    </label>
  `;
}

// --- Funções de Salgados ---
function changePikoSalgadoQty(key, delta) {
  const current = pikoSalgadosQty[key] || 0;
  setPikoSalgadoQty(key, Math.max(0, current + delta));
}

function setPikoSalgadoQty(key, val) {
  const parsed = Math.max(0, parseInt(val, 10) || 0);
  pikoSalgadosQty[key] = parsed;
  document.getElementById(`piko-input-${key}`).value = parsed;

  const row = document.getElementById(`piko-row-${key}`);
  if (parsed > 0) row.classList.add("has-qty");
  else row.classList.remove("has-qty");

  updatePikoSalgadosSummary();
}

function updatePikoSalgadosSummary() {
  let totalUnits = 0;
  let totalPrice = 0;

  pikoSalgadosFritos.forEach((_, idx) => {
    const q = pikoSalgadosQty[`frito_${idx}`] || 0;
    totalUnits += q;
    totalPrice += q * 1.00;
  });

  pikoSalgadosAssados.forEach((_, idx) => {
    const q = pikoSalgadosQty[`assado_${idx}`] || 0;
    totalUnits += q;
    totalPrice += q * 1.80;
  });

  document.getElementById("piko-salgados-count").textContent = `${totalUnits} unidades`;
  document.getElementById("piko-salgados-total").textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
}

function sendPikoSalgadosWA() {
  let lines = [];
  let totalUnits = 0;
  let totalPrice = 0;

  pikoSalgadosFritos.forEach((nome, idx) => {
    const q = pikoSalgadosQty[`frito_${idx}`] || 0;
    if (q > 0) {
      lines.push(`• ${q}x ${nome} (Frito)`);
      totalUnits += q;
      totalPrice += q * 1.00;
    }
  });

  pikoSalgadosAssados.forEach((nome, idx) => {
    const q = pikoSalgadosQty[`assado_${idx}`] || 0;
    if (q > 0) {
      lines.push(`• ${q}x ${nome} (Assado)`);
      totalUnits += q;
      totalPrice += q * 1.80;
    }
  });

  if (totalUnits === 0) {
    alert("Adicione a quantidade de pelo menos um salgado antes de enviar!");
    return;
  }

  const msg = `Olá, *Padaria Piko do Pão*! Gostaria de encomendar os seguintes salgados:\n\n${lines.join('\n')}\n\n*Total de Salgados:* ${totalUnits} unidades\n*Valor Estimado:* R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
  window.open(`https://wa.me/${PIKO_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
}

// --- Funções de Tortas (1 Sabor) ---
function selectPikoTorta(labelEl, flavorName) {
  document.querySelectorAll("#piko-modal-tortas .piko-radio-card").forEach(el => el.classList.remove("selected"));
  labelEl.classList.add("selected");
  pikoSelectedTorta = flavorName;
  updatePikoTortaSummary();
}

function changePikoTortaWeight(delta) {
  const input = document.getElementById("piko-torta-weight");
  let val = parseFloat(input.value) || 1.0;
  val = Math.max(1.0, val + delta);
  input.value = val.toFixed(1).replace('.0', '');
  updatePikoTortaSummary();
}

function updatePikoTortaSummary() {
  const weight = Math.max(0.5, parseFloat(document.getElementById("piko-torta-weight").value) || 1.5);
  const total = weight * 59.99;
  document.getElementById("piko-torta-selected").textContent = pikoSelectedTorta || "Nenhum selecionado";
  document.getElementById("piko-torta-total").textContent = `R$ ${total.toFixed(2).replace('.', ',')} (${weight} kg)`;
}

function sendPikoTortaWA() {
  if (!pikoSelectedTorta) {
    alert("Por favor, selecione 1 sabor de torta antes de enviar!");
    return;
  }
  const weight = Math.max(0.5, parseFloat(document.getElementById("piko-torta-weight").value) || 1.5);
  const total = weight * 59.99;
  const msg = `Olá, *Padaria Piko do Pão*! Gostaria de encomendar uma Torta:\n\n• *Sabor:* ${pikoSelectedTorta}\n• *Peso aproximado:* ${weight} kg\n• *Valor Estimado:* R$ ${total.toFixed(2).replace('.', ',')}`;
  window.open(`https://wa.me/${PIKO_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
}

// --- Funções de Sobremesas ---
function changePikoSobremesaKg(idx, delta) {
  const current = pikoSobremesasKg[idx] || 0;
  setPikoSobremesaKg(idx, Math.max(0, current + delta));
}

function setPikoSobremesaKg(idx, val) {
  const parsed = Math.max(0, parseFloat(val) || 0);
  pikoSobremesasKg[idx] = parsed;
  document.getElementById(`piko-input-sob-${idx}`).value = parsed;

  const row = document.getElementById(`piko-row-sob-${idx}`);
  if (parsed > 0) row.classList.add("has-qty");
  else row.classList.remove("has-qty");

  updatePikoSobremesasSummary();
}

function updatePikoSobremesasSummary() {
  let total = 0;
  pikoSobremesas.forEach((item, idx) => {
    total += (pikoSobremesasKg[idx] || 0) * item.preco;
  });
  document.getElementById("piko-sobremesas-total").textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function sendPikoSobremesasWA() {
  let lines = [];
  let total = 0;

  pikoSobremesas.forEach((item, idx) => {
    const kg = pikoSobremesasKg[idx] || 0;
    if (kg > 0) {
      const sub = kg * item.preco;
      lines.push(`• ${kg} kg de ${item.nome} (R$ ${sub.toFixed(2).replace('.', ',')})`);
      total += sub;
    }
  });

  if (lines.length === 0) {
    alert("Selecione a quantidade de pelo menos uma sobremesa!");
    return;
  }

  const msg = `Olá, *Padaria Piko do Pão*! Gostaria de encomendar as seguintes sobremesas:\n\n${lines.join('\n')}\n\n*Valor Estimado:* R$ ${total.toFixed(2).replace('.', ',')}`;
  window.open(`https://wa.me/${PIKO_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
}

// --- Controle de Abertura/Fechamento dos Modais ---
function openPikoModal(type) {
  closePikoModals();
  const modal = document.getElementById(`piko-modal-${type}`);
  if (modal) modal.classList.add("active");
}

function closePikoModals() {
  document.querySelectorAll(".piko-modal-overlay").forEach(m => m.classList.remove("active"));
}

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("piko-modal-overlay")) {
    closePikoModals();
  }
});

document.addEventListener("DOMContentLoaded", initPikoMenus);