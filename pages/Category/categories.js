import axios from "axios";
import React, { useState, useEffect } from "react";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get("/api/category");
        setCategories(data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className='max-w-2xl mx-auto mt-8'>
      <h2 className='text-3xl font-semibold mb-6'>Categories</h2>

      {categories.length === 0 ? (
        <p className='text-gray-600'>Loading categories...</p>
      ) : (
        <ul>
          {categories.map((category, index) => (
            <li key={index} className='mb-4'>
              <h3 className='text-xl font-semibold'>{category.type}</h3>
              <p className='text-gray-600'>{category.properties}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryPage;
