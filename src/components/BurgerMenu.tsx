import { useState } from "react";
import { FaBars } from "react-icons/fa";

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Burger button visible only on mobile/tablet */}
      <button
        className="flex items-center text-white hover:text-orange focus:outline-none lg:hidden"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open navigation menu"
      >
        <FaBars size={24} />
      </button>
      {/* Slide menu */}
      <div
        className={`fixed right-0 top-0 z-40 h-full w-64 transform bg-dark shadow-lg transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"} lg:hidden`}
      >
        <button
          className="absolute right-4 top-4 text-2xl text-white"
          onClick={() => setOpen(false)}
          aria-label="Close navigation menu"
        >
          ×
        </button>
        <nav className="mt-20 flex flex-col gap-6 px-8 text-xl">
          <a
            href="/products"
            className="text-white hover:text-orange"
            onClick={() => setOpen(false)}
          >
            Home
          </a>
          <a
            href="/about"
            className="text-white hover:text-orange"
            onClick={() => setOpen(false)}
          >
            About
          </a>
          <a
            href="/contact"
            className="text-white hover:text-orange"
            onClick={() => setOpen(false)}
          >
            Contact
          </a>
          <a
            href="/favorites"
            className="text-white hover:text-orange"
            onClick={() => setOpen(false)}
          >
            Favorites
          </a>
        </nav>
      </div>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default BurgerMenu;
