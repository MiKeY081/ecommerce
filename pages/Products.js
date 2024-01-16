import Link from "next/link";
import Layout from "./Components/Layout";
import Table from "./Products/table";

export const basicbtn =
  " bg-transparent border-2 border-indigo-600 p-2.5 rounded-2xl w-fit h-fit relative cursor-pointer overflow-hidden transition-all z-10 hover:text-green-100 before:bg-indigo-600 before:w-0 before:absolute before:top-0 before:-left-0 before:rounded-xl before:-z-10 before:transition-all hover:before:w-full hover:before:h-full";
export default function Products() {
  return (
    <Layout>
      <div className='p-8'>
        <Link href='/Products/new' className={`${basicbtn} inline-block mb-16`}>
          {" "}
          Add a new product
        </Link>
        <Table />
      </div>
    </Layout>
  );
}
