import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    type: "",
    properties: "",
  });
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/category");
        setCategories(data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`/api/category?id=${categoryId}`);
      const updatedCategories = categories.filter(
        (category) => category._id !== categoryId
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h2 className='text-3xl font-semibold mb-6'>Categories</h2>
      <div className='flex gap-32'>
        {/* List of categories */}
        {categories.length === 0 ? (
          <p className='text-gray-600 mb-20'>Loading categories...</p>
        ) : (
          <ul>
            {categories.map((category) => (
              <li key={category._id} className='mb-4'>
                <div className='grid grid-cols-4 gap-32 '>
                  <h3 className='text-xl font-semibold capitalize'>
                    {category.type}
                  </h3>
                  <p className='text-gray-600'>{category.properties}</p>
                  {/* Button to edit the category (Navigate to the edit page) */}
                  <Link
                    href={`/Category/edit/${category._id}`}
                    className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2 ml-20 flex items-center justify-center'
                  >
                    Edit
                  </Link>
                  {/* Button to delete the category */}
                  <button
                    className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mr-2'
                    onClick={() => handleDeleteCategory(category._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Link for adding a new category */}
      <Link
        href='/Category/new'
        className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2'
      >
        Add Category
      </Link>
    </Layout>
  );
};

export default CategoryPage;
