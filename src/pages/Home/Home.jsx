import React from 'react';
import Banner from './Banner';
import TopScholarships from './TopScholarships';
import SuccessStories from './SuccessStories';
import ContactSection from './ContactSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TopScholarships></TopScholarships>
            <SuccessStories></SuccessStories>
            <ContactSection></ContactSection>
        </div>
    );
};

export default Home;