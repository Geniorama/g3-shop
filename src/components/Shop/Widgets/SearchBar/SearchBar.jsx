import React from 'react';
import { TextField, FormControl, InputAdornment, Button, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

export default function SearchBar() {
  return (
    <FormControl>
        <TextField 
            placeholder='Ingresa tu búsqueda'
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton>
                            <Search />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    </FormControl>
  )
}
