import React from 'react';
import { Box, Grid, Container } from '@mui/material';
import TitleSection from '@/components/TitleSection/TitleSection';
import CircleTechnique from '@/components/CircleTechnique/CircleTechnique';

export default function Techniques() {
  return (
    <Box component={'section'} sx={{padding: '3rem 1rem', backgroundColor: '#fafafa'}}>
        <Container>
            <Grid spacing={6} container>
                <Grid item xs={12}>
                    <TitleSection 
                        title={'Techniques'}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <CircleTechnique />
                </Grid>
                <Grid item xs={6} md={3}>
                    <CircleTechnique />
                </Grid>
                <Grid item xs={6} md={3}>
                    <CircleTechnique />
                </Grid>
                <Grid item xs={6} md={3}>
                    <CircleTechnique />
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}
