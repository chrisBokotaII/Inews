import { useEffect, useState } from "react";
import { Source } from "../lib/interfaces";
import { ApiRequest } from "../scripts/axios";

const Footer = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const currentPath = window.location.pathname;

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

  return (
    <footer className="w-full bg-black text-white py-3 min-h-fit">
      <div className="flex flex-col gap-7 md:flex-row justify-between items-start md:items-center px-4 mb-8">
        <div className="flex flex-col w-full border-0  gap-5 md:w-1/2 mb-8 md:mb-0 md:border-r-2">
          <h1 className="text-xl font-sevillana font-bold text-center">
            Explore
          </h1>
          <ul className=" grid grid-cols-4  font-sevillana md:grid-cols-4 py-5 gap-5">
            <li>
              <a
                href="/"
                className={
                  currentPath === "/"
                    ? "underline text-blue-600"
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
        </div>
        <div className="flex flex-col  w-full justify-center  gap-4 md:w-1/2">
          <h1 className="text-3xl font-sevillana text-center">
            Join our newsletter
          </h1>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-black p-2 border font-sevillana border-gray-300 rounded-3xl w-full md:w-2/3 m-auto"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 p-2 w-1/2  m-auto text-white rounded-3xl font-sevillana  text-center"
            >
              Subscribe
            </button>
            <p className="text-gray-500 font-sevillana text-center">
              By subscribing, you agree to our Privacy Policy
            </p>
          </form>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-sevillana font-bold text-blue-600">
          Inews
        </h1>
        <p className="text-gray-500 font-sevillana">
          Copyright © 2023 Inews. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
