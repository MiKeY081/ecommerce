"use client";
import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className='min-h-screen z-0'>{children}</div>
      <Footer />
    </>
  );
}
