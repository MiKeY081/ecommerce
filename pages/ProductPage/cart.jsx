import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Skeleton } from "@mui/material";
import { basicbtn } from "../Products/Products";
import swal from "sweetalert";
import Layout from "../Components/Layout";
import { CartContext } from "../CartContext";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

function Cart() {
  const [products, setProducts] = useState([]);
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (cartProducts.length > 0) {
          const { data } = await axios.post("/api/cart", { ids: cartProducts });
          setProducts(data.cartProducts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [cartProducts]);

  function moreOfTheProduct(id) {
    addProduct(id);
  }

  function lessOfTheProduct(id) {
    removeProduct(id);
  }
  const totalPrice = products?.reduce((total, product) => {
    return (
      total +
      (product.discountRate
        ? cartProducts.filter((productId) => productId === product._id).length *
          (product.price - (product.discountRate * product.price) / 100)
        : cartProducts.filter((productId) => productId === product._id).length *
          product.price)
    );
  }, 0);

  return cartProducts.length > 0 ? (
    <Layout>
      <h1 className='flex justify-center text-3xl font-extrabold my-8'>
        Your Cart
      </h1>
      <div className='flex flex-col lg:flex-row'>
        <div className='left-section flex flex-col lg:w-3/4 screen gap-10 '>
          {products?.map((product) => (
            <div
              key={product._id}
              className='flex flex-col lg:flex-row border hover:shadow-2xl rounded-lg'
            >
              <Link
                href={"/ProductPage/details/" + product._id}
                className='lg:w-64 w-screen'
              >
                <Swiper
                  className='lg:w-64 lg:h-80 w-screen sm:h-96 md:[400px]'
                  modules={[
                    Navigation,
                    Pagination,
                    Scrollbar,
                    A11y,
                    Autoplay,
                    EffectFade,
                  ]}
                  spaceBetween={50}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  effect='fade'
                  onSlideChange={(e) => console.log(e)}
                  onSwiper={(swiper) => console.log(swiper)}
                  autoplay={{ delay: 5000 }}
                  loop={true}
                >
                  {product?.image?.map((images, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={images}
                        className='w-full h-full cursor-pointer rounded-lg mx-auto object-cover'
                        alt={`Product Image ${index}`}
                      />
                    </SwiperSlide>
                  ))}
                  {product?.imageLink?.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        className='w-64 h-80 cursor-pointer rounded-lg mx-auto'
                        alt={`Product Image Link ${index}`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                {!product.image[0] && !product.imageLink[0] && (
                  <Skeleton
                    variant='rectangular'
                    width={256}
                    height={320}
                    className='w-full h-full rounded-3xl cursor-grab mx-auto text-center text-2xl'
                  >
                    Image not available
                  </Skeleton>
                )}
              </Link>
              <div className='flex flex-col w-3/5 p-3 text-lg gap-4 justify-between'>
                <h1 className='inline-flex text-center text-3xl font-semibold capitalize'>
                  {product.title}
                </h1>
                <div className='mt-4'>
                  <span className='flex justify-between'>
                    {product.discountRate && (
                      <del className='mr-2 inline-block rounded-md bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900'>
                        NRs {product.price}
                      </del>
                    )}
                    <span className='mr-2 rounded-md bg-gray-100 px-3 py-1 text-lg font-semibold text-gray-900 flex gap-2'>
                      NRs{" "}
                      {product.price -
                        (product.discountRate * product.price) / 100}
                      {product.discountRate && (
                        <span className='mr-2 inline-block rounded-md bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900'>
                          ({product.discountRate}% off)
                        </span>
                      )}
                    </span>
                  </span>
                </div>
              </div>
              <div className='quantity flex flex-col gap-4 lg:items-center lg:justify-center justify-start items-start'>
                <p className='flex justify-center text-lg font-bold ml-4 first:lg:ml-0'>
                  Quantity
                </p>
                <div className='flex justify-center items-center gap-8 p-4'>
                  <button
                    onClick={() => lessOfTheProduct(product._id)}
                    className='bg-blue-700 px-4 py-2 text-lg rounded-lg text-white hover:scale-105 hover:bg-blue-800 transition-all delay-200'
                  >
                    -
                  </button>
                  <div>
                    {
                      cartProducts.filter(
                        (productId) => productId === product._id
                      ).length
                    }
                  </div>
                  <button
                    onClick={() => moreOfTheProduct(product._id)}
                    className='bg-blue-700 px-4 py-2 text-lg rounded-lg text-white hover:scale-105 hover:bg-blue-800 transition-all delay-200'
                  >
                    +
                  </button>
                </div>
              </div>
              <div className='price flex flex-col lg:flex-row lg:justify-center lg:items-center justify-start items-start p-4 rounede-lg whitespace-nowrap'>
                Price: NRs
                {product.discountRate
                  ? cartProducts.filter(
                      (productId) => productId === product._id
                    ).length *
                    (product.price -
                      (product.discountRate * product.price) / 100)
                  : cartProducts.filter(
                      (productId) => productId === product._id
                    ).length * product.price}
              </div>
            </div>
          ))}
        </div>
        <div className='text-xl flex  items-center flex-col w-2/5 gap-20'>
          <p className='font-bold'> Total Price: {totalPrice} </p>
          <button
            className={basicbtn}
            onClick={() => {
              swal({
                title: "Payment",
                text: "Payment not available in your region",
                icon: "warning",
                successMode: true,
              });
            }}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </Layout>
  ) : (
    <Layout>
      <div className='flex flex-col w-screen h-screen items-center justify-center gap-10 text-3xl font-bold'>
        <div>Your Cart is Empty</div>
        <Link href={"/ProductPage/home"} className={basicbtn}>
          Shop now
        </Link>
      </div>
    </Layout>
  );
}

export default Cart;
