import Home from "../pages/Home.js";
import About from "../pages/About.js";
import ProductsPage from "../pages/Products.js";
import ProductPage from "../pages/ProductPage.js";
import Cart from "../pages/Cart.js";
const Routes = [
    { path: "/", component: Home },
    { path: "/about", component: About },
    { path: "/products", component: ProductsPage },
    { path: "/product", component: ProductPage },
    { path: "/cart", component: Cart },
];
export default Routes;
