import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Recommendation from './Recommendation';

const Home = ({keywords}) => {
    return(
        <>
            <Header></Header>
            <SearchBar keywords={keywords}></SearchBar>
            <Recommendation></Recommendation>
        </>
    )
}

export default Home;