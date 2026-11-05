"use strict";

const menu = [
  { id: "dumplings", name: "dumplings", category: "snacks", price: 1090, rating: "4.9", time: "12 min", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80", emoji: "🥟", tag: "Bestseller", background: "#eef0df", description: "homemade dough, smashed avocado, chili flakes & minced meat." },
  { id: "grain-bowl", name: "Garden grain bowl", category: "Bowls", price: 1490, rating: "4.8", time: "18 min", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80", emoji: "🥗", tag: "Plant based", background: "#e7f0e5", description: "Herby grains, seasonal greens, hummus & tahini." },
  { id: "salmon-bowl", name: "Miso salmon bowl", category: "Bowls", price: 1790, rating: "4.9", time: "20 min", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80", emoji: "🍣", tag: "Popular", background: "#f4e8df", description: "Glazed salmon, brown rice, cucumber & sesame." },
  { id: "crispy-chicken", name: "Crispy chicken wrap", category: "Lunch", price: 1390, rating: "4.7", time: "15 min", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80", emoji: "🌯", tag: "", background: "#f2e9db", description: "Golden chicken, crunchy slaw & creamy herb sauce." },
  { id: "tomato-pasta", name: "Slow tomato pasta", category: "Lunch", price: 1590, rating: "4.8", time: "17 min", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80", emoji: "🍝", tag: "House favorite", background: "#f5e5dd", description: "Fresh pasta, slow-roasted tomato & parmesan." },
  { id: "berry-yogurt", name: "Berry yogurt cup", category: "Snacks", price: 690, rating: "4.6", time:"5 min", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80", emoji: "🫐", tag: "", background:"#eee9f4", description:"Greek yogurt, honey granola & market berries." },
  { id: "lemon-cake", name: "Little lemon cake", category: "Snacks", price: 590, rating: "4.7", time: "5 min", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80", emoji: "🍋", tag: "Sweet treat", background: "#f4f0dc", description: "A soft, sunny slice finished with lemon glaze." },
  { id: "iced-matcha", name: "Iced matcha latte", category: "Drinks", price: 650, rating: "4.8", time: "6 min", image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=80", emoji: "🍵", tag: "", background: "#e7eee2", description: "Ceremonial matcha, oat milk & a little ice." },
  { id: "citrus-soda", name: "Citrus mint soda", category: "Drinks", price: 490, rating: "4.6", time: "4 min", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80", emoji: "🍹", tag: "", background: "#f4e9d9", description: "Fresh citrus, garden mint & sparkling water." }
];

const categories = ["All", "Breakfast", "Bowls", "Lunch", "Snacks", "Drinks"];
const state = { category: "All", search: "", cart: new Map(), modal: null, confirmation: null, toastTimer: null };
const app = document.querySelector("#app");

function money(cents) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

function cartCount() {
  let count = 0;
  state.cart.forEach((quantity) => { count += quantity; });
  return count;
}

function subtotal() {
  let total = 0;
  state.cart.forEach((quantity, id) => {
    const item = menu.find((entry) => entry.id === id);
    if (item) total += item.price * quantity;
  });
  return total;
}

function render() {
  const search = state.search.trim().toLowerCase();
  const items = menu.filter((item) => {
    const matchesCategory = state.category === "All" || item.category === state.category;
    const matchesSearch = !search || `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  app.innerHTML = `
    <header class="site-header">
      <div class="header-inner">
        <button class="brand" type="button" data-action="home" aria-label="CraveKitchen home">Crave<span>Kitchen</span></button>
        <span class="header-note">Fresh from our kitchen, right to your door.</span>
        <button class="cart-button" type="button" data-action="cart" aria-label="Open your cart">
          Your order <span class="cart-count">${cartCount()}</span>
        </button>
      </div>
    </header>
    <main class="page">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-copy">
          <span class="eyebrow">Good food, good mood</span>
          <h1 id="hero-title">A little joy in every bite.</h1>
          <p>Thoughtful ingredients. Feel-good favorites. Delivered fresh.</p>
        </div>
        <div class="hero-art" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <!-- Bowl shadow -->
  <ellipse cx="250" cy="410" rx="160" ry="25" fill="#E8D5C4" opacity="0.6"/>

  <!-- Bowl body -->
  <path d="M100 260 Q100 400 250 400 Q400 400 400 260 Z" fill="#E85D3A" stroke="#C94A2A" stroke-width="3"/>

  <!-- Bowl rim -->
  <ellipse cx="250" cy="260" rx="150" ry="30" fill="#F06845" stroke="#C94A2A" stroke-width="3"/>

  <!-- Inner bowl ellipse (soup surface) -->
  <ellipse cx="250" cy="260" rx="135" ry="22" fill="#F5A623"/>

  <!-- Soup/broth -->
  <ellipse cx="250" cy="265" rx="130" ry="18" fill="#E8941A"/>

  <!-- Noodles - wavy lines -->
  <g stroke="#F5D76E" stroke-width="4" fill="none" stroke-linecap="round">
    <!-- Noodle wave 1 -->
    <path d="M145 255 Q165 240 185 255 Q205 270 225 255 Q245 240 265 255 Q285 270 305 255 Q325 240 345 255"/>
    <!-- Noodle wave 2 -->
    <path d="M155 265 Q175 250 195 265 Q215 280 235 265 Q255 250 275 265 Q295 280 315 265 Q335 250 345 265"/>
    <!-- Noodle wave 3 -->
    <path d="M165 275 Q185 260 205 275 Q225 290 245 275 Q265 260 285 275 Q305 290 325 275"/>
    <!-- Extra noodles -->
    <path d="M180 248 Q200 235 220 248 Q240 261 260 248 Q280 235 300 248"/>
    <!-- Curly noodle -->
    <path d="M190 285 Q210 295 230 285 Q250 275 270 285 Q290 295 310 285"/>
  </g>

  <!-- Egg -->
  <ellipse cx="210" cy="255" rx="28" ry="18" fill="#FFF5E0" stroke="#E8D5B0" stroke-width="2"/>
  <ellipse cx="210" cy="255" rx="12" ry="9" fill="#F5A623"/>

  <!-- Green onions -->
  <g fill="#4CAF50">
    <ellipse cx="300" cy="250" rx="8" ry="3" transform="rotate(-20 300 250)"/>
    <ellipse cx="315" cy="258" rx="7" ry="3" transform="rotate(15 315 258)"/>
    <ellipse cx="290" cy="262" rx="6" ry="2.5" transform="rotate(-10 290 262)"/>
    <ellipse cx="325" cy="248" rx="6" ry="2.5" transform="rotate(25 325 248)"/>
  </g>

  <!-- Chopsticks -->
  <g>
    <line x1="340" y1="140" x2="220" y2="300" stroke="#8B5E3C" stroke-width="6" stroke-linecap="round"/>
    <line x1="360" y1="130" x2="240" y2="290" stroke="#A0714F" stroke-width="6" stroke-linecap="round"/>
    <!-- Chopstick highlights -->
    <line x1="338" y1="145" x2="225" y2="295" stroke="#A0714F" stroke-width="2" stroke-linecap="round"/>
    <line x1="358" y1="135" x2="245" y2="285" stroke="#C49A6C" stroke-width="2" stroke-linecap="round"/>
  </g>

  <!-- Steam -->
  <g stroke="#D0D0D0" stroke-width="3" fill="none" opacity="0.6" stroke-linecap="round">
    <path d="M200 220 Q195 200 205 185 Q215 170 210 155"/>
    <path d="M240 215 Q235 195 245 180 Q255 165 250 150"/>
    <path d="M280 218 Q275 198 285 183 Q295 168 290 153"/>
  </g>

  <!-- Label on bowl -->
  <rect x="155" y="320" width="190" height="45" rx="10" fill="#FFF8F0" stroke="#C94A2A" stroke-width="2.5"/>

  <!-- Cravekitchen text -->
  <text x="250" y="350" font-family="Georgia, serif" font-size="22" font-weight="bold" fill="#E85D3A" text-anchor="middle" letter-spacing="1">
    cravekitchen
  </text>

  <!-- Small decorative line under text -->
  <line x1="190" y1="358" x2="310" y2="358" stroke="#F5A623" stroke-width="2" opacity="0.7"/>

  <!-- Bowl highlight -->
  <path d="M120 280 Q130 350 200 380" stroke="#F07858" stroke-width="4" fill="none" opacity="0.5" stroke-linecap="round"/>
</svg> alt="Delicious food" loading="lazy">
        </div>
      </section>
      <div class="info-strip" aria-label="Delivery information">
        <span>🚲 <strong>Free delivery</strong> over $25</span>
        <span>🌿 Fresh ingredients, always</span>
        <span>⏱️ Around 20–30 min</span>
      </div>
      <section aria-labelledby="menu-title">
        <div class="menu-heading">
          <div><h2 id="menu-title">On the menu</h2><p>Made fresh and ready when you are.</p></div>
          <label class="sr-only" for="menu-search">Search the menu</label>
          <input class="search" id="menu-search" type="search" placeholder="Search dishes..." value="${escapeHtml(state.search)}">
        </div>
        <div class="filters" role="group" aria-label="Filter menu by category">
          ${categories.map((category) => `<button class="filter-button${state.category === category ? " active" : ""}" type="button" data-category="${category}" aria-pressed="${state.category === category}">${category}</button>`).join("")}
        </div>
        <div class="menu-grid">
          ${items.length ? items.map((item) => `
            <article class="food-card">
              <div class="food-art" style="--art-bg:${item.background}" aria-hidden="true">
                ${item.tag ? `<span class="food-label">${item.tag}</span>` : ""}
                <span class="food-fallback">${item.emoji}</span>
                <img class="food-image" src="${item.image}" alt="" loading="lazy" decoding="async">
              </div>
              <div class="food-content">
                <div class="food-title-row"><h3>${item.name}</h3><span class="food-price">${money(item.price)}</span></div>
                <p class="food-description">${item.description}</p>
                <div class="food-footer"><span>★ ${item.rating} · ${item.time}</span><button class="add-button" type="button" data-add="${item.id}">＋ Add</button></div>
              </div>
            </article>
          `).join("") : `<div class="empty-results"><strong>No dishes found</strong>Try another search or choose a different category.</div>`}
        </div>
      </section>
    </main>
    <footer class="footer">CraveKitchen · Made with care, served with a smile.</footer>
    ${state.modal === "cart" ? renderCart() : ""}
    ${state.modal === "checkout" ? renderCheckout() : ""}
    ${state.modal === "confirmation" ? renderConfirmation() : ""}
  `;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function renderCart() {
  const rows = [];
  state.cart.forEach((quantity, id) => {
    const item = menu.find((entry) => entry.id === id);
    if (!item) return;
    rows.push(`
      <div class="cart-line">
        <div><div class="cart-line-name">${item.emoji} ${item.name}</div><div class="cart-line-sub">${money(item.price)} each</div></div>
        <div class="quantity" aria-label="${item.name} quantity">
          <button type="button" data-quantity="-1" data-id="${item.id}" aria-label="Remove one ${item.name}">−</button>
          <span>${quantity}</span>
          <button type="button" data-quantity="1" data-id="${item.id}" aria-label="Add one ${item.name}">+</button>
        </div>
      </div>
    `);
  });

  const total = subtotal();
  const delivery = total >= 2500 || total === 0 ? 0 : 299;
  return `
    <div class="overlay" data-overlay="true">
      <section class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <div class="dialog-header"><h2 id="dialog-title">Your order</h2><button class="icon-button" type="button" data-action="close" aria-label="Close dialog">×</button></div>
        <div class="dialog-body">
          ${rows.length ? `${rows.join("")}
            <div class="cart-summary">
              <div class="summary-row"><span>Subtotal</span><span>${money(total)}</span></div>
              <div class="summary-row"><span>Delivery</span><span>${delivery ? money(delivery) : "Free"}</span></div>
              ${total > 0 && total < 2500 ? `<div class="summary-row"><span>Add ${money(2500 - total)} for free delivery</span><span></span></div>` : ""}
              <div class="summary-row total"><span>Total</span><span>${money(total + delivery)}</span></div>
              <button class="primary-button checkout-button" type="button" data-action="checkout">Continue to checkout</button>
            </div>` : `<div class="cart-empty"><span>🛍️</span>Your cart is looking a little empty.<br>Add something delicious to get started.</div>`}
        </div>
      </section>
    </div>
  `;
}

function renderCheckout() {
  const total = subtotal();
  const delivery = total >= 2500 ? 0 : 299;
  return `
    <div class="overlay" data-overlay="true">
      <section class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <div class="dialog-header"><h2 id="dialog-title">Checkout</h2><button class="icon-button" type="button" data-action="back-cart" aria-label="Back to cart">×</button></div>
        <div class="dialog-body">
          <form id="checkout-form">
            <label class="field">Your name<input name="name" autocomplete="name" required maxlength="80" placeholder="e.g. Alex Morgan"></label>
            <label class="field">Email address<input name="email" type="email" autocomplete="email" required maxlength="254" placeholder="alex@example.com"></label>
            <label class="field">Delivery address<input name="address" autocomplete="street-address" required maxlength="160" placeholder="Street address and apartment"></label>
            <label class="field">Delivery instructions <input name="instructions" maxlength="160" placeholder="Optional"></label>
            <p class="form-error" id="form-error" role="alert"></p>
            <div class="summary-row total"><span>Order total</span><span>${money(total + delivery)}</span></div>
            <button class="primary-button checkout-button" type="submit">Place order · ${money(total + delivery)}</button>
          </form>
        </div>
      </section>
    </div>
  `;
}

function renderConfirmation() {
  const { name, email, orderNumber } = state.confirmation;
  return `
    <div class="overlay">
      <section class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <div class="dialog-header"><h2 id="dialog-title">Order confirmed</h2></div>
        <div class="dialog-body">
          <div class="confirmation">
            <div class="confirmation-icon" aria-hidden="true">🎉</div>
            <h3>Thanks, ${escapeHtml(name)}!</h3>
            <p>Your order <strong>${orderNumber}</strong> is confirmed. We'll send updates to ${escapeHtml(email)}.</p>
            <p>Your fresh food should be with you in about 20–30 minutes.</p>
            <button class="primary-button" type="button" data-action="finish">Back to the menu</button>
          </div>
        </div>
      </section>
    </div>
  `;
}

function showToast(message) {
  document.querySelector(".toast")?.remove();
  if (state.toastTimer) window.clearTimeout(state.toastTimer);
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.textContent = message;
  document.body.append(toast);
  state.toastTimer = window.setTimeout(() => toast.remove(), 2300);
}

function setQuantity(id, change) {
  const next = (state.cart.get(id) || 0) + change;
  if (next <= 0) state.cart.delete(id);
  else state.cart.set(id, next);
}

app.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;

  const categoryButton = target.closest("[data-category]");
  if (categoryButton) {
    state.category = categoryButton.dataset.category;
    render();
    return;
  }

  const addButton = target.closest("[data-add]");
  if (addButton) {
    const item = menu.find((entry) => entry.id === addButton.dataset.add);
    if (item) {
      setQuantity(item.id, 1);
      render();
      showToast(`${item.name} added to your order`);
    }
    return;
  }

  const quantityButton = target.closest("[data-quantity]");
  if (quantityButton) {
    setQuantity(quantityButton.dataset.id, Number(quantityButton.dataset.quantity));
    render();
    return;
  }

  const action = target.closest("[data-action]")?.dataset.action;
  if (action === "cart") state.modal = "cart";
  else if (action === "checkout" && cartCount() > 0) state.modal = "checkout";
  else if (action === "close" || action === "back-cart") state.modal = action === "back-cart" ? "cart" : null;
  else if (action === "finish") {
    state.modal = null;
    state.confirmation = null;
  }
  else if (action === "home") {
    state.category = "All";
    state.search = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (target.matches("[data-overlay]")) state.modal = null;
  else return;
  render();
});

app.addEventListener("input", (event) => {
  if (event.target instanceof HTMLInputElement && event.target.id === "menu-search") {
    const selectionStart = event.target.selectionStart;
    state.search = event.target.value;
    render();
    const searchInput = app.querySelector("#menu-search");
    searchInput.focus();
    searchInput.setSelectionRange(selectionStart, selectionStart);
  }
});

app.addEventListener("error", (event) => {
  if (event.target instanceof HTMLImageElement && event.target.classList.contains("food-image")) {
    event.target.hidden = true;
  }
}, true);

app.addEventListener("submit", (event) => {
  if (!(event.target instanceof HTMLFormElement) || event.target.id !== "checkout-form") return;
  event.preventDefault();
  const form = event.target;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  if (!name) {
    app.querySelector("#form-error").textContent = "Please enter your name to place this order.";
    return;
  }

  const orderNumber = `GF${Date.now().toString().slice(-6)}`;
  state.cart.clear();
  state.modal = "confirmation";
  state.confirmation = { name, email: String(data.get("email") || ""), orderNumber };
  render();
  showToast("Your order has been placed!");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.modal) {
    state.modal = null;
    render();
  }
});

render();