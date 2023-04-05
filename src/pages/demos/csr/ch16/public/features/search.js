import render, { buttonFinderAdd } from "../components/render.js"
import { getProducts } from "../components/store.js"
import ProductComponent from "../components/Product.js"

const products = await getProducts()

export const search = document.querySelector("#search")

export function searchListener() {
  search.addEventListener("input", searchHandler)
}

export async function searchHandler() {
  const searchValue = search.value
  document.title = "Search Page for " + searchValue
  history.pushState(null, null, `/products?name=${searchValue}`)
  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchValue.toLowerCase())
  })
  if (filteredProducts.length === 0) {
    render(`<h1>Products</h1><p>No Products Found</p>`)
  } else {
    const productsHTML = filteredProducts.map(ProductComponent).join("")
    render(`<h1>Products</h1>${productsHTML}`)
    buttonFinderAdd()
  }
}

export async function urlSearchHandler() {
  const searchParams = new URLSearchParams(location.search)
  const searchValue = searchParams.get("search")
  search.value = searchValue
  document.title = "Search Page for " + searchValue
  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchValue.toLowerCase())
  })
  if (filteredProducts.length === 0) {
    render(`<h1>Products</h1><p>No Products Found</p>`)
  } else {
    const productsHTML = filteredProducts.map(ProductComponent).join("")
    render(`<h1>Products</h1>${productsHTML}`)
    buttonFinderAdd()
  }
}
