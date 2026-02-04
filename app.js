
const products = [
  { id: 1, name: "Rice", price: 60, img: "images/rice.jpeg" },
  { id: 2, name: "Sugar", price: 45, img: "images/sugar.jpeg" },
  { id: 3, name: "Milk", price: 30, img: "images/milk.jpeg" },
  { id: 4, name: "Eggs", price: 6, img: "images/egg.jpeg" },
  { id: 5, name: "Bread", price: 25, img: "images/bread.jpeg" },
  { id: 6, name: "Butter", price: 50, img: "images/butter.jpeg" },
  { id: 7, name: "Tea", price: 120, img: "images/tea.jpeg" },
  { id: 8, name: "Coffee", price: 150, img: "images/coffee.jpeg" },
  { id: 9, name: "Oil", price: 140, img: "images/oil.jpeg" },
  { id: 10, name: "Salt", price: 20, img: "images/salt.jpeg" },
  { id: 11, name: "Apple", price: 80, img: "images/apple.jpeg" },
  { id: 12, name: "Banana", price: 40, img: "images/banana.jpeg" },
  { id: 13, name: "Tomato", price: 35, img: "images/tomato.jpeg" },
  { id: 14, name: "Potato", price: 30, img: "images/potato.jpeg" },
  { id: 15, name: "Soap", price: 28, img: "images/soap.jpeg" }
];



const productContainer = document.getElementById("productContainer");
const cartContainer = document.getElementById("cartContainer");
const searchInput = document.getElementById("searchInput");
const emptyMsg = document.getElementById("emptyMsg");
const toast = document.getElementById("toast");

let cart = JSON.parse(localStorage.getItem("cart")) || [];



function renderProducts(list) {
  productContainer.innerHTML = "";

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.img}">
      <h4>${p.name}</h4>
      <p>₹ ${p.price}</p>
      <button onclick="addToCart(${p.id})">Add</button>
    `;

    productContainer.appendChild(card);
  });
}

renderProducts(products);



searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  renderProducts(filtered);
});



function addToCart(id) {
  const item = cart.find(i => i.id === id);

  if (item) item.qty++;
  else cart.push({ id, qty: 1 });

  saveCart();
  showToast();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  item.qty += delta;

  if (item.qty <= 0)
    cart = cart.filter(i => i.id !== id);

  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}



function renderCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    emptyMsg.style.display = "block";
    updateBill();
    return;
  }

  emptyMsg.style.display = "none";

  cart.forEach(c => {
    const product = products.find(p => p.id === c.id);

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.img}">
      <h4>${product.name}</h4>
      <p>₹ ${product.price}</p>
      <p>
        <button onclick="changeQty(${c.id},-1)">-</button>
        ${c.qty}
        <button onclick="changeQty(${c.id},1)">+</button>
      </p>
    `;

    cartContainer.appendChild(card);
  });

  updateBill();
}



function updateBill() {
  let subtotal = 0;

  cart.forEach(c => {
    const product = products.find(p => p.id === c.id);
    subtotal += product.price * c.qty;
  });

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  document.getElementById("subtotal").innerText = subtotal.toFixed(2);
  document.getElementById("tax").innerText = tax.toFixed(2);
  document.getElementById("total").innerText = total.toFixed(2);
}



function showToast() {
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1200);
}



document.getElementById("clearCart").onclick = () => {
  cart = [];
  saveCart();
};


renderCart();
