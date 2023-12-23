import React, { useContext, useEffect } from "react";
import Link from "next/link";
import UserProfile from "./userProfile";
import { CartContext } from "../CartContext";
import { SearchContext } from "../Search";

function Header() {
  const { cartProducts } = useContext(CartContext);
  const { search, setSearch } = useContext(SearchContext);
  return (
    <>
      <div className="flex justify-around items-center sticky top-0 p-2 bg-slate-100 opacity-80 text-black z-10 h-16">
        <Link
          href={"/"}
          className="hover:scale-110 font-bold text-black text-xl hover:text-blue-300 transition-all duration-200"
        >
          E-commmerce
        </Link>
        <label className="relative ">
          <input
            type="text"
            name=""
            id=""
            className="outline-none border-2  opacity-80 p-4 rounded-lg w-80 h-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </label>
        <div>
          <ul className="flex justify-between gap-12 text-gray-900 opacity-100">
            <li className="hover:scale-110 hover:font-bold text-xl hover:text-blue-300 transition-all duration-200 w-20">
              <Link href={"/ProductPage/home"} className=" ">
                Home
              </Link>
            </li>
            <li className="hover:scale-110 hover:font-bold text-xl hover:text-blue-300 transition-all duration-200 w-20">
              <Link href={"/ProductPage/discountProducts"} className="">
                Offers
              </Link>
            </li>
            <li className="w-20 text-xl hovekjr:scale-110 hover:font-bold  hover:text-blue-300 transition-all duration-200">
              <Link href={"/ProductPage/cart"} className="">
                Cart({cartProducts?.length})
              </Link>
            </li>
            <li className="group relative top-1 scale-125 font-bold hover:scale-150 text-xl -right-20 w-12 hover:text-blue-300 transition-all duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <UserProfile />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Header;
