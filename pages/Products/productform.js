import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { basicbtn } from "./Products";

const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  discountRate: existingDiscountRate,
  image: existingImages,
  imageLink: existingImageLink,
  slug: existingSlug,
  category: existingCategory,
  rating: existingRating,
}) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || 0);
  const [discountRate, setDiscountRate] = useState(existingDiscountRate || 0);
  const [slug, setSlug] = useState(existingSlug || "");
  const [category, setCategory] = useState(existingCategory || "");
  const [rating, setRating] = useState(existingRating || 0);
  const [image, setImage] = useState(existingImages || []);
  const [imageLink, setImageLink] = useState(existingImageLink || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const { data: session } = useSession();
  const userName = session?.user?.name || "admin";
  const router = useRouter();

  // Categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Images section
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (files?.length > 0) {
      const formData = new FormData();
      for (const file of files) {
        formData.append("file", file);
        formData.append("upload_preset", "wu1fj4zd");

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/deqtuwtw5/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await response.json();
          setImage((prevImage) => [...prevImage, data.secure_url]);
          toast.success("Image uploaded successfully");
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Failed to upload image");
        }
      }
    }
  };

  // Images link section
  const handleImageLinkUpload = async (e) => {
    e.preventDefault();
    const link = e.target.value;

    if (link?.length > 0) {
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/deqtuwtw5/image/upload`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              file: link,
              upload_preset: "wu1fj4zd", // Replace with your actual upload preset
            }),
          }
        );

        if (response.ok) {
          const dataLink = await response.json();
          setImageLink((prevImage) => [...prevImage, dataLink.secure_url]);
          toast.success("Image Link uploaded successfully");
          setImageLink("");
        } else {
          console.error("Failed to upload image link:", response.statusText);
          toast.error("Failed to upload image link");
        }
      } catch (error) {
        console.error("Error uploading image link:", error);
        toast.error("Error uploading image link");
      }
    }
  };

  const data = {
    title,
    description,
    price,
    discountRate,
    slug,
    category,
    rating,
    userName,
    image,
    imageLink,
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      if (_id) {
        // Update product
        await axios.put("/api/products", { ...data, _id });
        toast.success("Product updated successfully");
      } else {
        // Create new product
        await axios.post("/api/products", data);
        toast.success("Product created successfully");
      }
      setGoToProducts(true);
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    }
  };

  if (goToProducts) {
    router.push("/Products");
  }

  return (
    <form
      onSubmit={saveProduct}
      className='flex flex-col flex-1 padding-5 gap-3 font-semibold bg-indigo-200 p-12 rounded opacity-90'
    >
      {/* Product Name */}
      <label>Product Name</label>
      <input
        type='text'
        name='title'
        value={title}
        placeholder='Product Name'
        className='outline-slate-700 p-1 rounded-lg'
        onChange={(ev) => setTitle(ev.target.value)}
      />

      {/* Category Radio Buttons */}
      <label>Category</label>
      <div>
        {categories.map((cat) => (
          <label key={cat._id} className='mr-4 capitalize'>
            <input
              type='radio'
              name='category'
              value={cat._id}
              checked={category === cat._id}
              onChange={() => setCategory(cat._id)}
            />
            {cat.type}
          </label>
        ))}
      </div>

      {/* Price */}
      <label>Price in NRs</label>
      <input
        type='number'
        name='price'
        value={price}
        placeholder='Price'
        className='outline-slate-700 p-1 rounded-lg'
        onChange={(ev) => setPrice(ev.target.value)}
      />

      {/* Discount Rate */}
      <label>Discount rate if available...</label>
      <input
        type='number'
        name='discountRate'
        value={discountRate}
        placeholder='Discount Rate'
        className='outline-slate-700 p-1 rounded-lg'
        onChange={(ev) => setDiscountRate(ev.target.value)}
      />

      {/* Description */}
      <label>Description</label>
      <textarea
        name='Description'
        value={description}
        placeholder='Description'
        className='outline-slate-700 p-1 rounded-lg'
        onChange={(ev) => setDescription(ev.target.value)}
      ></textarea>

      {/* Slug */}
      <label>Slug</label>
      <input
        type='text'
        name='slug'
        value={slug}
        placeholder='Slug'
        className='outline-slate-700 p-1 rounded-lg'
        onChange={(ev) => setSlug(ev.target.value)}
      />

      {/* Rating */}
      <label>Rating</label>
      <input
        type='number'
        name='rating'
        value={rating}
        placeholder='Rating'
        className='outline-slate-700 p-1 rounded-lg'
        onChange={(ev) => setRating(ev.target.value)}
      />

      {/* Image Link */}
      <label>Image Link</label>
      <input
        type='text'
        name='imageLink'
        value={imageLink}
        placeholder='Image Link'
        className='outline-slate-700 p-1 rounded-lg'
        onChange={(ev) => setImageLink(ev.target.value)}
      />

      {/* Image Upload */}
      <label>Image Upload</label>
      <input
        type='file'
        accept='image/*'
        multiple
        onChange={handleImageUpload}
      />

      {/* Display Images */}
      <div className='flex flex-row'>
        {Array.isArray(image) &&
          image.map((img, index) => (
            <img key={index} src={img} alt={`Product Image ${index}`} />
          ))}
      </div>

      <button type='submit' className={basicbtn}>
        Save Product
      </button>
    </form>
  );
};

export default ProductForm;
