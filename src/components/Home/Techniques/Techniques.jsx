import React from 'react';
import { Box, Grid, Container, useTheme } from '@mui/material';
import TitleSection from '@/components/TitleSection/TitleSection';
import CircleTechnique from '@/components/CircleTechnique/CircleTechnique';

export default function Techniques() {
  const theme = useTheme()
  return (
    <Box component={'section'} sx={{padding: '3rem 1rem', backgroundColor: '#fafafa'}}>
        <Container>
            <Grid spacing={6} container justifyContent={'center'}>
                <Grid item xs={12}>
                    <TitleSection 
                        title={'Techniques'}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <CircleTechnique 
                        title={'Embroidery'} 
                        color={theme.palette.secondary.main}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <CircleTechnique 
                        title={'Sublimation'} 
                        color={theme.palette.secondary.main}
                    />
                </Grid>
                <Grid item xs={6} md={3}>
                    <CircleTechnique 
                        title={'DTF Transfrers'} 
                        color={theme.palette.primary.main}
                    />
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}
