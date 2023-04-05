import Cart from "../pages/Cart.js"

const cart = JSON.parse(localStorage.getItem("cart")) || {}

for (const [key, value] of Object.entries(cart)) {
  console.log(key, value)
}

export default function updateCart() {
  const cartCount = document.querySelector("#cart-count")
  const cartAmount = document.querySelector("#cart-total")
  cartCount.innerText = Object.keys(cart).length
  cartAmount.innerText =
    "$" +
    Object.values(cart)
      .map((item) => item.product.price * item.quantity)
      .reduce((a, b) => a + b, 0)
      .toFixed(2)
}

export function addToCart(product) {
  if (cart[product.id]) {
    cart[product.id].quantity++
  } else {
    cart[product.id] = {
      quantity: 1,
      product,
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart))
  alert(`${product.title} added to cart!`)
  updateCart()
}

export function removeFromCart(product) {
  cart[product.id].quantity--
  if (cart[product.id].quantity === 0) {
    delete cart[product.id]
  }
  localStorage.setItem("cart", JSON.stringify(cart))
  alert(`${product.title} removed from cart!`)
  updateCart()
  Cart()
}
