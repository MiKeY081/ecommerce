import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import { basicbtn } from '../Products';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

export default function ProductForm ({
    _id,
    title:existingTitle, 
    description:existingDescription,
    price:existingPrice,
    discountRate: existingDiscountRate,
    image:existingImages,
    imageLink:existingImageLink,
    userName:exisitingUserName,
}) {
  const [title, setTitle] = useState(existingTitle || '')
  const [description, setDescription] = useState(existingDescription ||'')
  const [price, setPrice] = useState(existingPrice || '')
  const [discountRate, setDiscountRate] = useState(existingDiscountRate || '')
  const [goToProducts, setGoToProducts] = useState(false)
  const {data: session} = useSession()
  const userName = session?.user?.name;
  const router = useRouter();

  //Images section
      const [image, setImage]= useState(existingImages || [])
      
      const handleImageUpload = async (e) => 
      { 
        
        const files = e.target.files;
        if(files?.length > 0){
        const formData = new FormData();
        for(const file of files)
        {
          formData.append('file', file);
          formData.append('upload_preset', 'wu1fj4zd');

          // Replace 'your_cloud_name' with your actual Cloudinary cloud name
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/deqtuwtw5/image/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );

          const data = await response.json();
          setImage((prevImage)=>[...prevImage, data.secure_url]);
          toast.success("Image uploaded successfully")}
      }
    };
  
//images section end
  //Images link section
    const [imageLink, setImageLink] = useState(existingImageLink || []);
    const handleImageLinkUpload = async (e) => {
      e.preventDefault();
      const link = e.target.value;
  
      if (link?.length > 0) {
        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/deqtuwtw5/image/upload`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                file: link,
                upload_preset: 'wu1fj4zd', // Replace with your actual upload preset
              }),
            }
          );
  
          if (response.ok) {
            const dataLink = await response.json();
            setImageLink((prevImage)=>[...prevImage, dataLink.secure_url]);
            toast.success('Image Link uploaded successfully');
            setImageLink("")
          } else {
            console.error('Failed to upload image link:', response.statusText);
            toast.error('Failed to upload image link');
          }
        } catch (error) {
          console.error('Error uploading image link:', error);
          toast.error('Error uploading image link');
        }
      }
      
    };
  
    console.log(userName)
  const data = {title, description, price , discountRate, image, imageLink, userName}
  async function saveProduct(e){
    e.preventDefault();
    if(_id){
        //update product
        await axios.put("/api/products",{...data, _id});
        setGoToProducts(true);
        toast.success("Product updated successfully")
        
    }
    else{
        //create new product
        await axios.post("/api/products", data)
        setGoToProducts(true)
        toast.success("Product created successfully")
}
  }
  if(goToProducts){
   router.push("/Products")
  }
    return (
        !session && 
        <form 
            onSubmit={saveProduct} 
            className='flex flex-col flex-1 padding-5 gap-3 font-semibold bg-yellow-300 p-12 rounded opacity-90'
        >
            <label>Product Name</label>
            <input type="text" 
                name="title" id="" 
                value={title}
                placeholder='Product Name'
                className='outline-slate-700 p-1 rounded-lg bg-white'
                onChange={(ev)=>setTitle(ev.target.value)}
                />

              <label className='mt-4 mb-2'>
                  <input  type='text'
                          className="outline-slate-700 p-4 rounded-lg w-80 h-12"
                          value={imageLink}
                          onChange={handleImageLinkUpload}/>
                  <button type='button' className={`${basicbtn} mt-4`} >Upload</button>
              </label>

              <label className='mt-4 mb-2'>
                  <span className={`${basicbtn} mt-4`}>Add new Photo</span>
                  <input  type='file'
                          accept='image/*'
                          multiple hidden
                          className="h-10" 
                          onChange={handleImageUpload}/>
              </label>

              <div className='flex flex-row'>
              {Array.isArray(imageLink) && imageLink.map((imageLinks,index)=>(<img  key={index} src={imageLinks} publicId={imageLinks} width="100" crop="scale" />))}
              {Array.isArray(image) && image.map((images,index)=>(<img key={index} src={images} publicId={images} width="100" crop="scale" />))}</div>
              {!image?.length && !imageLink?.length && (
              <div>No images of this product</div>)}

            <label>Description</label>
            <textarea 
                name="description" id="" 
                cols="30" rows="5" 
                value={description}
                placeholder='Description'  
                className='outline-slate-700 p-1 rounded-lg'
                onChange={(ev)=>setDescription(ev.target.value)}
                ></textarea>
            <label>Price in NRs</label>
            <input 
                type="number" 
                name="price" id="" 
                value={price}
                placeholder='Price' 
                className='outline-slate-700 p-1 rounded-lg'
                onChange={(ev)=>setPrice(ev.target.value)}
                />
            <label>Discount rate if available...</label>
            <input 
                type="number" 
                name="discountRate" id="" 
                value={discountRate}
                placeholder='Discount Rate' 
                className='outline-slate-700 p-1 rounded-lg'
                onChange={(ev)=>setDiscountRate(ev.target.value)}
                />
            <button 
                type="submit" 
                className={basicbtn}
            >Save Product</button>
        </form>
    )
  }