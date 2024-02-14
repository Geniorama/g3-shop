import React from 'react';
import { Box, Typography, Card, CardHeader, Grid, Container } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';

export default function Features() {
  return (
    <Box component={'section'} sx={{padding: '3rem 0', background: '#FAFAFA'}}>
        <Container>
            <Grid 
                container
                direction="row"
                justifyContent="center"
                alignItems={{xs: "flex-start", lg: "center"}}
                spacing={3}
                >
                <Grid item xs={4}>
                    <Box textAlign={'center'}>
                        <RocketLaunchOutlinedIcon style={{marginBottom: '5px'}} fontSize='large' color='secondary' />
                        <Typography color={'primary'} component={'p'} variant='h6' sx={{fontWeight: '600'}} fontSize={{xs: '12px', md: '15px'}}>
                            Fast Service
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={4}>
                   <Box textAlign={'center'}>
                        <ShieldOutlinedIcon style={{marginBottom: '5px'}} fontSize='large' color='secondary' />
                        <Typography color={'primary'} component={'p'} variant='h6' sx={{fontWeight: '600'}} fontSize={{xs: '12px', md: '15px'}}>
                            Secure Payment
                        </Typography>
                   </Box>
                </Grid>

                <Grid item xs={4}>
                    <Box textAlign={'center'}>
                        <InsertEmoticonOutlinedIcon style={{marginBottom: '5px'}} fontSize='large' color='secondary' />
                        <Typography color={'primary'} component={'p'} variant='h6' sx={{fontWeight: '600'}} fontSize={{xs: '12px', md: '15px'}}>
                            Personalized Attention
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}
