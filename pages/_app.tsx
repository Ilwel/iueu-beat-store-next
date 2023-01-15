import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client";
import client from "../client";
import Layout from '../components/Layout';
import RenderWhenMounted from '../components/RenderWhenMounted';
import { useEffect, useState } from 'react';
import Redirect from '../components/Redirect';
import UserContext from '../context/UserContext';
import { User } from '../types/UserContextType';


export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>({
    token: typeof window !== 'undefined' ? localStorage.getItem('token') as string : '',
    isAdmin: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') as string)?.isAdmin : false
  })

  useEffect(() => {
    console.log(user)
  }, [user])

  if (pageProps.protected && !user.token) {
    return <Redirect to='/sign-in' />
  } else if (pageProps.adminPage && !user.isAdmin) {
    return <Redirect to='/' />
  }

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={[user, setUser]}>
        <RenderWhenMounted>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RenderWhenMounted>
      </UserContext.Provider>
    </ApolloProvider>
  )
}
