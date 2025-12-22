import React from 'react';
import Banner from './Banner';
import TopScholarships from './TopScholarships';
import SuccessStories from './SuccessStories';
import ContactSection from './ContactSection';
import UseAuth from '../../Hook/UseAuth';
import Loading from '../Loading';

const Home = () => {
    const {loading} = UseAuth();

    if(loading)
    {
        return <Loading></Loading>
    }

    return (
        <div className=''>
            <Banner></Banner>
            <TopScholarships></TopScholarships>
            <SuccessStories></SuccessStories>
            <ContactSection></ContactSection>
        </div>
    );
};

export default Home;