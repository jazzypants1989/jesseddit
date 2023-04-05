import Nope from "../pages/Nope.js"
import ProductPage from "../pages/ProductPage.js"
import Routes from "./Routes.js"
import { searchHandler, search } from "../features/search.js"

export default function Router(potentialRoute) {
  const dynamicRoute = "product"
  const searchRoute = "products"
  const searchParams = new URLSearchParams(location.search)
  if (
    potentialRoute.split("/")[1] === dynamicRoute &&
    potentialRoute.split("/")[2]
  ) {
    const id = potentialRoute.split("/")[2]
    console.log("dynamic route", potentialRoute)
    return ProductPage(id)
  } else if (
    potentialRoute.split("/")[1] === searchRoute &&
    searchParams.has("name")
  ) {
    const searchValue = searchParams.get("name")
    search.value = searchValue
    console.log("search route", searchValue)
    return searchHandler()
  } else {
    console.log("static route", potentialRoute)
    const route = Routes.find((route) => route.path === potentialRoute)
    route ? route.component() : Nope()
  }
}

window.addEventListener("popstate", () => {
  Router(location.pathname)
})
