import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


const testKeywords = ['test', 'dummy', 'example']

const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

const SearchBar = () => {
    return(
        <>
            <Autocomplete
                disablePortal
                id="supplement-autocomplete"
                options ={testKeywords}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Keywords" />}
            />
            
            <br/>

            <Stack direction="row" spacing={1}>
                {testKeywords.map(tag => (
                    <Chip label={tag} onDelete={handleDelete} />
                ))}      
            </Stack>
        </>
    )
}

export default SearchBar;