import React from 'react';
import Layout from '@/components/Layout/Layout';
import PageHeading from '@/components/PageHeading/PageHeading';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Container, Grid, Typography, Breadcrumbs, Link} from '@mui/material';
import FilterBar from '@/components/Shop/FilterBar/FilterBar';
import GridProducts from '@/components/GridProducts/GridProducts';

const metadata = {
    title: 'Shop',
    description: 'Hello world'
}

export default function Shop() {

  return (
    <Layout
        metadata={metadata}
    >
        <PageHeading 
            title="Shop"
        />

        <Container>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                Home
                </Link>
                <Typography color="text.primary">
                    {'Shop'}
                </Typography>
            </Breadcrumbs>
            <Box margin={3} />
            <FilterBar />
            <Box margin={3} />
            <Grid container>
                <Grid item xs={12} lg={3}>
                    
                </Grid>
                <Grid item xs={12} lg={9}>
                    <GridProducts />
                </Grid>
            </Grid>
        </Container>

    </Layout>
  )
}
