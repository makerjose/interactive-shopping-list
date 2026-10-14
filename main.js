const shoppingList = [
  { name: "Eggs", price: 40, purchased: false },
  { name: "Milk", price: 80, purchased: false }
];

const shoppingCart = document.querySelector("#cart");
const form = document.querySelector("#shopping-list-form");
const totalElement = document.querySelector("#total");
const clearButton = document.querySelector("#clear-list");

// Display an item in the shopping cart
function displayCartItem(item) {

  const newItem = document.createElement("li"); // create new list inside the ul element
  newItem.classList.add("cart-item");  // class name for styling

  // Item Name
  const itemName = document.createElement("p");
  itemName.classList.add("item-name");   // class name for styling
  itemName.textContent = item.name;

  // Item Price
  const itemPrice = document.createElement("p");
  itemPrice.classList.add("item-price");   // class name for styling
  itemPrice.textContent = "KES " + item.price

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("purchase-checkbox");
  checkbox.checked = item.purchased;

  // Checkbox Label
  const checkboxLabel = document.createElement("label");
  checkboxLabel.classList.add("purchase-label");

  checkboxLabel.append(checkbox, "Mark Purchased");

  // Add elements to list item
  newItem.append(itemName, itemPrice, checkboxLabel);

  // Add item to shopping cart
  shoppingCart.append(newItem);

  // Apply purchased styling if already purchased
  if (item.purchased) {
    newItem.classList.add("purchased");
  }
}

// Calculate total cost of purchased items
function updateTotal() {

  const total = shoppingList.reduce((sum, item) => {
    if (item.purchased) {
      return sum + item.price;
    }

    return sum;
  }, 0);

  totalElement.textContent =
    "Purchased Total: KES " + total.toFixed(2);
}

// Display initial shopping list
shoppingList.forEach(item => {
  displayCartItem(item);
});

// Handle adding new items
function handleSubmit(event) {
  event.preventDefault();

  const newName = form.elements["name"].value.trim();
  const newPrice = Number(form.elements["price"].value);

  const newItem = {
    name: newName,
    price: newPrice,
    purchased: false // false by default and updated to true once marked
  };

  shoppingList.push(newItem);
  displayCartItem(newItem);

  form.reset();
}

// Add Item Event Listener
form.addEventListener("submit", handleSubmit);

// Mark Purchased Event Listener
shoppingCart.addEventListener("change", (event) => {

  if (!event.target.classList.contains("purchase-checkbox")) {
    return;
  }

  const checkbox = event.target;
  const listItem = checkbox.closest(".cart-item");

  // Find the index of the selected list item
  const index = Array.from(shoppingCart.children).indexOf(listItem);

  // Update the array
  shoppingList[index].purchased = checkbox.checked;

  // Update visual appearance
  listItem.classList.toggle("purchased", checkbox.checked);

  // Recalculate total
  updateTotal();
});

// Clear List Event Listener
clearButton.addEventListener("click", () => {
  shoppingList.length = 0; // empty the sshopping list array
  shoppingCart.innerHTML = ""; // remove list items from the DOM

  updateTotal(); // reset purchased total
});

// Initialize total
updateTotal();
