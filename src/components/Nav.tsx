import { useEffect, useState } from "react";
import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";
import { ApiRequest } from "../scripts/axios";
import { Source } from "../lib/interfaces";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sources, setSources] = useState<Source[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getSources = async () => {
      try {
        const fromCache = localStorage.getItem("Sources");
        if (fromCache) {
          setSources(JSON.parse(fromCache).sources.slice(0, 20));
        } else {
          const res = await ApiRequest.getSoureces();
          setSources(res.sources.slice(0, 20));
          localStorage.setItem("Sources", JSON.stringify(res));
        }
      } catch (error) {
        console.error("Error fetching sources:", error);
      }
    };

    getSources();
  }, []);

  const toggleMenu = () => setShow(!show);
  const currentPath = window.location.pathname;

  return (
    <header className="flex flex-col gap-5 justify-center items-center md:py-5 bg-white shadow-md w-full">
      <div className="flex justify-between items-center w-full max-w-6xl px-4 md:block">
        <h1 className="text-5xl md:text-center font-sevillana font-bold text-blue-600">
          Inews
        </h1>
        <button
          type="button"
          title="Menu"
          aria-label="Menu"
          onClick={toggleMenu}
          className="md:hidden text-3xl"
        >
          {show ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <nav className={`w-full ${show ? "block" : "hidden"} md:block`}>
        <ul className="flex flex-col min-h-screen *:text-xl md:min-h-fit md:flex-row md:justify-center items-center gap-5 px-6 text-sm bg-white shadow-md md:shadow-none">
          <li>
            <a
              href="/"
              className={
                currentPath === "/"
                  ? "underline text-blue-800"
                  : "hover:underline"
              }
            >
              Home
            </a>
          </li>
          {["Technology", "Sports", "Entertainment", "Health"].map(
            (category) => (
              <li key={category}>
                <a
                  href={`/categories/${category.toLowerCase()}`}
                  className={
                    currentPath === `/categories/${category.toLowerCase()}`
                      ? "underline text-blue-600"
                      : "hover:underline"
                  }
                >
                  {category}
                </a>
              </li>
            )
          )}
          <li
            className="relative group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <a
              href="#"
              className={
                currentPath === "/sources"
                  ? "underline text-blue-600"
                  : "flex items-center gap-2 hover:underline"
              }
            >
              All Sources
              <FaAngleDown />
            </a>
            <ul
              className={`absolute top-full left-0 z-10 mt-2 w-96 bg-white shadow-lg rounded-lg p-4 grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 transition-all duration-300 ${
                isOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              {sources.map((source) => (
                <li
                  key={source.id}
                  className={
                    currentPath === `/sources/${source.id}`
                      ? "underline text-blue-600"
                      : "hover:underline"
                  }
                >
                  <a href={`/sources/${source.id}`}>{source.name}</a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
