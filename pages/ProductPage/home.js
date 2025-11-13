import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

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

import { basicbtn } from "../Products/Products";
import { BounceLoader } from "react-spinners";
import Layout from "../Components/Layout";
import { SearchContext } from "../Search";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../Components/productCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { search } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      axios.get("/api/products").then((response) => setProducts(response.data));
    } catch (error) {
      console.log(error.Message);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const formatDate = (dateString) => {
    // Usiconst formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const searchBoxProducts = products?.filter(
    (product) =>
      product?.title?.toLowerCase().includes(search?.toLowerCase()) ||
      product?.description?.toLowerCase().includes(search?.toLowerCase()) ||
      product?.slug?.toLowerCase().includes(search?.toLowerCase())
  );
  return (
    <Layout>
      {search && <Card>{searchBoxProducts}</Card>}
      {isLoading && (
        <div className='grid place-content-center h-screen w-screen overflow-hidden'>
          <BounceLoader color='#36d7b7' speedMultiplier={2} />
        </div>
      )}

      {!search && products && (
        <div className='min-h-screen min-w-screen overflow-hidden sm:w-full '>
          {products && (
            <div className='RecentSection overflow-hidden h-screen w-screen lg:px-28 -z-10 '>
              <Swiper
                className='w-full h-full text-white mb-20 '
                modules={[Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true, autoplay: true }}
                effect='fade'
                autoplay={{ delay: 3000 }}
                loop={true}
              >
                {products.map((product, index) => (
                 product.image[0] && <SwiperSlide key={index}>
                    <div className='info w-2/5 absolute bottom-28 left-12 h-fit'>
                      <h1 className='text-4xl text-white'>{product.title}</h1>
                      <h5 className='text-xl text-white line-clamp-2 overflow-ellipsis'>
                        {product.description}
                      </h5>
                      <span className='block text-white'>
                        {formatDate(
                          product.updatedAt
                            ? product.updatedAt
                            : product?.createdAt
                        )}
                      </span>
                      <Link
                        href={"/ProductPage/details/" + product._id}
                        className={
                          basicbtn +
                          " lg:px-12 lg:py-4 px-6 py-3 bg-blue-800 border-blue-800 text-lg block"
                        }
                      >
                        See details
                      </Link>
                    </div>
                    <div className='w-full h-full'>
                      {product.image[0] ? (
                        <div
                          className='w-full h-full cursor-grab object-contain overflow-hidden last:'
                          style={{
                            backgroundImage: ` url(${product.image[0]})`,
                            backgroundSize: "100% 100%",
                          }}
                          alt={`Product ${index + 1}`}
                        />
                      ) : (
                        <div
                          className='w-full h-full cursor-grab object-contain overflow-hidden'
                          style={{
                            backgroundImage: ` url(${product.imageLink[0]})`,
                            backgroundSize: "100% 100%",
                          }}
                          alt={`Product ${index + 1}`}
                        />
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          <div className='lg:px-8 md:px-8 py-4'>
            <p className='font-l text-black font-bold text-2xl ml-8'>
              Recently Updated...
            </p>
            <Card>{products}</Card>
          </div>
        </div>
      )}
    </Layout>
  );
}
