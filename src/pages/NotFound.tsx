import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="bg-light flex h-screen flex-col items-center justify-center px-4 transition-colors duration-500 dark:bg-dark">
      <span className="mb-4 select-none text-6xl font-extrabold text-orange drop-shadow-lg sm:text-8xl">
        404
      </span>
      <span className="mb-2 text-center text-2xl font-bold text-gray-800 transition-colors duration-500 sm:text-3xl dark:text-white">
        Page Not Found
      </span>
      <span className="mb-8 text-center text-base text-gray-500 transition-colors duration-500 sm:text-lg dark:text-gray-400">
        The page you are looking for does not exist.
      </span>
      <Link
        to="/"
        className="hover:bg-orangeLight rounded bg-orange px-4 py-2 text-base font-semibold text-white shadow transition sm:px-6 sm:py-3 sm:text-lg"
      >
        Go Home
      </Link>
    </div>
  );
}
