import Router from "./components/Router.js"
import { searchListener, urlSearchHandler } from "./features/search.js"
import themeListener from "./features/theme.js"
import updateCart from "./features/cart.js"

themeListener()

searchListener()

updateCart()

let urlParams = new URLSearchParams(location.search)
if (urlParams.has("search")) {
  urlSearchHandler()
} else {
  Router(location.pathname)
}
