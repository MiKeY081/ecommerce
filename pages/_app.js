import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import {CartContextProvider} from './Components/globalVariables/CartContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { SearchContextProvider } from './Components/globalVariables/Search';

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
      <SessionProvider session={session}>
        <SearchContextProvider>
          <CartContextProvider>
              <Component {...pageProps}/>
              <ToastContainer />
          </CartContextProvider>
        </SearchContextProvider>
      </SessionProvider>
  )
}