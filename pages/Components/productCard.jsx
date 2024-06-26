import React, { useContext } from "react";
import Link from "next/link";
import RatingComponent from "./rating";
import { Skeleton } from "@mui/material";
import { CartContext } from "../CartContext";

function Card({ children }) {
  const { addProduct } = useContext(CartContext);
  const products = children;

  return (
    <div className='CardSection grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-4'>
      {products &&
        products.map((product, index) => (
          <div
            key={index}
            className='Card group bg-white overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-[340px] '
          >
            <Link href={`/ProductPage/details/${product._id}`}>
              <div className='block relative overflow-hidden'>
                {product.image[0] || product.imageLink[0] ? (
                  <img
                    src={product.image[0] || product.imageLink[0]}
                    className='w-full h-[350px] object-cover transform scale-100 group-hover:scale-105 transition-transform'
                    alt={`Product ${index + 1}`}
                  />
                ) : (
                  <Skeleton
                    variant='rectangular'
                    width={256}
                    height={320}
                    className='w-full h-64 grid place-content-center text-center text-2xl'
                  >
                    Image not available
                  </Skeleton>
                )}
              </div>
            </Link>
            <div className='p-4'>
              <h1 className='text-xl font-semibold mb-2'>{product.title}</h1>
              <div className='text-gray-700 line-clamp-2 mb-4'>
                {product.description}
              </div>
              <div className='flex justify-between items-center'>
                <span>
                  {product?.discountRate ? (
                    <del className='text-sm text-gray-800'>
                      NRs {product.price}
                    </del>
                  ) : (
                    ""
                  )}
                  <span className='font-bold text-lg inline-flex flex-start flex-col'>
                    NRs{" "}
                    {product.price -
                      (product.discountRate * product.price) / 100}
                    {product.discountRate && (
                      <span className='flex flex-nowrap text-sm font-light'>
                        ({product.discountRate}% off)
                      </span>
                    )}
                  </span>
                </span>
                <span
                  onClick={() => addProduct(product._id)}
                  className='cursor-pointer'
                >
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
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                    />
                  </svg>
                </span>
              </div>
              <RatingComponent className='mt-2' />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Card;
