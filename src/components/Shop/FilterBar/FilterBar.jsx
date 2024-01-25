import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Grid, Typography} from '@mui/material';

export default function FilterBar() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    
  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'} sx={{backgroundColor: '#fafafa', padding: '1em'}}>
        <Grid item>
            <Typography>
                Showing {"1"}-{"12"} of {"120"} results
            </Typography>
        </Grid>
        <Grid item>
            <Box sx={{ minWidth: 220 }}>
                <FormControl fullWidth>
                    <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    <MenuItem value="">
                        Short Filtering
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Grid>
    </Grid>
  )
}
