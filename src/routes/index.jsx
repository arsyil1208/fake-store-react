import { createHashRouter } from "react-router-dom";
import App from "../App";
import Products from "../pages/Products";
import Templates from "../Tempaltes";
import Profil from "../pages/Profil";
import CategoryPrtoducts from "../pages/CategoryProducts";
import { Login } from "../pages/Login";
import Cart from "../pages/Cart";
import { auth } from "../middleware/auth";
import Checkout from "../pages/Checkout";

export const router = createHashRouter([
  {
    path: "/",
    element: <Templates />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "Products",
        element: <Products />,
      },
      {
        path: "User",
        element: <Profil />,
      },
      {
        path: "products/category/:categoryId",
        element: <CategoryPrtoducts />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "cart",
        element: <Cart />,
        loader: auth,
      },
      {
        path: "checkout",
        element: <Checkout />,
        loader: auth,
      },
    ],
  },
]);
