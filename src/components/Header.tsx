import { FaShoppingCart, FaHeart } from "react-icons/fa";
import ThemeToggleButton from "./ThemeToggleButton";
import UserDropdown from "./UserDropdown";
import BurgerMenu from "./BurgerMenu";

const Header = () => {
  return (
    <header className="relative flex justify-center pb-28">
      <div className="border-b-light fixed z-20 flex w-full items-center justify-between border-b-[1px] bg-dark px-5 py-10 sm:px-10">
        <div className="flex items-center gap-10">
          <a
            href="/"
            className="text-2xl font-bold text-white hover:text-orange sm:text-3xl"
          >
            KAN-GUROO
          </a>

          <div className="hidden items-center gap-4 text-xl lg:flex">
            <a href="/products" className="text-white hover:text-orange">
              Home
            </a>
            <a href="/about" className="text-white hover:text-orange">
              About
            </a>
            <a href="/contact" className="text-white hover:text-orange">
              Contact
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/favorites"
            className="relative hidden cursor-pointer lg:block"
          >
            <FaHeart size={20} className="text-white hover:text-orange" />
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
                className="text-white hover:text-orange"
              />
            </div>
          </div>
          <ThemeToggleButton />
          <UserDropdown />
          <BurgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
