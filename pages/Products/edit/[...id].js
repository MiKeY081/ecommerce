import Layout from "@/pages/Components/Layout";
import ProductForm from "@/pages/Products/productform";
import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function EditProduct(){
    const [productInfo, setProductInfo] = useState(null)
    const router = useRouter();
    const {id} = router.query
    useEffect(()=>{
        if(!id){ return;}
        axios.get('/api/products?id=' + id).then((response)=>{setProductInfo(response.data)})
    },[id])
    return (
        <Layout>
            <h1>Edit product here</h1>
            {productInfo && 
            (<ProductForm {...productInfo}/>)}
        </Layout>
    )
}