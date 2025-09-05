import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";

const PaymentConfirmation: React.FC = () => {
  const { cartItems, totalPrice, clearCart, setIsPaid } = useCartStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsPaid(false);
        clearCart();
        navigate("/");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsPaid, clearCart, navigate]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed top-0 z-10 h-full w-full bg-white/50 dark:bg-black/50">
      <div
        ref={modalRef}
        className="fixed left-1/2 top-48 z-10 min-h-[73vh] w-11/12 -translate-x-1/2 transform overflow-y-auto rounded-xl bg-white p-6 md:min-h-[57vh] md:w-3/4 lg:w-2/5 dark:bg-[#101010]"
      >
        <button
          aria-label="Close"
          className="absolute right-4 top-4 z-20 text-4xl text-gray-400 transition-colors hover:text-orange"
          onClick={() => {
            setIsPaid(false);
            clearCart();
            navigate("/");
          }}
        >
          &times;
        </button>
        <svg
          width="64"
          height="64"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-10"
        >
          <g fill="none">
            <circle fill="#D87D4A" cx="32" cy="32" r="32" />
            <path stroke="#FFF" d="m20.754 33.333 6.751 6.751 15.804-15.803" />
          </g>
        </svg>
        <h2 className="mb-6 text-3xl font-bold leading-10 text-black md:text-5xl md:leading-[3.6rem] dark:text-white">
          THANK YOU FOR YOUR ORDER
        </h2>
        <div className="bg-light flex flex-col overflow-hidden rounded-xl md:flex-row md:justify-between">
          <div className="p-4 md:w-3/5">
            {cartItems.map(
              (product, index) =>
                index === 0 && (
                  <div key={product.id} className="mb-5 flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <img
                          src={product.thumbnail}
                          alt="product image"
                          className="size-16"
                        />
                        <div className="flex flex-col items-center">
                          <p className="text-xl font-bold text-black">
                            {product.title}
                          </p>
                          <p className="self-start text-[1.4rem] font-bold text-[gray]">
                            $ {product.price}
                          </p>
                        </div>
                      </div>
                      <p className="text-[1.5rem] font-bold text-[gray]">
                        x{product.quantity}
                      </p>
                    </div>
                  </div>
                ),
            )}
            {cartItems.length > 1 && (
              <div className="flex items-center justify-center border-t-[1px] border-t-[gray] pt-5 text-[1.2rem] font-bold text-[gray]">
                and {cartItems.length - 1} other item(s)
              </div>
            )}
          </div>

          <div className="bg-black p-8 md:flex md:w-2/5 md:flex-col md:justify-center">
            <p className="text-[1.5rem] font-medium text-[gray]">GRAND TOTAL</p>
            <p className="text-[1.8rem] font-bold text-white">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
        <Link to="/">
          <button
            onClick={() => {
              setIsPaid(false);
              clearCart();
            }}
            className="mt-10 w-full bg-orange p-6 text-xl font-bold text-white"
          >
            BACK TO HOME
          </button>
        </Link>
      </div>
    </div>,
    document.body,
  );
};

export default PaymentConfirmation;
