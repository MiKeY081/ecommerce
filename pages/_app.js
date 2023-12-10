import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CartContextProvider from './CartContext';
import SearchContextProvider from './Search';

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <>
      <SessionProvider session={session}>
        <CartContextProvider>
          <SearchContextProvider>
            <Component {...pageProps} />
          </SearchContextProvider>
        </CartContextProvider>
      </SessionProvider>
      <ToastContainer />
    </>
  )
}
