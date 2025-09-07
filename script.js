//Elements references
const productsContainer = document.getElementById("productsContainer");
const cartContainer = document.getElementById("cartContainer");
const feedbackElement = document.getElementById("feedback");
const clearCartButton = document.getElementById("clearCart");
const sortByPriceButton = document.getElementById("sortByPrice");
//default products
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 80000,
  },
  {
    id: 2,
    name: "Smartphone",
    price: 10000,
  },
  {
    id: 3,
    name: "Headphones",
    price: 2000,
  },
  {
    id: 4,
    name: "Smartwatch",
    price: 5000,
  },
  {
    id: 5,
    name: "Tablet",
    price: 15000,
  },
];
//Empty cart
const cart = [];

//Used to reset the timer(user feedback)
let timerId;

clearCartButton.addEventListener("click", clearCart);

sortByPriceButton.addEventListener("click", sortByPrice);

function clearCart() {
  cart.length = 0;
  rendercartDetails();
  updateUserFeedback("Cart is Cleared", "success");
}

function sortByPrice() {
  cart.sort(function (product1, product2) {
    return product1.price - product2.price;
  });
  rendercartDetails();
  updateUserFeedback("Cart is Sorted", "success");
}

//Render product details
function renderProductDetails() {
  products.forEach(function (product) {
    // const productRow = `
    // <div class="product-row">
    //     <p>${product.name} - Rs. ${product.price}</p>
    //     <button>Add to cart</button>
    // </div>
    // `;
    // productsContainer.insertAdjacentHTML("beforeend", productRow);

    // Creating elements using DOM methods
    const { id, name, price } = product; // Object Destructuring
    const divElement = document.createElement("div"); // <div></div>
    divElement.className = "product-row"; // <div class="product-row"></div>
    divElement.innerHTML = ` 
    <p> ${name} - Rs. ${price} </p>
    <button onclick="addToCart(${id})">Add to cart</button>
    `; // <div class="product-row"> <p> Laptop - Rs. 80000 </p> <button>Add to cart</button> </div>
    productsContainer.appendChild(divElement); // Append the divElement to productsContainer
  });
}

//Render cart details
function rendercartDetails() {
  cartContainer.innerHTML = "";
  cart.forEach(function (product) {
    const { id, name, price } = product; // Object Destructuring with aliasing
    const cartItemRow = `
  <div class="product-row">
  <p> ${name} - Rs. ${price} </p>
  <button onclick="removeFromCart(${id})">Remove</button>
  </div>
  `; // <div class="product-row"> <p> Laptop - Rs. 80000 </p> <button>Remove</button> </div>
    cartContainer.insertAdjacentHTML("beforeend", cartItemRow);
  });
  const totalPrice = cart.reduce(function (acc, currProduct) {
    return acc + currProduct.price;
  }, 0);
  document.getElementById("totalPrice").textContent = `Rs. ${totalPrice}`;
}

//Add to cart
function addToCart(id) {
  const isproductInCart = cart.some((product) => product.id === id); // Check if product already in cart
  if (isproductInCart) {
    updateUserFeedback("Item already in cart", "error");
    return;
  }

  //console.log("Add to cart button clicked", id);
  const productToAdd = products.find(function (product) {
    return product.id === id;
  });
  //console.log(productToAdd);
  cart.push(productToAdd); // Adding product to cart array
  console.log(cart);
  rendercartDetails();

  updateUserFeedback(`${productToAdd["name"]} is added to cart`, "success");
}

//Remove from Cart
function removeFromCart(id) {
  console.log(id);
  const product = cart.find((product) => product.id === id);
  // const updatedCart = cart.filter(function (product) {
  //   return product.id !== id;
  // });
  const productIndex = cart.findIndex((product) => product.id === id);
  cart.splice(productIndex, 1);
  //console.log(updatedCart);
  updateUserFeedback(`${product.name} is removed from the cart`, "error");
  rendercartDetails();
}

function updateUserFeedback(msg, type) {
  clearTimeout(timerId);
  feedbackElement.style.display = "block";
  if (type === "success") {
    feedbackElement.style.backgroundColor = "#4caf50";
  }
  if (type === "error") {
    feedbackElement.style.backgroundColor = "red";
  }
  feedbackElement.textContent = msg;

  timerId = setTimeout(function () {
    feedbackElement.style.display = "none";
  }, 2000);
}

//Rendering Products
renderProductDetails();
