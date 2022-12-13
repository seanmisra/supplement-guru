import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Admin = ({onAdd, onDelete, onEdit, allSupplements}) => {
    const [suppName, setSuppName] = useState('')
    const [suppDesription, setSuppDescription] = useState('')
    const [suppTags, setSuppTags] = useState('')

    const [suppNameDelete, setSuppNameDelete] = useState('')
    const [adminPassword, setAdminPassword] = useState('')

    const validatePassword = () => {
        const adminPasswordVal = process.env.REACT_APP_ADMIN_UPDATE_PASSWORD;
        return adminPassword === adminPasswordVal;
    }

    const handleDelete = (e) => {
        e.preventDefault();

        if (!validatePassword()) {
            alert('Admin Password is incorrect');
            return;
        }

        if (!suppNameDelete) {
            alert('Supplement Name is required');
            return;
        }

        const existingSupplement = allSupplements.find(thisSupp => thisSupp.name.toLowerCase() === suppNameDelete.toLowerCase());
 
        if (existingSupplement) {
            onDelete(existingSupplement._id)
            alert('Successfully deleted ' + suppNameDelete);
            setSuppNameDelete('');
        } else {
            alert('Delete failed. Does not exist: ' + suppNameDelete);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

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

        const suppObj = {
            name: suppName,
            description: suppDesription,
            tags: parsedTags
        }

        const existingSupplement = allSupplements.find(thisSupp => thisSupp.name.toLowerCase() === suppName.toLowerCase())

        if (existingSupplement) {
            suppObj._id = existingSupplement._id
            onEdit(suppObj)
            alert('Successfully EDITED ' + suppName);
        } else {
            onAdd(suppObj)
            alert('Successfully ADDED ' + suppName);
        }

        setSuppName('');
        setSuppDescription('');
        setSuppTags('');

    }

    return(
        <div className='adminWrapper'> 
            <h1>
                Admin Panel
            </h1>
            <div className='adminContainer'>
                <p id="adminHomeLink"><Link to='/'>Back Home</Link></p>

                <label className='adminLabel passwordLabel' htmlFor='adminPassword'>Password: </label> 
                <input className='adminControl passwordControl' type='password' required id='adminPassword' name='adminPassword'
                    value={adminPassword} onChange={(e) => setAdminPassword(e.target.value) }
                    />

                <h3>Add/Edit Supplement</h3>
                <p>If supplement name is existing, then existing entry will be updated</p>
                <form className='formWrapper' onSubmit={onSubmit}> 
                    <label className='adminLabel' htmlFor='suppName'>Name: </label> 
                    <input className='adminControl' id='suppName' name='suppName'
                    value={suppName} onChange={(e) => setSuppName(e.target.value) }
                    />
                    <br/>

                    <label className='adminLabel' htmlFor='suppDescription'>Description: </label> 
                    <textarea className='adminControl' type='textarea' id='suppDescription' name='suppDescription'
                    value={suppDesription} onChange={(e) => setSuppDescription(e.target.value)}
                    />
                    <br/>

                    <label className='adminLabel' htmlFor='suppTags'>Tags: </label> 
                    <input className='adminControl' id='suppTags' name='suppTags'
                    value={suppTags} onChange={(e) => setSuppTags(e.target.value)}
                    />
                    <br/>

                    <button className='adminButton'>Submit</button>
                </form>  

                <h3>Delete Supplement</h3>
                <p>If supplement name is found, that entry will be deleted</p>
                <form className='formWrapper' onSubmit={handleDelete}>
                    <label className='adminLabel' htmlFor='suppNameDelete'>Name: </label> 
                        <input className='adminControl' id='suppNameDelete' name='suppNameDelete'
                        value={suppNameDelete} onChange={(e) => setSuppNameDelete(e.target.value) }
                        />
                    <br/>
                    <button className='adminButton'>Submit</button>
                </form>

                <h3 id="admin-all-supplements-header">All Supplements ({allSupplements.length})</h3>
                <ul id="admin-all-supplements-list">
                {allSupplements.map(thisSupp => (
                    <li>{thisSupp.name}</li>
                ))}
                </ul>
            </div>
        </div>
    )
}

export default Admin;