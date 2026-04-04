import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WrapperComponets from "../componets/WrapperComponets";
import { Spinner } from "flowbite-react";
import DropdownComponent from "../componets/DropdownComponent";
import SearchComponent from "../componets/SearchComponent";
import PaginationComponent from "../componets/PaginationComponent";

export default function CategoryPrtoduct() {
  const { categoryId } = useParams();
  const [category, setcategory] = useState({});
  const [Products, setprtoduct] = useState([]);
  const [loading, setloading] = useState(true);
  const [search, setsearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => {
    setCurrentPage(page);
    getCategoryProduts(
      "https://api.escuelajs.co/api/v1/products/?categoryId=" +
        categoryId +
        "&limit=8" +
        "&offset=" +
        currentPage,
    );
  };

  function prosessearch(event) {
    setsearch(event.target.value);
    getCategoryProduts(
      "https://api.escuelajs.co/api/v1/products/?categoryId=" +
        categoryId +
        "&title=" +
        search,
    );
  }

  function sortProducts(type) {
    const newProducts = [...Products];
    if (type == "Harga Termurah") {
      newProducts.sort((a, b) => a.price - b.price);
    } else if (type == "Harga Termahal") {
      newProducts.sort((a, b) => b.price - a.price);
    } else if (type == "A-Z") {
      newProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (type == "Z-A") {
      newProducts.sort((a, b) => b.title.localeCompare(a.title));
    }
    setprtoduct(newProducts);
  }

  async function getCategory() {
    const url =
      "https://api.escuelajs.co/api/v1/products/?categoryId=" + categoryId;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      setcategory(result);
      setloading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getCategoryProduts(
    url = "https://api.escuelajs.co/api/v1/products/?categoryId=" +
      categoryId +
      "&limit=8" +
      "&offset=" +
      currentPage,
  ) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      setprtoduct(result);
      setloading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getCategory();
    getCategoryProduts();
  }, []);
  return (
    <div>
      {loading == true ? (
        <div className="flex justify-center">
          <Spinner aria-label="Loading" />
          <p className="font-bold mt-2">Memuat Data......</p>
        </div>
      ) : (
        <div>
          <h1 className="font-bold text-2xl p-10">
            Produk kategori {category.name}
          </h1>
          <div className="flex justify-center mb-10 px-10">
            <SearchComponent prosessearch={prosessearch} />
            <DropdownComponent sortProducts={sortProducts} />
          </div>
          <WrapperComponets data={Products} type={"products"} />
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
