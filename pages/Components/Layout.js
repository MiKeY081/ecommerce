"use client"
import Header from "./header";
import Footer from "./footer";

export default function Layout({children}) {
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
