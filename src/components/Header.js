import React from 'react';
import { useEffect } from 'react';

const Header = () => {
    useEffect(() => {
        // console.log(process.env.REACT_APP_ADMIN_UPDATE_PASSWORD);
    });


    return(
        <div className='headerWrapper'>
            <h1>Supplement Guru</h1>
            <p>Find the right supplement for you!</p>
        </div>
    )
}

export default Header;