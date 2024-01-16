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
import Card from "../Components/productCard";
import { BounceLoader } from "react-spinners";
import Layout from "../Components/Layout";
import { SearchContext } from "../Search";
import { Swiper, SwiperSlide } from "swiper/react";

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
      product?.description?.toLowerCase().includes(search?.toLowerCase())
  );
  return (
    <Layout>
      {search && <Card>{searchBoxProducts}</Card>}
      {isLoading && (
        <div className='grid place-content-center h-screen w-screen'>
          <BounceLoader color='#36d7b7' speedMultiplier={2} />
        </div>
      )}

      {!search && (
        <div className='min-h-screen w-screen overflow-hidden'>
          <div className='ImageDescription '>
            <div className='RecentSection overflow-hidden h-screen w-screen'>
              <Swiper
                className='w-full h-full bg-black text-white mb-20 ml-0 mt-0'
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
                  <SwiperSlide key={index}>
                    <div className='info w-2/5 z-1 absolute bottom-28 left-12 h-fit'>
                      <h1 className='text-4xl text-white'>{product.title}</h1>
                      <h5 className='text-2xl text-white line-clamp-2 overflow-ellipsis'>
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
                          " pr-12 pl-12 pt-4 pb-4 bg-blue-800 border-blue-800 text-lg block"
                        }
                      >
                        See details
                      </Link>
                    </div>
                    <div className='w-full h-full'>
                      {product.image[0] ? (
                        <img
                          src={product.image[0]}
                          className='w-screen h-screen cursor-grab object-cover'
                          alt={`Product ${index + 1}`}
                        />
                      ) : (
                        <img
                          src={product.imageLink[0]}
                          className='w-screen h-screen cursor-grab'
                          alt={`Product ${index + 1}`}
                        />
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <p className='font-l text-black font-bold text-2xl ml-4'>
                Recently Updated...
              </p>
            </div>
            <div className=''>
              <Card>{products}</Card>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
