import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function AuthToggleButtons() {
  const location = useLocation();
  const pathname = location.pathname;

  const isLoginPath = pathname === "/login";
  const isRegisterPath = pathname === "/register";

  return (
    <div className="flex">
      <Link
        to="/login"
        className={twMerge(
          "w-1/2 rounded-l p-3 text-2xl",
          isLoginPath && "bg-orange text-white",
          !isLoginPath && "bg-gray-200 text-black",
        )}
      >
        Login
      </Link>
      <Link
        to="/register"
        className={twMerge(
          "w-1/2 rounded-r p-3 text-2xl",
          isRegisterPath && "bg-orange text-white",
          !isRegisterPath && "bg-gray-200 text-black",
        )}
      >
        Register
      </Link>
    </div>
  );
}
