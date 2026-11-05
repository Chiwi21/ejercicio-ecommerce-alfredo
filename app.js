"use strict";

/**
 * Ejercicio Ecommerce con JavaScript puro.
 * Los productos están en el HTML y el carrito se guarda en localStorage.
 */

const STORAGE_KEY = "ecommerce-cart-alfredo-chiguano";

const productGrid = document.querySelector("#product-grid");
const cartList = document.querySelector("#cart-list");
const cartCount = document.querySelector("#cart-count");
const cartBadge = document.querySelector("#cart-badge");
const cartEmpty = document.querySelector("#cart-empty");
const cartSummary = document.querySelector("#cart-summary");
const summaryItems = document.querySelector("#summary-items");
const cartTotal = document.querySelector("#cart-total");
const clearCartButton = document.querySelector("#clear-cart");
const toast = document.querySelector("#toast");
const cartItemTemplate = document.querySelector("#cart-item-template");

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

let cart = loadCart();
let toastTimer;

function formatMoney(value) {
  return moneyFormatter.format(value);
}

function loadCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!Array.isArray(stored)) {
      return [];
    }

    return stored
      .filter(
        (item) =>
          item &&
          typeof item.id === "string" &&
          typeof item.name === "string" &&
          Number.isFinite(item.price) &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0
      )
      .map(({ id, name, price, quantity }) => ({ id, name, price, quantity }));
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Si el navegador bloquea localStorage, el carrito sigue funcionando en memoria.
  }
}

function getProductFromButton(button) {
  const card = button.closest(".product-card");

  return {
    id: card.dataset.id,
    name: card.dataset.name,
    price: Number(card.dataset.price),
  };
}

function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderCart();
  showToast(`${product.name} añadido al carrito`);
}

function changeQuantity(productId, difference) {
  const item = cart.find((entry) => entry.id === productId);

  if (!item) {
    return;
  }

  item.quantity += difference;

  if (item.quantity <= 0) {
    cart = cart.filter((entry) => entry.id !== productId);
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  renderCart();
}

function clearCart() {
  if (cart.length === 0) {
    return;
  }

  cart = [];
  saveCart();
  renderCart();
  showToast("Carrito vaciado");
}

function renderCart() {
  cartList.replaceChildren();

  const totalUnits = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  for (const item of cart) {
    const fragment = cartItemTemplate.content.cloneNode(true);
    const row = fragment.querySelector(".cart-item");

    row.dataset.id = item.id;
    fragment.querySelector(".cart-item__name").textContent = item.name;
    fragment.querySelector(".cart-item__unit").textContent = `${formatMoney(item.price)} c/u`;
    fragment.querySelector(".qty__value").textContent = item.quantity;
    fragment.querySelector(".cart-item__subtotal").textContent = formatMoney(
      item.price * item.quantity
    );
    fragment
      .querySelector('[data-action="remove"]')
      .setAttribute("aria-label", `Eliminar ${item.name} del carrito`);

    cartList.append(fragment);
  }

  cartCount.textContent = totalUnits;
  cartBadge.textContent = `${totalUnits} ${totalUnits === 1 ? "artículo" : "artículos"}`;
  summaryItems.textContent = totalUnits;
  cartTotal.textContent = formatMoney(totalPrice);
  cartEmpty.hidden = cart.length > 0;
  cartSummary.hidden = cart.length === 0;
  clearCartButton.disabled = cart.length === 0;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("toast--visible");

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("toast--visible");
  }, 2200);
}

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");

  if (!button) {
    return;
  }

  addToCart(getProductFromButton(button));
});

cartList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  const row = button?.closest(".cart-item");

  if (!button || !row) {
    return;
  }

  const productId = row.dataset.id;

  if (button.dataset.action === "increase") {
    changeQuantity(productId, 1);
  } else if (button.dataset.action === "decrease") {
    changeQuantity(productId, -1);
  } else if (button.dataset.action === "remove") {
    removeFromCart(productId);
  }
});

clearCartButton.addEventListener("click", clearCart);

renderCart();
