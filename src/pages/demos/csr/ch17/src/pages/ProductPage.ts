import Nope from "./Nope.js"
import ProductComponent from "../components/Product.js"
import { getProduct } from "../components/store.js"
import render, { buttonFinderAdd } from "../components/render.js"

export default async function ProductPage(id?: string) {
  if (!id) return Nope(id)
  const product = await getProduct(id)
  if (!product) {
    return Nope(id)
  }
  const search = document.querySelector("#search") as HTMLInputElement
  document.title = product.title
  search.value = product.title
  product ? render(ProductComponent(product)) : Nope(id)
  buttonFinderAdd()
}
