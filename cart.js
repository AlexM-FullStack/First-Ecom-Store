// checkout cart logic
const cartItemsEl = document.getElementById("cart-items");
const cartTitle = document.querySelector(".cart-title");
const quote = document.querySelector("h3");

// retrieve shopping cart from local storage
const shoppingCart = JSON.parse(localStorage.getItem("cart"));

// display total no of cart items
const cartItemsCount = Object.values(shoppingCart).reduce(
  (total, item) => total + item.quantity,
  0
);

if (cartItemsCount > 0) {
  cartTitle.innerText = `You have ${cartItemsCount} items in your cart!`;
} else if (cartItemsCount == 0) {
  cartTitle.innerText = `Oh Shirt! Your cart is empty!`;
  quote.innerText = `Surely we have something that can make you look better!`;
}

let totalAmount = 0;

for (const id in shoppingCart) {
  if (shoppingCart.hasOwnProperty(id)) {
    const item = shoppingCart[id];
    const { name, quantity, price } = item;
    const itemAmount = quantity * price;

    totalAmount += itemAmount;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    const h3 = document.createElement("h3");
    h3.innerText = name;
    itemDiv.appendChild(h3);
    const p = document.createElement("p");
    p.innerText = `Qty ${quantity}`;
    itemDiv.appendChild(p);

    cartItemsEl.appendChild(itemDiv);
  }
}

// add shipping fee
const shippingFee = 25;
totalAmount += shippingFee;

// display final amount
const finalAmountEl = document.createElement("h3");
finalAmountEl.innerText = `Order Total $${totalAmount}`;
finalAmountEl.classList.add("total");
cartItemsEl.appendChild(finalAmountEl);
