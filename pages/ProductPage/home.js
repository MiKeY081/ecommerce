"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';


// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements4
register();
// Import Swiper styles
import 'swiper/css/autoplay';
import { basicbtn } from '../Products';
import Header from '../Components/header';
import SearchContext from '../Components/globalVariables/Search';
import Card from '../Components/productCard';
import { BounceLoader } from 'react-spinners';
import Layout from '../Components/Layout';
import Image from 'next/image';



export default function Home() {
const [products, setProducts] = useState([]);
const {search} = useContext(SearchContext)
const [isLoading, setIsLoading] = useState(true)

useEffect(()=>{
  try {
  axios.get('/api/products').then(response=>setProducts(response.data))
  } catch (error) {
    console.log(error.Message)
  }finally{
    setIsLoading(false)
  }
},[])
const formatDate = (dateString) => {
  // Usiconst formatDate = (dateString) => {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}


const searchBoxProducts = products?.filter(product=>(product?.title?.toLowerCase().includes(search?.toLowerCase()) || product?.description?.toLowerCase().includes(search?.toLowerCase())))
console.log(products)
return (
        <Layout>
              {
                search && 
                  <Card children= {searchBoxProducts}/>
              }
              { isLoading &&<div className='grid place-content-center h-screen w-screen'>
                              <BounceLoader color="#36d7b7" speedMultiplier={2}/>
                            </div>
              }

           {
             !search &&
              <div className=''>
                  <div className='ImageDescription '>
                      <div className='RecentSection'>  
                      <swiper-container loop={true}
                                              speed={500}
                                              cssMode={true}
                                              spaceBetween={50}
                                              slidesPerView={1}
                                              navigation
                                              pagination={{ clickable: true }}
                                              scrollbar={{ draggable: true, autoplay:true }}
                                            //   effect={['fade', 'flip']}
                                            //   fadeEffecjt={{ crossFade: true }}
                                            //   flipEffect={{ slideShadows: true, limitRotation: true }} 
                                              autoplay={{ delay: 500 }}
                                             >
                              {
                                products.map((product, index)=>(
                  
                                <swiper-slide key={index} >
                                 { product.image[0] ?
                                    <img  src={product.image[0]} className="w-screen h-screen cursor-grab" />
                                        :
                                    <img src={product.imageLink[0]} className="w-screen h-screen cursor-grab" />
                                  }
                                  <div className = "info w-2/5 z-1 absolute bottom-28 left-12 h-fit">
                                    <h1>{product.title}</h1>
                                    <h5 className="line-clamp-2 overflow-ellipsis">{product.description}</h5> 
                                    <span className='block'>{formatDate(product.updatedAt?product.updatedAt:product?.createdAt)}</span>
                                    <Link href={"/ProductPage/details/"+ product._id} className={basicbtn + " pr-12 pl-12 pt-4 pb-4 bg-blue-800 border-blue-800 text-lg block"}>
                                      See details
                                    </Link>
                                  </div>
                                </swiper-slide>))}
                            </swiper-container>
                            <p className="font-l text-black font-bold text-2xl ml-4">Recently Updated...</p>
                        </div>
                  <Card children = {products}/>
                </div>
            </div>}
        </Layout>
       );
    }
