import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../Components/productCard'
import Header from '../Components/header'

function discountProducts() {
    const [products, setProducts] = useState([])
    useEffect(()=>{
        axios.get('/api/products').then(response=>setProducts(response.data))
    },[])
    const discountProducts = products.filter(product=>(product.discountRate!=null))
    console.log(discountProducts)
  return (
    <div>
        <Header/>
        {
            Array.isArray(discountProducts) ?
                <Card children ={discountProducts}/>
                    :
                <h2>No discount products available</h2>
        }
    </div>
  )
}

export default discountProducts