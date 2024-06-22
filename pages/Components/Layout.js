import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }) {
  return (
    <div className= " w-screen overflow-hidden">
      <Header />
      <div className='min-h-screen z-0 w-screen'>{children}</div>
      <Footer />
    </div>
  );
}
