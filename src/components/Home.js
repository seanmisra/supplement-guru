import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Recommendation from './Recommendation';

const Home = () => {
    return(
        <>
            <Header></Header>
            <SearchBar></SearchBar>
            <Recommendation></Recommendation>
        </>
    )
}

export default Home;