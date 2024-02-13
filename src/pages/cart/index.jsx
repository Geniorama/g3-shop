import Layout from "@/components/Layout/Layout";
import PageHeading from "@/components/PageHeading/PageHeading";
import { useState } from "react";
import { Typography, Box, Container, Button, Breadcrumbs, Link} from "@mui/material";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CartTable from "../../components/Cart/CartTable/CartTable";

export default function Cart() {
  const [isEmpty, setIsEmpty] = useState(false)

  const metadata = {
    title: 'Cart',
    description: 'My description'
  }
  return (
    <Layout
      metadata = {metadata}
      >
      <PageHeading title={metadata.title} />
      <Container>
        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
            Home
            </Link>
            <Typography color="text.primary">
                {'Cart'}
            </Typography>
        </Breadcrumbs>
      </Container>
      {isEmpty ? (
        <Box sx={{textAlign: 'center'}} py={{xs:8}}>
          <Container>
            <Box p={{xs: 3}}>
              <ProductionQuantityLimitsIcon color="primary" sx={{fontSize: '65px'}} />
            </Box>
            <Typography fontSize={{xs: '35px'}} color={'gray'}>
              Your cart is empty
            </Typography>
            <Button href="/shop" sx={{marginTop: '2em'}} variant="contained" color="secondary">
              Return to shop
            </Button>
          </Container>
        </Box>
      ) : (
        <Box py={{xs:8}}>
          <Container>
            <CartTable />
          </Container>
        </Box>
      )

      }
    </Layout>
  )
}
