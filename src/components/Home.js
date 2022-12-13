import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Recommendation from './Recommendation';

const Home = ({keywords, getRecommendation, recommendationObj, addHandler, deleteHandler}) => {
    const onSubmit = (keywords) => {
        if (keywords.length === 0) {
            alert('At least one tag is required!');
            return;
        }
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