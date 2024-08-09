import Layout from "@/components/Layout/Layout";
import PageHeading from "@/components/PageHeading/PageHeading";
import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Container,
  Button,
  Breadcrumbs,
  Link,
  Grid,
} from "@mui/material";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CartTable from "../../components/Cart/CartTable/CartTable";
import CartTotals from "../../components/Cart/CartTotals/CartTotals";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import shopifyClient from "@/lib/shopify";
import { useDispatch } from "react-redux";
import { removeItem } from "@/store/features/cartSlice";
import type { ItemCart } from "@/types";

export default function Cart({checkoutId}:any) {
  const [isEmpty, setIsEmpty] = useState(true);

  const cartItems = useSelector((state: RootState) => state.cart.items)
  const cartTotal = useSelector((state: RootState) => state.cart.totalAmount)
  const dispatch = useDispatch()

  useEffect(() => {
    if(cartItems.length > 0){
      setIsEmpty(false)
    } else {
      setIsEmpty(true)
    }
  }, [cartItems])

  const metadata = {
    title: "Cart",
    description: "My description",
  };

  
  const handleRemoveFromCart = (itemId: ItemCart['id']) => {
    dispatch(removeItem(itemId))
  }

  return (
    <Layout metadata={metadata}>
      {!isEmpty && (
        <>
          <PageHeading title={metadata.title} />
          <Container>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Typography color="text.primary">{"Cart"}</Typography>
            </Breadcrumbs>
          </Container>
        </>
      )}

      {isEmpty ? (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ textAlign: "center", height: "calc(100vh - 60px)" }} py={{ xs: 8 }}>
          <Container>
            <Box p={{ xs: 3 }}>
              <ProductionQuantityLimitsIcon
                color="primary"
                sx={{ fontSize: "65px" }}
              />
            </Box>
            <Typography fontSize={{ xs: "35px" }} color={"gray"}>
              Your cart is empty
            </Typography>
            <Button
              href="/shop"
              sx={{ marginTop: "2em" }}
              variant="contained"
              color="secondary"
            >
              Return to shop
            </Button>
          </Container>
        </Box>
      ) : (
        <Box py={{ xs: 8 }}>
          <Container>
            <CartTable 
              products={cartItems}
              onRemoveItem={handleRemoveFromCart}
            />
            <CartTotals 
              total={cartTotal}
            />
          </Container>
        </Box>
      )}
    </Layout>
  );
}