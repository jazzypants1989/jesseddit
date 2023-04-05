import Link from "./Link.js"
import { addToCart, removeFromCart } from "../features/cart.js"
import { getProducts } from "./store.js"

const products = await getProducts()

export default function render(component) {
  const main = document.querySelector(".main")
  main.innerHTML = component
  Link()
  window.addEventListener("load", () => {
    window.addEventListener("popstate", () => {
      Router(location.pathname)
    })
  })
}

export function buttonFinderAdd() {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    if (button.alreadyAdded) return
    button.alreadyAdded = true
    button.addEventListener("click", (e) => {
      const id = e.target.id
      const product = products.find((product) => product.id === Number(id))
      addToCart(product)
    })
  })
}

export function buttonFinderRemove() {
  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    if (button.alreadyAdded) return
    button.alreadyAdded = true
    button.addEventListener("click", (e) => {
      const id = e.target.id
      const product = products.find((product) => product.id === Number(id))
      removeFromCart(product)
    })
  })
}
