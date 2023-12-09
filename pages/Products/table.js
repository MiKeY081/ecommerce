import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Products, { basicbtn } from '../Products';
import { useRouter } from 'next/router';
import Link from 'next/link';
import deleteProduct from './delete/[...id]';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Table() {
  const [products, setProducts] = useState([]);
  const {data:session} = useSession()
  const user = session?.user.name;
  useEffect(()=>{
    axios.get('/api/products').then(response=>setProducts(response.data))
  },[]
)
  const router = useRouter();
  return (
    <div>
      <h1 className='text-bold text-center text-3xl mb-4'>All Products</h1>
    {products.length > 0 && (
      <div className="w-full overflow-x-auto  shadow-lg rounded-lg p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className='p-4 rounded-lg text-left text-xs font-medium text-gray-500  bg-gray-100 uppercase'>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Images</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Modify</th>
              <th></th>
            </tr>
            
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">{product.title}</td>
                <td className="px-6 py-4 whitespace-nowrap flex flex-row flex-1 w-96 overflow-x-scroll  " >
                  {product.image.map((images,index)=>(<Image width={256} height ={320} alt="No image found" key={index} src ={images}  className='mr-1'/>))}
                  {product.imageLink.map((imageLinks, index)=>(<Image width={256} height ={320} alt="No image found" key ={index} src ={imageLinks} className='mr-1'/>))}</td>
                <td className="px-6 py-4 ">{product.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>

                {
                  user==product.userName?<td className='flex items-center justify-center gap-2 w-full h-full'>
                  <Link href={"/Products/edit/" + product._id} 
                        className={`${basicbtn} block`}>Edit
                  </Link>
                  <Link href={"/Products/delete/" + product._id}
                       className={`${basicbtn} block`}
                       onClick={()=>{DeleteProduct(product)}}>Delete
                  </Link>
                </td>
                :
                <p>Modification denied</p>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>  
    )}
