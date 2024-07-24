import React from 'react'
import Header from '../../components/user/Header'
import SearchandSet from '../../components/user/SearchandSet'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <SearchandSet />
        </>
    )
}

export default Home