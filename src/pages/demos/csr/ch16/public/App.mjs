import Router from "./utils/Router.js"
import { searchListener, urlSearchHandler } from "./utils/search.js"
import themeListener from "./utils/theme.js"
import updateCart from "./utils/cart.js"

themeListener()

searchListener()

updateCart()

let urlParams = new URLSearchParams(location.search)
if (urlParams.has("search")) {
  urlSearchHandler()
} else {
  Router(location.pathname)
}
