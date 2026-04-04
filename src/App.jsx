import BennerComponets from "./componets/BennerCompinets";
import WrapperComponets from "./componets/WrapperComponets";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Spinner, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { FaCheckCircle } from "react-icons/fa";

export default function App() {
  const [CategoryPrtoduct, setCategoryPrtoduct] = useState([]);
  const [products, setPrtoduct] = useState([]);
  const [loading, setloading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  async function getDataCategories() {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/categories");
      const result = await response.json();
      setCategoryPrtoduct(result.slice(0, 4));
    } catch (error) {
      console.error(error);
    }
  }

  async function getDataProducts() {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      const result = await response.json();
      setPrtoduct(result.slice(0, 5));
      setloading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
        if (location.state?.success) {
      setShowSuccessModal(true);
      navigate("/", { replace: true, state: {} });
    }
    getDataCategories();
    getDataProducts();
  }, [location, navigate]);

  return (
    <>
      {/* Modal Success Checkout */}
      <Modal
        show={showSuccessModal}
        size="md"
        onClose={() => setShowSuccessModal(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <FaCheckCircle className="mx-auto mb-4 h-14 w-14 text-green-500" />
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Pembayaran Berhasil! 🎉
            </h3>
            <p className="mb-5 text-gray-500">
              Terima kasih telah berbelanja
            </p>
            <Button color="blue" className="items-center" onClick={() => setShowSuccessModal(false)}>
              OK
            </Button>
          </div>
        </ModalBody>
      </Modal>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner aria-label="Loading" size="xl" />
          <p className="font-bold ml-2">Memuat Data...</p>
        </div>
      ) : (
        <div>
          <BennerComponets />
          <WrapperComponets data={CategoryPrtoduct} type={"CategoryPrtoduct"} />
          <WrapperComponets data={products} type={"products"}>
            <div className="flex justify-between mb-10">
              <h1 className="text-2xl font-bold">Daftar Produk Populer</h1>
              <Link to="/Products">
                <Button className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white">
                  Selengkapnya
                </Button>
              </Link>
            </div>
          </WrapperComponets>
        </div>
      )}
    </>
  );
}