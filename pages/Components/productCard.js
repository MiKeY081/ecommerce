import React, { useContext } from 'react'
import CartContext from './globalVariables/CartContext'
import Link from 'next/link'
import RatingComponent from './rating'
import { Skeleton } from '@mui/material'
import Image from 'next/image'

function Card({children}) {
    const {addProduct} = useContext(CartContext)
    const products = children
  return (
    <div className='CardSection grid grid-cols-4 whitespace-nowrap p-4 gap-8 '>
                    {products && 
                        products.map((product, index)=>(
                            <div key={index} className='flex flex-wrap flex-col shadow-2xl rounded-2xl p-5'>
                              <div className= "Card w-64 flex flex-col align-center overflow-hidden">
                                {(product.image[0] || product.imageLink[0])?<Link href={`/ProductPage/details/${product._id}`} className='w-full flex justify-center' >
                                  {
                                  product.image[0] ?
                                  <img src={product.image[0]} className="w-64 h-80 cursor-pointer rounded-lg mx-auto"/>
                                      :
                                  <img src={product.imageLink[0]} className="w-64 h-80 cursor-pointer rounded-lg mx-auto"/>
                                  }
                                  </Link>: <Link href={`/ProductPage/details/${product._id}`} className='w-full flex justify-center' >
                                    <Skeleton variant="rectangular" width={256} height={320} className="w-64 h-80 cursor-pointer rounded-lg mx-auto grid place-content-center text-center text-2xl" >Image not available</Skeleton></Link>}
                                  <h1>{product.title}</h1>
                                  <div className="">{product.description}</div>
                                  <div className='flex justify-between'>
                                    <span>
                                      {product.discountRate && <del className='text-xs text-gray-800'> NRs {product.price}</del>}
                                      <span className='font-bold' > 
                                        NRs {product.price - product.discountRate*product.price/100}
                                        {product.discountRate && 
                                        <span className='flex flex-nowrap justify-center items-center p-1'>(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 inline-block">
                                                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
                                                </svg>
                                          {product.discountRate}% off)
                                          </span> }
                                        </span>
                                      </span>
                                    <span onClick= {()=>addProduct(product._id)} className='cursor-pointer'>
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                      </svg>
                                    </span>
                                  </div>
                                    <RatingComponent className=""/>
                                </div>
                                </div>))}

                              </div>
  )
}

export default Card