import React from 'react';
import SearchandSet from '../../components/user/SearchandSet';
import homecarausal1 from '../../assets/homecarousal1.jpg';
import TopThree from '../../components/user/TopThree';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="relative w-full h-screen">
                <img
                    src={homecarausal1}
                    alt="Background"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                <div className="relative z-10 pt-20">
                    <h1 className="text-5xl font-bold text-white text-center mb-8">
                        Find Your Perfect Stay
                    </h1>
                    <SearchandSet />
                </div>
            </div>
            <div className="relative z-20 -mt-32">
                <TopThree />
            </div>
        </div>
    );
};

export default Home;