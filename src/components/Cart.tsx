import { useCartStore } from "../stores/cartStore";
import { FaTrash } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { useEffect, useState, useRef } from "react";

export default function Cart() {
  const {
    isCartOpen,
    cartItems,
    cartItemsQuantity,
    totalPrice,
    setCartOpen,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartStore();

  const [imgLoaded, setImgLoaded] = useState<{ [id: number]: boolean }>({});
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickedEl = event.target as HTMLElement;

      if (clickedEl.closest(".ignore-click-outside")) return;

      if (
        isCartOpen &&
        cartRef.current &&
        !cartRef.current.contains(event.target as Node)
      ) {
        setCartOpen(false);
      }
    }
    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, setCartOpen, cartRef]);

  return (
    <div
      ref={cartRef}
      className={twMerge(
        "fixed right-[4%] z-10 flex h-[45vh] w-11/12 flex-col gap-6 overflow-y-auto rounded-xl bg-white p-4 sm:p-8 md:h-96 md:w-2/3 lg:w-1/2 lg:p-12 2xl:w-1/3 dark:bg-black",
        isCartOpen && "animate-slide-top-to-bottom mt-40",
        !isCartOpen && "hidden",
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-black dark:text-white">Cart</p>
        <p
          className="dark:hover:text-orangeLight cursor-pointer text-2xl text-[gray] underline hover:text-orange dark:text-gray-400"
          onClick={clearCart}
        >
          Remove all
        </p>
      </div>

      {cartItemsQuantity === 0 ? (
        <div>
          <h2 className="text-3xl text-black dark:text-white">Cart is empty</h2>
        </div>
      ) : (
        <div className="flex flex-col gap-9">
          {cartItems.map((product) => (
            <div key={product.id} className="flex items-center justify-between">
              <div className="relative">
                {!imgLoaded[product.id] && (
                  <div className="dark:bg-charcoal absolute inset-0 z-10 flex items-center justify-center bg-white">
                    <span className="h-8 w-8 animate-spin rounded-full border-2 border-orange border-t-transparent" />
                  </div>
                )}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className={twMerge(
                    "size-14 rounded object-cover transition-opacity duration-300 sm:size-20 lg:size-24",
                    imgLoaded[product.id] && "opacity-100",
                    !imgLoaded[product.id] && "opacity-0",
                  )}
                  width={64}
                  height={64}
                  loading="lazy"
                  onLoad={() =>
                    setImgLoaded((prev) => ({ ...prev, [product.id]: true }))
                  }
                />
              </div>

              <div>
                <p className="text-sm font-bold text-black sm:text-lg dark:text-white">
                  {product.title}
                </p>
                <p className="text-sm font-bold text-[gray] sm:text-base dark:text-gray-400">
                  $ {product.price.toFixed(2)}
                </p>
              </div>

              <div
                className={twMerge(
                  "bg-softGrayBg flex items-center justify-between gap-4 rounded-lg px-2 sm:px-5 sm:py-2 dark:bg-gray-700",
                )}
              >
                <button
                  onClick={() => decreaseQuantity(product.id)}
                  className="dark:hover:text-orangeLight text-2xl font-bold text-[gray] hover:text-orange dark:text-gray-400"
                >
                  -
                </button>
                <span className="text-lg font-bold text-black dark:text-white">
                  {product.quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(product.id)}
                  className="dark:hover:text-orangeLight text-2xl font-bold text-[gray] hover:text-orange dark:text-gray-400"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(product.id)}
                className="ml-2 text-xl text-red-500 transition hover:text-orange sm:text-2xl"
                title="Remove"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-2xl font-medium text-[gray] dark:text-gray-400">
          Total
        </p>
        <p className="text-2xl font-bold text-black dark:text-white">
          $ {totalPrice.toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => {
          setCartOpen(false);
          window.location.href = "/checkout";
        }}
        disabled={cartItemsQuantity === 0}
        className="hover:bg-orangeLight w-full cursor-pointer rounded-lg bg-orange py-3 text-xl text-white disabled:opacity-50"
      >
        Checkout
      </button>
    </div>
  );
}
