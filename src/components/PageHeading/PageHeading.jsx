import React from 'react';
import { Box, Container, Grid, Typography, Divider, Breadcrumbs, Link } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

export default function PageHeading({title}) {
  

  return (
    <Box component={'section'} sx={{padding: '3rem 0', marginTop: '60px'}}>
        <Container>
            <Grid container>
                <Grid textAlign={'center'} item xs={12}>
                    <Typography 
                        component={'h1'} 
                        variant='h2'
                        fontWeight={'bold'}
                        color={'gray'}
                        >
                        {title}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
        <Divider sx={{marginTop: "60px", marginBottom: '30px'}}/>
    </Box>
  )
}
