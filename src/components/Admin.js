import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Admin = ({onAdd}) => {
    const [suppName, setSuppName] = useState('')
    const [suppDesription, setSuppDescription] = useState('')
    const [suppTags, setSuppTags] = useState('')

    const [suppNameDelete, setSuppNameDelete] = useState('')
    const [adminPassword, setAdminPassword] = useState('')

    const validatePassword = () => {
        const adminPasswordVal = process.env.REACT_APP_ADMIN_UPDATE_PASSWORD;
        return adminPassword === adminPasswordVal;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const adminPasswordVal = process.env.REACT_APP_ADMIN_UPDATE_PASSWORD;

        if (!validatePassword()) {
            alert('Admin Password is incorrect');
            return;
        }

        if (!suppName) {
            alert('Supplement Name is required');
            return;
        }

        if (!suppTags) {
            alert('Tags are required');
            return;
        }

        const parsedTags = suppTags.split(',');

        if (parsedTags.length < 1) {
            alert('At least one tag is required in a comma-separated format');
            return;
        }


        onAdd({ 
            name: suppName,
            description: setSuppDescription,
            tags: parsedTags
        })

        alert('Successfully added ' + suppName);
        setSuppName('');
        setSuppDescription('');
        setSuppTags('');

    }

    return(
        <div className='adminWrapper'> 
            <h1>
                Admin Panel
            </h1>
            <p id="adminHomeLink"><Link to='/'>Back Home</Link></p>

            <label htmlFor='adminPassword'>Password: </label> 
            <input required id='adminPassword' name='adminPassword'
                value={adminPassword} onChange={(e) => setAdminPassword(e.target.value) }
                />
            
            <h3>Add/Edit Supplement</h3>
            <p>If supplement name is existing, then existing entry will be updated</p>
            <form className='formWrapper' onSubmit={onSubmit}> 
                <label htmlFor='suppName'>Name: </label> 
                <input id='suppName' name='suppName'
                value={suppName} onChange={(e) => setSuppName(e.target.value) }
                />
                <br/>

                <label htmlFor='suppDescription'>Description: </label> 
                <textarea type='textarea' id='suppDescription' name='suppDescription'
                value={suppDesription} onChange={(e) => setSuppDescription(e.target.value)}
                />
                <br/>

                <label htmlFor='suppTags'>Tags: </label> 
                <input id='suppTags' name='suppTags'
                value={suppTags} onChange={(e) => setSuppTags(e.target.value)}
                />
                <br/>

                <button>Submit</button>
            </form>  

            <h3>Delete Supplement</h3>
            <p>If supplement name is found, that entry will be deleted</p>
            <form>
                <label htmlFor='suppNameDelete'>Name: </label> 
                    <input id='suppNameDelete' name='suppNameDelete'
                    value={suppNameDelete} onChange={(e) => setSuppNameDelete(e.target.value) }
                    />
            </form>
        </div>
    )
}

export default Admin;