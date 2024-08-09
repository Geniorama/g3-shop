import React from 'react';
import { Box, Container, Grid, Typography, Divider, Breadcrumbs, Link } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

export default function PageHeading({title}) {
  

  return (
    <Box component={'section'} mt={{xs: 8, md:10}} py={{xs: 2, md: 5}}>
        <Container>
            <Grid container>
                <Grid textAlign={'center'} item xs={12}>
                    <Typography 
                        component={'h1'} 
                        variant='h2'
                        fontWeight={'bold'}
                        color={'#252525'}
                        fontSize={{xs: '30px', lg: '50px'}}
                        >
                        {title}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
        <Divider sx={{marginTop: {xs: "30px", lg: "60px"}, marginBottom: '10px'}}/>
    </Box>
  )
}
