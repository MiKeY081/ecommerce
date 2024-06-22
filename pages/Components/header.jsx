// components/Header.js

import React, { useContext, useState } from "react";
import Link from "next/link";
import UserProfile from "./userProfile";
import { CartContext } from "../CartContext";
import { SearchContext } from "../Search";
import Menu from "./Menu";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartProducts } = useContext(CartContext);
  const { search, setSearch } = useContext(SearchContext);

  const toggleUserMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className='flex justify-around items-center sticky top-0 p-2 bg-slate-900 opacity-80 text-white z-10 lg:h-16 h-12 w-screen overflow-hidden'>
        <Link href={"/"}>
          <p className='headerLink font-bold lg:text-2xl text-md'>E-commerce</p>
        </Link>
        <label className='relative'>
          <input
            type='text'
            className='outline-none border-2 bg-opacity-80 p-4 rounded-lg lg:w-80 h-8 lg:12 text-black w-40 md:w-64'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search'
          />
        </label>
        <div className='hidden lg:flex'>
          <ul className='flex justify-between gap-12 text-white bg-opacity-80'>
            <li className='headerLink font-semibold text-lg bottomLine'>
              <Link href={"/ProductPage/home"}>
                <p>Home</p>
              </Link>
            </li>
            <li className='headerLink font-semibold text-lg bottomLine'>
              <Link href={"/ProductPage/discountProducts"}>
                <p>Offers</p>
              </Link>
            </li>
            <li className='headerLink font-semibold text-lg bottomLine'>
              <Link href={"/ProductPage/cart"}>
                <p>Cart({cartProducts?.length})</p>
              </Link>
            </li>
            <li
              className='relative headerLink font-semibold text-lg -right-8 transition-all duration-200'
              onClick={toggleUserMenu}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-8 h-8'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
            </li>
          </ul>
        </div>
        <div className='lg:hidden'>
          <button
            onClick={toggleMenu}
            className='text-white text-2xl focus:outline-none'
          >
            &#9776;
          </button>
          <Menu isOpen={isMenuOpen} onClose={closeMenu} />
        </div>
      </div>
      {isOpen && <UserProfile />}
    </>
  );
}

export default Header;
