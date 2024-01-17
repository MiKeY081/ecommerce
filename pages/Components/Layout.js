import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className='min-h-screen z-0'>{children}</div>
      <Footer />
    </>
  );
}
