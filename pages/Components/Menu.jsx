// components/Menu.js

import Link from "next/link";
import { useState } from "react";
import UserProfile from "./userProfile"; // Ensure the correct import path

const Menu = ({ isOpen, onClose }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div
      className={`fixed inset-0 bg-slate-900 bg-opacity-80 z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className='flex justify-end p-4'>
        <button
          onClick={onClose}
          className='text-white text-2xl focus:outline-none'
        >
          &times;
        </button>
      </div>
      <ul className='flex flex-col items-center text-white'>
        <li className='mb-4'>
          <Link href='/'>
            <button onClick={onClose} className='headerLink bottomLine'>
              Home
            </button>
          </Link>
        </li>
        <li className='mb-4'>
          <Link href='/ProductPage/discountProducts'>
            <button onClick={onClose} className='headerLink bottomLine'>
              Offers
            </button>
          </Link>
        </li>
        <li className='mb-4'>
          <Link href='/ProductPage/cart'>
            <button onClick={onClose} className='headerLink bottomLine'>
              Cart
            </button>
          </Link>
        </li>
        <li className='mb-4'>
          <div
            className='relative headerLink font-semibold text-lg transition-all duration-200'
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
          </div>
        </li>
      </ul>
      {isUserMenuOpen && <UserProfile />}
    </div>
  );
};

export default Menu;
