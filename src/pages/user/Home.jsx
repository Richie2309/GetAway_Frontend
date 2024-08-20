import React from 'react'
import SearchandSet from '../../components/user/SearchandSet'
import homecarausal1 from '../../assets/homecarousal1.jpg';

const Home = () => {
    return (
        <div className="relative w-full h-screen p-5">
        <img 
            src={homecarausal1} 
            alt="Background" 
            className="absolute top-0 left-0 w-full h-5/6 object-cover z-0" 
        />
        <div className="relative z-10">
            <SearchandSet />
        </div>
    </div>
    )
}

export default Home