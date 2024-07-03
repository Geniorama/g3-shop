import Layout from "@/components/Layout/Layout";
import ProductHeading from "@/components/Product/ProductHeading/ProductHeading";
import FilterBar from '@/components/Shop/FilterBar/FilterBar';
import GridProducts from '@/components/GridProducts/GridProducts';
import SidebarShop from '@/components/Shop/SidebarShop/SidebarShop';
import { Box, Container, Grid} from '@mui/material';

const metadata = {
    title: 'Signs and Banners',
    description: 'Lorem'
}

export default function Category() {

  return (
    <Layout metadata={metadata}>
        <ProductHeading 
            title={metadata.title} 
            cover="https://images.unsplash.com/photo-1567137164735-5bfa261d60eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

        <Container>
            <Box margin={3} />
            <FilterBar />
            <Box margin={3} />
            <Grid container spacing={5}>
                <Grid item xs={12} lg={3}>
                    <SidebarShop />
                </Grid>
                <Grid item xs={12} lg={9}>
                    {/* <GridProducts /> */}
                </Grid>
            </Grid>
        </Container>
    </Layout>
  )
}
