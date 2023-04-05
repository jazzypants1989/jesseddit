import { getProducts } from "../components/store.js"
import render, { buttonFinderRemove } from "../components/render.js"

export default async function Cart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {}
  document.title = "Cart"
  const products = await getProducts()
  if (Object.keys(cart).length === 0) {
    render(`
          <h1>Cart</h1>
          <p>Your cart is empty. Go buy some weird stuff!</p>
          `)
  } else {
    const cartItems = Object.keys(cart).map((id) => {
      const product = products.find((product) => product.id === Number(id))
      return `
            <div class="cart-item">
              <img src="${product.thumbnail}" alt="${product.title}" />
              <h2>${product.title}</h2>
              <p>$${product.price}</p>
              <p>Quantity: ${cart[id].quantity}</p>
              <button class="remove-from-cart" id="${product.id}">Remove from cart</button>
            </div>
            `
    })
    render(`
          <h1>Cart</h1>
          ${cartItems.join("")}
          `)
    buttonFinderRemove()
  }
}
