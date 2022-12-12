import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
    return(
        <div className='adminWrapper'> 
            <h1>
                Admin Panel
            </h1>
            <p id="adminHomeLink"><Link to='/'>Back Home</Link></p>

            <h3>Add Supplement</h3>
            <div className='formWrapper'>
                <label for='suppName'>Name: </label> 
                <input id='suppName' name='suppName'/>
                <br/>

                <label for='suppDescription'>Description: </label> 
                <textarea type='textarea' id='suppDescription' name='suppDescription'/>
                <br/>

                <label for='suppTags'>Tags: </label> 
                <input id='suppTags' name='suppTags'/>
                <br/>

                <button>Submit</button>
            </div>  
        </div>
    )
}

export default Admin;