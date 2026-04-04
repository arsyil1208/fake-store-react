import { datePickerTheme, Navbar } from "flowbite-react";
import { Children, Component, useState } from "react";
import CardComponent from "./CardComponets";
import CardComersComponets from "./CardComersComponets";
import ModalCartCompComponets from "./ModalCartCompComponets";

export default function WrapperComponets({ data, type, children }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  function onCloseModal() {
    setOpenModal(false);
  }
  function handleAddToCart() {
    setOpenModal(true);
    setSelectedItem(item);
  }
  return (
    <div className="w-7xl block mx-auto">
      {children}
      <div className="grid grid-cols-4 gap-4 my-15">
        {data.map((item, index) =>
          type === "CategoryPrtoduct" ? (
            <CardComponent CategoryPrtoduct={item} key={index} />
          ) : (
            <CardComersComponets
              products={item}
              key={index}
              handleAddToCart={handleAddToCart}
            />
          ),
        )}
      </div>
      <ModalCartCompComponets
        openModal={openModal}
        onCloseModal={onCloseModal}
        item={selectedItem}
      />
    </div>
  );
}
