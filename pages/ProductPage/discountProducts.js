import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../Components/productCard'
import Layout from '../Components/Layout'

export default function discountProducts() {
    const [products, setProducts] = useState([])
    useEffect(()=>{
        axios.get('/api/products').then(response=>setProducts(response.data))
    },[])
    const discountProducts = products.filter(product=>(product.discountRate!=null))
    console.log(discountProducts)
  return (
    <Layout>
        {
            Array.isArray(discountProducts) ?
                <Card children ={discountProducts}/>
                    :
                <h2>No discount products available</h2>
        }
    </Layout>
  )
}