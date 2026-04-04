import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Products from "../pages/Products";
import Templates from "../Tempaltes";
import Profil from "../pages/Profil";
import CategoryPrtoducts from "../pages/CategoryProducts";
import { Login } from "../pages/Login";
import Cart from "../pages/Cart";
import { auth } from "../middleware/auth";
import Checkout from "../pages/checkout";

export const router = createBrowserRouter([
  {
    // membukus outlet
    path: "/",
    element: <Templates />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/Products",
        element: <Products />,
      },
      {
        path: "/User",
        element: <Profil />,
      },
      {
        path: "/products/category/:categoryId",
        element: <CategoryPrtoducts />,
      },
      { path: "/login", element: <Login /> },
    ],
  },
  {
    path: "/",
    element: <Templates />,
    loader: auth, //middleware
    children: [
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout />}
    ],
  },
]);
