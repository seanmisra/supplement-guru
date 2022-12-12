import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';


const SearchBar = ({keywords, onSubmit}) => {
    const [addedKeywords, setAddedKeywords] = useState([]);
    const [keywordVal, setKeywordVal] = useState('');

    const onAdd = () => {
        if (keywordVal === '') { return; }
        setAddedKeywords([...addedKeywords, keywordVal])
        setKeywordVal('');
    }

    const handleDelete = (tag) => {
        setAddedKeywords(addedKeywords.filter(kw => kw !== tag));
        setKeywordVal(''); 
    };

    const handleSubmit = () => {
        console.log('handleSubmit');
        onSubmit(addedKeywords);
    }
    

    return(
        <>
            <Autocomplete
                value={keywordVal}
                onChange={(event, newValue) => {
                    setKeywordVal(newValue);
                }}
                disablePortal
                id="supplement-autocomplete"
                options ={keywords}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Tags" />}
            />

            <br/>
            <Button id="add-tag-button" variant="contained" onClick={onAdd}>Add</Button>
            <Button id="add-submit-button" color="success" variant="contained" onClick={handleSubmit}>Submit</Button>
            <br/>
            <br/>

            <Stack direction="row" spacing={1}>
                {addedKeywords.map((tag, index) => (
                    <Chip key={index} label={tag} onDelete={() => handleDelete(tag)} />
                ))}      
            </Stack>
        </>
    )
}

export default SearchBar;