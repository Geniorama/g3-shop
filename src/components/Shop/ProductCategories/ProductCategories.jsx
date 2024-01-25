import React from 'react';
import { Box, Grid, Container } from '@mui/material';
import TitleSection from '@/components/TitleSection/TitleSection';
import IconSection from '@/assets/img/Modo_de_aislamiento.svg';
import CardCategory from '@/components/Shop/CardCategory/CardCategory';

export default function ProductCategories() {
  return (
    <Box component={'section'} sx={{padding: '3rem 1rem', backgroundColor: '#fafafa'}}>
        <Container>
            <Grid spacing={3} container>
                <Grid sx={{textAlign: 'center', marginBottom: '2rem'}} item xs={12}>
                    <TitleSection
                        image={IconSection}
                        title="Product Categories"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CardCategory />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CardCategory />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CardCategory />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CardCategory />
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}
