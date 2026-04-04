import { Outlet } from "react-router-dom";
import NavbarComponets from "./componets/NavbarComponets";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

export default function Templates() {
  return (
    <>
      <CartProvider>
        <AuthProvider>
          <NavbarComponets />
          {/* wadah kaya yild di laravel */}
          <Outlet />
        </AuthProvider>
      </CartProvider>
    </>
  );
}
