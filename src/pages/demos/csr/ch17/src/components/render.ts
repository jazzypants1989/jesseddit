import Link from "./Link.js"
import { addToCart, removeFromCart } from "../features/cart.js"
import { getProducts } from "./store.js"
import Router from "./Router.js"

export default function render(component: string) {
  const main = document.querySelector(".main")!
  main.innerHTML = component
  Link()
  window.addEventListener("load", () => {
    window.addEventListener("popstate", () => {
      Router(location.pathname)
    })
  })
}

const products = await getProducts()

interface CustomButton extends HTMLButtonElement {
  alreadyAdded?: boolean
}

export function buttonFinderAdd() {
  const buttons: NodeListOf<CustomButton> =
    document.querySelectorAll(".add-to-cart")

  function handleClick(e: MouseEvent) {
    const target = e.target as CustomButton
    const id = target?.id
    const product = products.find((product) => product.id === Number(id))
    if (!product) {
      alert("Database Error: Product not found")
      return
    }
    addToCart(product)
  }

  buttons.forEach((button) => {
    if (button.alreadyAdded) return
    button.alreadyAdded = true
    button.addEventListener("click", handleClick)
  })
}

export function buttonFinderRemove() {
  const buttons: NodeListOf<CustomButton> =
    document.querySelectorAll(".remove-from-cart")
  buttons.forEach((button) => {
    if (button.alreadyAdded) return
    button.alreadyAdded = true
    button.addEventListener("click", (e) => {
      const id = (e.target as CustomButton).id
      const product = products.find((product) => product.id === Number(id))
      if (!product) {
        alert("Database Error: Product not found")
        return
      }
      removeFromCart(product)
    })
  })
}
