import Layout from "@/pages/Components/Layout"
import { basicbtn } from "@/pages/Products"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function deleteProduct(){
    const [productInfo, setProductInfo] = useState(null)
    const [goToProducts, setGoToProducts] = useState(false)
    const router = useRouter()
    const {id} = router.query
    useEffect(()=>{
        if (!id)
        {
            return ;
        }
        axios.get('/api/products?id='+id).then (response => setProductInfo(response.data))
    },[id])
    if(goToProducts){
        router.push("/Products")
    }
    async function deleteProduct(){
        await axios.delete('/api/products?id='+id)
        toast.warn("Product deleted")
        setGoToProducts(true)
    }
    return (
        <Layout>
            <div className="text-center">
                <h1>Do you really want to delete the product {productInfo?.title}</h1><br/>
                <button onClick={deleteProduct} className={`text-black border-red-500 mr-12 pl-12 pr-12 bg-red-500${basicbtn}`}>Yes</button>
                <button onClick = {()=>
                                        {toast.success("Delete cancellation")
                                        setGoToProducts(true)}
                                       }
                        className={`${basicbtn} ml-12 pl-12 pr-12 bg-slate-500 border-slate-500  text-black`} >
                No</button>
            </div>
        </Layout>
    )
}