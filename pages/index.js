// index.js
// link the front with sanity
// home page
import React from 'react'

import Head from 'next/head'
import StateContext from '../Context/StateContext';
import { Toaster } from 'react-hot-toast';

import { client } from '../lib/client';
import { Cart, Footer, FooterBanner, HeroBanner, Layout, NavBar, Product } from '../components/index'


const Home = ({ products, bannerData }) => {
  
  
  return (
     <div>
   
    <HeroBanner  heroBanner={bannerData[0]}  />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products?.map((product, index) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerbanner={bannerData[0]} />
 
   
    </div>
    
   
    
  );
}

export const getServerSideProps = async () => {
  const Productquery = '*[_type=="order"]'; // type=name in the schema
  const products = await client.fetch(Productquery);
  const Bannerquery = '*[_type=="banner"]';
  const bannerData = await client.fetch(Bannerquery);
 
  
  return {
    props: { products, bannerData }
  }
}

export default Home;
