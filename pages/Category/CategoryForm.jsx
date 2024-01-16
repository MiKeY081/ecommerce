import React, { useState } from "react";

const CategoryForm = () => {
  const [categoryType, setCategoryType] = useState("");
  const [properties, setProperties] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your logic to handle form submission, for example, sending data to a server
    console.log("Category Type:", categoryType);
    console.log("Properties:", properties);

    // Reset form fields after submission
    setCategoryType("");
    setProperties("");
  };

  return (
    <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md'>
      <h2 className='text-2xl font-semibold mb-4'>Create a new Category</h2>

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
            htmlFor='properties'
            className='block text-sm font-medium text-gray-600'
          >
            Properties:
          </label>
          <textarea
            id='properties'
            name='properties'
            value={properties}
            onChange={(e) => setProperties(e.target.value)}
            rows='3'
            className='mt-1 p-2 border rounded-md w-full'
            required
          ></textarea>
        </div>

        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
