import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Recommendation from './Recommendation';

const Home = ({keywords, getRecommendation, recommendationObj, addHandler, deleteHandler}) => {
    const onSubmit = (keywords) => {
        console.log('submitted keywords');
        console.log(keywords);
        getRecommendation(keywords)
    }
    
    return(
        <>
            <Header></Header>
            <SearchBar addHandler={addHandler} deleteHandler={deleteHandler} onSubmit={onSubmit} keywords={keywords}></SearchBar>
            <Recommendation recommendationObj={recommendationObj}></Recommendation>
        </>
    )
}

export default Home;