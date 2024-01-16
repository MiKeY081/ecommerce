import Layout from "@/pages/Components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CategoryForm from "../CategoryForm";

const UpdateCategory = () => {
  const [category, setCategory] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(`/api/category?id=${id}`);
        if (data.success) {
          setCategory(data.category);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);
  return (
    <Layout>
      {category && (
        <CategoryForm type={category?.type} properties={category.properties} />
      )}
    </Layout>
  );
};

export default UpdateCategory;
