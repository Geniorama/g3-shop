import React from 'react';
import { Box, Typography, Card, CardHeader, Grid, Container } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

export default function Features() {
  return (
    <Box component={'section'} sx={{padding: '3rem 0', background: '#FAFAFA'}}>
        <Container>
            <Grid 
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={3}
                >
                <Grid item xs={12} md={4}>
                    <Card sx={{padding: '3rem', textAlign: 'center'}}>
                        <RocketLaunchIcon style={{marginBottom: '5px'}} fontSize='large' color='secondary' />
                        <Typography color={'primary'} component={'p'} variant='h6' sx={{fontWeight: 'bold'}}>
                            Fast Service
                        </Typography>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{padding: '3rem', textAlign: 'center'}}>
                        <RocketLaunchIcon style={{marginBottom: '5px'}} fontSize='large' color='secondary' />
                        <Typography color={'primary'} component={'p'} variant='h6' sx={{fontWeight: 'bold'}}>
                            Fast Service
                        </Typography>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{padding: '3rem', textAlign: 'center'}}>
                        <RocketLaunchIcon style={{marginBottom: '5px'}} fontSize='large' color='secondary' />
                        <Typography color={'primary'} component={'p'} variant='h6' sx={{fontWeight: 'bold'}}>
                            Fast Service
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}
