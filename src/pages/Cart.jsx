import { useContext, useState } from "react";
import { CardListHorizontal } from "../componets/CardlListHorizontal";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

export default function Cart({}) {
  const { cart, increaseQty, decreaseQty, removeItem, deleteAll } =
    useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(false);

  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCheckout(true)

    navigate("/checkout");
  };

     const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CardListHorizontal
      list={cart} 
      increaseQty={increaseQty}
      decreaseQty={decreaseQty}
      removeItem={removeItem}
      deleteAll={deleteAll}
      checkout={handleCheckout}
    >
      {cart.length > 0 && (
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <span className="text-base font-bold text-gray-900 dark:text-white">
              Total
            </span>
            <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-500">
              ${total.toFixed(2)}
            </span>
          </div>
          <Button color="blue" className="w-full" onClick={handleCheckout}>
            Lanjutkan ke Pembayaran
          </Button>
        </div>
      )}
    </CardListHorizontal>
  );  
}
