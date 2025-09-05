import { useState, useEffect, useRef } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuthStore } from "../stores/authStore";

export default function UserDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { hasToken, setHasToken } = useAuthStore();

  useEffect(() => {
    setHasToken(!!localStorage.getItem("fake_token"));
    const onStorage = () => setHasToken(!!localStorage.getItem("fake_token"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [setHasToken]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <FaUser
        size={20}
        className="cursor-pointer text-white hover:text-orange"
        onClick={() => {
          if (!hasToken) {
            window.location.href = "/login";
          } else {
            setIsDropdownOpen((prev) => !prev);
          }
        }}
      />
      {isDropdownOpen && hasToken && (
        <div className="absolute right-0 top-10 w-48 rounded bg-dark text-white shadow-lg">
          <button
            onClick={() => {
              localStorage.removeItem("fake_token");
              setHasToken(false);
              setIsDropdownOpen(false);
              window.location.href = "/login";
            }}
            className="flex w-full items-center p-2 text-xl hover:bg-orange"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
