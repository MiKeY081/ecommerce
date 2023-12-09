"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "./Nav";
import Link from "next/link";
import Login from "./loginpage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "./header";
import Footer from "./footer";

export default function Layout({children}) {
  
    const { data: session } = useSession();
    const router  = useRouter();
  //  if(!session)
  //   return (
  //     <>
    
  //      <div className='flex min-h-screen flex-col items-center gap-2 justify-center bg-slate-700'>
  //      <button 
  //       className=' text-xl p-4 cursor-pointer bg-white rounded-md text-black'
  //       onClick={() => signIn('credentials')}
  //      >Login with Credentials</button>
       
       

  //      <button 
  //       className=' text-xl p-4 cursor-pointer bg-white rounded-md text-black'
  //       onClick={() => signIn('google')}
  //      >Login with google</button>  
  //     </div>
  //     </>
  //   )
    
     return(
      <div className="flex flex-col w-screen min-h-screen bg-white">
        <Header/>
        <div className="mr-3 p-4 rounded-2xl mt-1 mb-1 min-h-screen">
         {children}
        </div>
        <Footer/>
      </div>
     )
}
