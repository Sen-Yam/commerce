import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../Context/StateContext';

function MyApp({ Component, pageProps }) {
  return ( 
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} /> {/*  the content of index.js */} {/* pages/api/index.js = home page */}
      </Layout>
    </StateContext>
  )
}

export default MyApp