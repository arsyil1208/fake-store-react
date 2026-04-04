import { ButtonGroup, Card } from "flowbite-react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { Button } from "flowbite-react";

export function CardListHorizontal({
  list,
  increaseQty,
  decreaseQty,
  removeItem,
  deleteAll,
  children,
  checkout = false,
}) {
  return (
    <div className="flex  justify-center w-full ">
      <Card className="w-full max-w-5xl mt-6 mx-4 ">
        <div className="flex items-center justify-between mb-4">
          {/* header */}
          <h5 className="text-xl font-bold text-gray-900 dark:text-white">
            Keranjang ({list.length})
          </h5>

          {checkout && list.length > 0 && (
            <p
              onClick={deleteAll}
              className="text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            >
              Hapus Semua
            </p>
          )}
        </div>
        {/* Body */}
        <div className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {list.map((item) => (
              <li key={item.id} className="py-4">
                <div className="flex items-center gap-4">
                  <div className="shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Qty: {item.qty}
                      </span>
                      <span className="text-xs text-gray-400">×</span>
                      <span className="text-xs text-gray-500">
                        ${item.price}
                      </span>
                    </div>
                  </div>

                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    ${(item.price * item.qty).toFixed(1)}
                  </div>
                </div>
                {checkout && (
                  <div className="flex justify-end">
                    <ButtonGroup outline>
                      <Button
                        className="px-2 py-1"
                        onClick={() => decreaseQty(item.id)}
                      >
                        <FaMinus className="me-2 h-2 w-2" />
                      </Button>
                      <Button disabled>{item.qty}</Button>
                      <Button
                        className="px-2 py-1"
                        onClick={() => increaseQty(item.id)}
                      >
                        <FaPlus className="me-3 h-2 w-2" />
                      </Button>
                    </ButtonGroup>
                    <FaTrash
                      color="red"
                      className="text-xl ms-2 mt-2"
                      onClick={() => removeItem(item.id)}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>

          {list.length === 0 && (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
              Keranjang kosong
            </div>
          )}
          {/* footer */}
          {children}
        </div>
      </Card>
    </div>
  );
}
