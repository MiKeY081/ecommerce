import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Header from '../Components/header';
import { register } from 'swiper/element/bundle';
// register Swiper custom elements4
register();
import 'swiper/css/autoplay';
import { Skeleton } from '@mui/material';
import { basicbtn } from '../Products/Products';
import swal from 'sweetalert';
import Layout from '../Components/Layout';
import Image from 'next/image';
import { CartContext } from '../CartContext';


// register Swiper custom elements4
register();

function Cart() {
  const [products, setProducts] = useState([]);
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);

  useEffect(() => {
    fetchProducts(); // Corrected the function invocation
  }, [cartProducts]);

  function moreOfTheProduct(id) {
    addProduct(id);
  }

  function fetchProducts() {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts })
        .then(res => {
          setProducts(res.data);
        })
        .catch(error => console.error(error));
    }
  }

  function lessOfTheProduct(id) {
    removeProduct(id);
  }
  const totalPrice = products?.reduce((total, product) => {
    return total + (product.discountRate?(cartProducts.filter(productId => productId === product._id).length * (product.price - (product.discountRate * product.price) / 100)):cartProducts.filter(productId => productId === product._id).length * product.price)
  }, 0);

  return cartProducts.length>0 ?(
   
   <Layout>
      <h1 className='flex justify-center text-3xl font-extrabold my-3'>Your Cart</h1>
      <div className='flex '>
      <div className="left-section flex flex-col w-3/4 gap-10 ">
        {products?.map((product) => (
          <div key={product._id} className='flex border shadow-2xl rounded-lg'>
            <Link href={'/ProductPage/details/'+product._id} className ="w-64">
            <swiper-container
               speed={500}
               cssMode={true}
               spaceBetween={50}
               slidesPerView={1}
               navigation
               pagination={{ clickable: true }}
               scrollbar={{ draggable: true, autoplay:true }}
             //   effect={['fade', 'flip']}
             //   fadeEffect={{ crossFade: true }}
             //   flipEffect={{ slideShadows: true, limitRotation: true }} 
               autoplay={{ delay: 500 }}
            >
              {product?.image?.map((images, index) => {
                return (
                  <swiper-slide key={index}>
                    <img src={images} className="w-64 h-80 cursor-pointer rounded-lg mx-auto" />
                  </swiper-slide>
                );
              })}
              {product?.imageLink?.map((image, index) => (
                <swiper-slide key={index}>
                  <img src={image} className="w-64 h-80 cursor-pointer rounded-lg mx-auto" />
                </swiper-slide>
              ))}
            </swiper-container>
           { !product.image[0] && !product.imageLink[0] &&
            <Skeleton variant="rectangular" width={256} height={320} className="w-full h-full rounded-3xl cursor-grab mx-auto text-center text-2xl" >Image not available</Skeleton>}
         </Link>
            <div className='flex flex-col w-3/5 p-3 text-lg gap-4 items-center'>
              <h1 className='inline-flex items-center text-3xl font-semibold'>{product.title}</h1>
              <h5 className="mt-3 text-lg text-gray-600 overflow-ellipsis line-clamp-6">{product.description}</h5>
              <div className='mt-4'>
                <span className='flex items-center'>
                  {product.discountRate && (
                    <del className='mr-2 inline-block rounded-md bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900'>
                      NRs {product.price}
                    </del>
                  )}
                  <span className='mr-2 rounded-md bg-gray-100 px-3 py-1 text-lg font-semibold text-gray-900 flex gap-2'>
                    NRs {product.price - (product.discountRate * product.price) / 100}
                    {product.discountRate && (
                      <span className='mr-2 inline-block rounded-md bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900'>
                        ({product.discountRate}% off)
                      </span>
                    )}
                  </span>
                </span>
              </div>
              </div>
              <div className="quantity flex flex-col gap-4 items-center justify-center">
                <p className='flex justify-center text-lg font-bold'>Quantity</p>
                <div className='flex justify-center items-center gap-8 p-4'>
                <button onClick={() => lessOfTheProduct(product._id)} className='bg-slate-500 px-2 py-1 text-lg rounded-lg text-blue-200 w-10 hover:scale-125 hover:bg-green-600 transition-all delay-500'>-</button>
                <div>{cartProducts.filter(productId => productId === product._id).length}</div>
                <button onClick={() => moreOfTheProduct(product._id)} className='bg-slate-500 px-2 py-1 text-lg rounded-lg text-blue-200 w-10 hover:scale-125 hover:bg-green-600 transition-all delay-500'>+</button>
              </div>
              </div>
              <div className="price flex justify-center items-center p-4 rounede-lg whitespace-nowrap">
                Price: NRs{product.discountRate?(cartProducts.filter(productId => productId === product._id).length * (product.price - (product.discountRate * product.price) / 100)):cartProducts.filter(productId => productId === product._id).length * product.price}
              </div>
            </div>
        ))}
        </div>
        <div className='text-xl flex items-center flex-col w-2/5 gap-20'>
          <p className='font-bold'> Total Price: {totalPrice} </p>
          <button className={basicbtn} onClick={()=>{(swal({
                                                        title: "Payment",
                                                        text: "Payment not available in your region",
                                                        icon: "warning",
                                                        successMode: true,
                                                      }))}}>Continue to Payment</button>

        </div>
        
      </div>
    </Layout>
  )
    :
    <Layout >
      <div className="flex flex-col w-screen h-screen items-center justify-center gap-10 text-3xl font-bold">
      <div>Your Cart is Empty</div>
    <Link href={"/ProductPage/home"} className={basicbtn}>Shop now</Link>
    </div>
    </Layout>
}

export default Cart;
