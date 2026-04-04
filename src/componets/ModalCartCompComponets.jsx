import {
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "flowbite-react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ModalCartCompComponets({
  openModal,
  onCloseModal,
  products,
}) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useContext(CartContext);
  const { isLogin } = useAuth();

  function updateQty(type) {
    if (type === "-" && qty === 1) return;
    if (type === "-") setQty(qty - 1);
    if (type === "+") setQty(qty + 1);
  }

  const navigate = useNavigate();
  function handleAddToCart() {
    if (!isLogin) {
      navigate("/login");
    }
    addToCart(products, qty);
    setQty(1);
    onCloseModal();
  }

  if (!products) return null;

  return (
    <Modal dismissible show={openModal} onClose={onCloseModal}>
      <ModalHeader>{products.title}</ModalHeader>
      <ModalBody>
        <div className="flex items-center space-x-5">
          <img
            src={products.images?.[0]}
            alt={products.title}
            width="100"
            height="100"
            className="rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {products.title}
            </p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">
              {products.description}
            </p>
          </div>
          <span className="text-base font-semibold text-gray-900 dark:text-white">
            ${products.price}
          </span>
        </div>
        <div className="flex justify-end mt-4">
          <ButtonGroup>
            <Button color="gray" onClick={() => updateQty("-")}>
              <FaMinus className="h-4 w-4" />
            </Button>
            <Button color="gray" disabled>
              
              {qty}
            </Button>
            <Button color="gray" onClick={() => updateQty("+")}>
              <FaPlus className="h-4 w-4" />
            </Button>
          </ButtonGroup>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="gray" onClick={onCloseModal}>
          Batal
        </Button>
        <Button color="blue" onClick={handleAddToCart}>
          Keranjang ({qty})
        </Button>
      </ModalFooter>
    </Modal>
  );
}
