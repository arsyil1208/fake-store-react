import WrapperComponets from "../componets/WrapperComponets";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import SearchComponent from "../componets/SearchComponent";
import DropdownComponent from "../componets/DropdownComponent";
import PaginationComponent from "../componets/PaginationComponent";

export default function Products() {
  const [products, setPrtoduct] = useState([]);
  const [loading, setloading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => {
    setCurrentPage(page);

    if (search === "") {
      getDataProducts(
        `https://api.escuelajs.co/api/v1/products/?limit=8&offset=${page}`,
      );
    } else {
      getDataProducts(
        `https://api.escuelajs.co/api/v1/products/?title=${search}`,
      );
    }
  };

  function prosessearch(event) {
    const value = event.target.value;
    setSearch(value);
    setCurrentPage(1);

    if (value === "") {
      getDataProducts(
        `https://api.escuelajs.co/api/v1/products/?limit=8&offset=0`,
      );
    } else {
      getDataProducts(
        `https://api.escuelajs.co/api/v1/products/?title=${value}`,
      );
    }
  }

  function sortProducts(type) {
    const newProducts = [...products];
    if (type == "Harga Termurah") {
      newProducts.sort((a, b) => a.price - b.price);
    } else if (type == "Harga Termahal") {
      newProducts.sort((a, b) => b.price - a.price);
    } else if (type == "A-Z") {
      newProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (type == "Z-A") {
      newProducts.sort((a, b) => b.title.localeCompare(a.title));
    }
    setPrtoduct(newProducts);
  }

  async function getDataProducts(
    url = `https://api.escuelajs.co/api/v1/products/?limit=8&offset=&${currentPage}`,
  ) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      // memanggil data pertama kali
      const result = await response.json();
      setPrtoduct(result);
      setloading(false);
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getDataProducts();
  }, []);
  return (
    <div>
      {loading == true ? (
        <div className="flex justify-center">
          <Spinner aria-label="Loading" />
          <p className="font-bold mt-2">Memuat Data......</p>
        </div>
      ) : (
        <div className="flex flex-col justify-between ">
          <h1 className="text-4xl font-bold mt-5 ml-10">Daftar Produts</h1>
          <div className="flex justify-center mt-2">
            <SearchComponent prosessearch={prosessearch} />
            <DropdownComponent sortProducts={sortProducts} />
          </div>
          <WrapperComponets data={products} type={"products"} />
          <div className="blockmx-auto my-15 ">
            <PaginationComponent
              onPageChange={onPageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
