import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardListHorizontal } from "../componets/CardlListHorizontal";
import { CartContext } from "../context/CartContext";
import { Button } from "flowbite-react";

export default function Checkout() {
  const { cart, deleteAll } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const ppn = total * 0.11;
  const hargabayar = total + ppn;

  function handleCheckout() {
    deleteAll();
    
    // Kirim state success ke home
    navigate("/", { 
      state: { 
        success: true,
        message: "Pembayaran berhasil!"
      } 
    });
  }

  return (
    <CardListHorizontal list={cart}>
      <h5 className="text-lg font-bold mb-4">Detail Pembayaran</h5>
      
      <div className="flex justify-between mb-2">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total Harga Produk
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Biaya Aplikasi (11%)
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm text-gray-900 dark:text-white">
            ${total.toFixed(2)}
          </span>
          <span className="text-sm text-gray-900 dark:text-white">
            ${ppn.toFixed(2)}
          </span>
        </div>
      </div>

      {cart.length > 0 && (
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <span className="text-base font-bold text-gray-900 dark:text-white">
              Total Bayar
            </span>
            <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-500">
              ${hargabayar.toFixed(2)}
            </span>
          </div>
          <Button color="blue" className="w-full" onClick={handleCheckout}>
            Bayar Sekarang
          </Button>
        </div>
      )}
    </CardListHorizontal>
  );
}