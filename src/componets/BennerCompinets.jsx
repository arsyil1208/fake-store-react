import { Banner, BannerCollapseButton } from "flowbite-react";
import { HiArrowRight, HiX } from "react-icons/hi";
import { IoIosCart } from "react-icons/io";
import { Link } from "react-router-dom";

export default function BennerComponets() {
  return (
    <Banner className="flex justify-center ">
      <div className="flex w-400 flex-col justify-between border-b border-gray-200 bg-gray-50 p-4 md:flex-row dark:border-gray-600 dark:bg-gray-700 rounded-box">
        <div className="mb-4 md:mb-0 md:mr-4">
          <h2 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
            Mulai Belanja
          </h2>
          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            You can integrate Flowbite with many tools to make your work even
            more efficient and lightning fast based on Tailwind CSS.
          </p>
        </div>
        <div className="flex shrink-0 items-center">
          <a
            href="#"
            className="mr-3 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 hover:text-cyan-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            <Link to="/cart" className="flex">
              <IoIosCart className="mr-2 h-4 w-4" />
              Keranjang
            </Link>
          </a>
          <a
            href="#"
            className="mr-2 inline-flex items-center justify-center rounded-lg bg-cyan-700 px-3 py-2 text-xs font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            <Link to="/Products" className="flex">
              Mulai Belanja
              <HiArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </a>
          <BannerCollapseButton
            color="gray"
            className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
          >
            <HiX className="h-4 w-4" />
          </BannerCollapseButton>
        </div>
      </div>
    </Banner>
  );
}
