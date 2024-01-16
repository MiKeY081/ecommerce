"use client";
import Header from "./Header";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className='min-h-screen z-0'>{children}</div>
      <Footer />
    </>
  );
}
