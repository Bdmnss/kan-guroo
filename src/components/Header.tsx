import { FaShoppingCart, FaHeart } from "react-icons/fa";
import ThemeToggleButton from "./ThemeToggleButton";

const Header = () => {
  return (
    <header className="relative flex justify-center pb-28">
      <div className="border-b-light fixed z-20 flex w-full items-center justify-between border-b-[1px] bg-dark px-5 py-10 sm:px-10">
        <a
          href="/"
          className="hover:text-orange text-2xl font-bold text-white sm:text-3xl"
        >
          KAN-GUROO
        </a>

        <div className="flex items-center gap-4">
          <a href="/favorites" className="relative cursor-pointer">
            <FaHeart size={20} className="hover:text-orange text-white" />
          </a>
          <div
            className="relative cursor-pointer"
            tabIndex={0}
            role="button"
            aria-label="Open cart"
          >
            <div className="ignore-click-outside relative cursor-pointer">
              <FaShoppingCart
                size={20}
                className="hover:text-orange text-white"
              />
            </div>
          </div>
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
