"use client";
import Link from "next/link";
import Layout from "../Components/Layout";
import Table from "./table";
import Header from "../Components/header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const basicbtn =
  " bg-transparent border-2 border-indigo-600 p-2.5 rounded-2xl w-fit h-fit relative cursor-pointer overflow-hidden transition-all z-10 hover:text-green-100 before:bg-indigo-600 before:w-0 before:absolute before:top-0 before:-left-0 before:rounded-xl before:-z-10 before:transition-all hover:before:w-full hover:before:h-full";
export default function Products() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/api/auth/signin");
    }
  }, []);
  return (
    <Layout>
      <div className="p-8">
        <Link href="/Products/new" className={`${basicbtn} inline-block mb-16`}>
          {" "}
          Add a new product
        </Link>
        <Table />
      </div>
    </Layout>
  );
}
