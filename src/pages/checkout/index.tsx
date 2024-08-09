import Layout from "@/components/Layout/Layout";
import PageHeading from "@/components/PageHeading/PageHeading";
import {
  Typography,
  Box,
  Container,
  Button,
  Breadcrumbs,
  Link,
  Grid,
} from "@mui/material";

import FormBilling from "../../components/Checkout/FormBilling/FormBilling";
import OrderSummary from "../../components/Checkout/FormBilling/OrderSummary";
import { numberToPrice } from "@/helpers/helpers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { loadStripe } from '@stripe/stripe-js';
import { ItemCart } from "@/types";
import { LineItem } from "../api/checkout_sessions";
import { useRouter } from "next/router";

const metadata = {
  title: "Checkout",
  description: "Lorem ipsum",
};

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

const convertToSubcurrency=(amount: number, factor = 100)=>{
  return Math.round(amount * factor)
}

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const {items} = useSelector((state: RootState) => state.cart)
  const [stripeItems, setStripeItems] = useState<LineItem[]>()
  const router = useRouter()

  if(!items || items.length <= 0){
    router.push('/shop')
  }

  const handleCheckout = async () => {
    setLoading(true);

    if(stripeItems){
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: stripeItems
        }),
      });
  
      const { id } = await res.json();
  
      const stripe = await stripePromise;

      if(stripe){
        const { error } = await stripe.redirectToCheckout({ sessionId: id });

        if (error) {
          console.error('Error redirecting to checkout:', error);
          setLoading(false);
        }
      }
    }

    
  };

  useEffect(() => {
    const updatedItems:LineItem[] = items.map(item => ({
      price_data: {
        currency: 'usd',
        unit_amount: convertToSubcurrency(item.normalPrice),
        product_data:{
          name: item.title
        }
      },
      quantity: item.quantity
    }))

    setStripeItems(updatedItems)
  },[items])

  return (
    <Layout metadata={metadata}>
      <PageHeading title={metadata.title} />
      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">{"Checkout"}</Typography>
        </Breadcrumbs>

        <Grid sx={{py:{xs: 7}}} container spacing={5}>
            <Grid item xs={12} md={8}>
                <FormBilling />
            </Grid>
            <Grid item xs={12} md={4}>
                <OrderSummary />
            </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
