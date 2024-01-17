import Header from "@/pages/Components/header";
import RatingComponent from "@/pages/Components/rating";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { basicbtn } from "@/pages/Products/Products";
import { CartContext } from "@/pages/CartContext";
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

export default function Details() {
  const { addProduct } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    axios
      .get("/api/products?id=" + id)
      .then((response) => setProducts(response.data));
  }, [id]);
  const allImages = [...(products.image || []), ...(products.imageLink || [])];
  return (
    <>
      <Header />
      <div className='flex max-w-screen-lg items-center rounded-lg border shadow-2xl'>
        <div className='h-full w-2/4'>
          {allImages.length > 0 ? (
            <Swiper
              loop={true}
              speed={500}
              cssMode={true}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true, autoplay: true }}
              effect='fade' // or other effects like 'flip', 'cube', etc.
              fadeEffect={{ crossFade: true }}
              onSlideChange={(e) => console.log(e)}
              onSwiper={(swiper) => console.log(swiper)}
              autoplay={{ delay: 5000 }}
            >
              {allImages?.map((images, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={images}
                    className='w-full rounded-3xl h-[500px] cursor-grab'
                    alt={`Image ${index}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Skeleton
              variant='rectangular'
              width={512}
              height='500px'
              className='w-full rounded-3xl h-[500px] cursor-grab mx-auto grid place-content-center text-center text-2xl'
            >
              Image not available
            </Skeleton>
          )}
        </div>
        <div className=' flex flex-col w-2/4 p-10 text-lg gap-4 items-center'>
          <h1 className='inline-flex items-center text-3xl font-semibold'>
            {products?.title}
          </h1>
          <h5 className=' mt-3 text-lg text-gray-600 '>
            {products?.description}
          </h5>
          <div className='mt-4'>
            <span className='flex items-center'>
              {products?.discountRate && (
                <del className=' mr-2 inline-block rounded-md bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900'>
                  {" "}
                  NRs {products?.price}
                </del>
              )}
              <span className=' mr-2 rounded-md bg-gray-100 px-3 py-1 text-lg font-semibold text-gray-900 flex gap-2'>
                NRs{" "}
                {products?.price -
                  (products?.discountRate * products?.price) / 100}
                {products?.discountRate && (
                  <span className=' mr-2 inline-block rounded-md bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900'>
                    ({products?.discountRate}% off)
                  </span>
                )}
              </span>
            </span>
          </div>
          <span
            className='className="mb-2 mr-2 inline-block  px-3 py-1 '
            onClick={() => addProduct(products?._id)}
          >
            <span
              className={`${basicbtn} flex gap-4 hover:bg-green-700 border-green-500`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6 inline'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
              Add to Cart
            </span>
          </span>
          <RatingComponent className='scale-125 ' />
        </div>
      </div>
    </>
  );
}
