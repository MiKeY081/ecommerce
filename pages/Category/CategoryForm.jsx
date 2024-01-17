import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Header from "../Components/header";

const CategoryForm = ({
  type: existingType,
  properties: existingProperties,
}) => {
  const [categoryType, setCategoryType] = useState(existingType || "");
  const [categoryProperties, setCategoryProperties] = useState(
    existingProperties || ""
  );
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (existingType) {
        response = await axios.put(`/api/category`, {
          type: categoryType,
          properties: categoryProperties,
          _id: id,
        });
      } else {
        response = await axios.post("/api/category", {
          type: categoryType,
          properties: categoryProperties,
        });
      }

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form fields after a successful submission
        setCategoryType("");
        setCategoryProperties("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("An error occurred", error);
      // Handle errors here (e.g., show an error message to the user)
    }
  };

  return (
    <>
      <Header />
      <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md'>
        <h2 className='text-2xl font-semibold mb-4'>
          {existingType ? "Edit Category" : "Create a new Category"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='categoryType'
              className='block text-sm font-medium text-gray-600'
            >
              Category Type:
            </label>
            <input
              type='text'
              id='categoryType'
              name='categoryType'
              value={categoryType}
              onChange={(e) => setCategoryType(e.target.value)}
              className='mt-1 p-2 border rounded-md w-full'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='categoryProperties'
              className='block text-sm font-medium text-gray-600'
            >
              Properties:
            </label>
            <textarea
              id='categoryProperties'
              name='categoryProperties'
              value={categoryProperties}
              onChange={(e) => setCategoryProperties(e.target.value)}
              rows='3'
              className='mt-1 p-2 border rounded-md w-full'
              required
            ></textarea>
          </div>

          <button
            type='submit'
            className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
          >
            {existingType ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CategoryForm;
