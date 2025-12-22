import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';
import UseAuth from '../Hook/UseAuth';
import Loading from '../pages/Loading';

const MainLayout = () => {
      const {loading}=UseAuth()
      
      if(loading)
      {
         return <Loading></Loading>
      }
    return (
        <div className=' max-w-[1400px] mx-auto space-y-7' >
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;