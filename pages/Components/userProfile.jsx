import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function UserProfile() {
  const { data: session } = useSession();
  return (
    <>
      <div className='bg-white bg-opacity-100 p-4 text-black absolute top-16 right-10 rounded-lg border-blue-500 hover:shadow-md z-50 '>
        <ul className='flex flex-col gap-2 p-2 justify-center'>
          <li className='whitespace-nowrap text-sm cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6 inline-block'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
              />
            </svg>
            <Link href='/Products' className='inline-block'>
              Products management
            </Link>
          </li>
          <li className='whitespace-nowrap text-sm cursor-pointer '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6 inline-block'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z'
              />
            </svg>
            <Link href='/Category/categories'>Categories Management</Link>
          </li>
          {/* <li className='whitespace-nowrap text-sm cursor-pointer '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6 inline-block'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>
            <Link href='/ProductPage/cart' className='inline-block'>
              Cart management
            </Link>
          </li> */}
          <li className='whitespace-nowrap text-sm cursor-pointer '>
            {!session ? (
              <button onClick={() => signIn("google")}>
                <p className='flex flex-nowrap'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                  Login
                </p>
              </button>
            ) : (
              <button
                onClick={() => signOut("google")}
                className='flex items-center justify-center'
              >
                <p className='flex flex-nowrap '>
                  <img
                    src={session.user.image}
                    className='w- h-8 rounded-full'
                  />
                  Logout{" "}
                </p>
              </button>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

export default UserProfile;
