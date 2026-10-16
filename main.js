
const shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [
  { name: "Eggs", price: 40, purchased: false },
  { name: "Milk", price: 80, purchased: false }
];

const shoppingCart = document.querySelector("#cart");
const form = document.querySelector("#shopping-list-form");
const totalElement = document.querySelector("#total");
const clearButton = document.querySelector("#clear-list");

// Save shopping list to local storage
function saveList() {
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

// Display all shopping list items
function renderList() {
  shoppingCart.innerHTML = "";

  shoppingList.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");

    if (item.purchased) {
      li.classList.add("purchased");
    }

    li.innerHTML = `
      <p class="item-name">${item.name}</p>
      <p class="item-price">KES ${item.price}</p>

      <label class="purchase-label">
        <input type="checkbox"
          class="purchase-checkbox"
          data-index="${index}"
          ${item.purchased ? "checked" : ""}>
        Mark Purchased
      </label>

      <button class="edit-btn" data-index="${index}">
        Edit
      </button>
    `;

    shoppingCart.append(li);
  });

  updateTotal();
}

// Calculate total cost of purchased items
function updateTotal() {
  const total = shoppingList.reduce((sum, item) => {
    return item.purchased ? sum + item.price : sum;
  }, 0);

  totalElement.textContent =
    "Purchased Total: KES " + total.toFixed(2);
}

// Add new item
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.elements["name"].value.trim();
  const price = Number(form.elements["price"].value);

  if (!name || !Number.isFinite(price) || price < 0) return;

  shoppingList.push({
    name: name,
    price: price,
    purchased: false
  });

  saveList();
  renderList();
  form.reset();
});

// Mark an item as purchased
shoppingCart.addEventListener("change", (event) => {
  if (event.target.classList.contains("purchase-checkbox")) {
    const index = Number(event.target.dataset.index);

    shoppingList[index].purchased = event.target.checked;

    saveList();
    renderList();
  }
});

// Edit an existing item
shoppingCart.addEventListener("click", (event) => {
  if (event.target.classList.contains("edit-btn")) {
    const index = Number(event.target.dataset.index);
    const item = shoppingList[index];

    const newName = prompt("Edit item name:", item.name);
    if (newName === null || !newName.trim()) return;

    const newPrice = prompt("Edit item price:", item.price);
    if (newPrice === null || newPrice.trim() === "") return;

    const price = Number(newPrice);

    if (!Number.isFinite(price) || price < 0) {
      alert("Please enter a valid price.");
      return;
    }

    item.name = newName.trim();
    item.price = price;

    saveList();
    renderList();
  }
});

// Clear shopping list
clearButton.addEventListener("click", () => {
  shoppingList.length = 0;

  saveList();
  renderList();
});

// Display list when page loads
renderList();
