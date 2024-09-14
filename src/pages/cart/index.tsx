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
  Stack
} from "@mui/material";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CartTable from "../../components/Cart/CartTable/CartTable";
import CartTotals from "../../components/Cart/CartTotals/CartTotals";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { removeItem } from "@/store/features/cartSlice";
import type { ItemCart } from "@/types";
import { setCheckoutId } from "@/store/features/cartSlice";
import { fetchContactInfo, fetchSocialMedia } from "@/lib/dataFetchers";
import type { ContactInfo, SocialMediaItem } from "@/types";
import {
  setContactInfo,
  setSocialMedia,
} from "@/store/features/generalInfoSlice";
import Loader from "@/components/Loader/Loader";

type CartProps = {
  contactInfo?: ContactInfo;
  socialMedia?: SocialMediaItem[];
};

export default function Cart({ contactInfo, socialMedia }: CartProps) {
  const [isEmpty, setIsEmpty] = useState<Boolean | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const { checkoutId, items } = useSelector((state: RootState) => state.cart);
  const [loading, setLoading] = useState(true)

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartTotal = useSelector((state: RootState) => state.cart.totalAmount);
  const dispatch = useDispatch();

  useEffect(() => {
    if (contactInfo) {
      dispatch(setContactInfo(contactInfo));
    }
  }, [contactInfo, dispatch]);

  useEffect(() => {
    if (socialMedia) {
      dispatch(setSocialMedia(socialMedia));
    }
  }, [socialMedia, dispatch]);

  /**
   * CREATE CHECKOUT SHOPIFY
   */
  useEffect(() => {
    async function createCheckout() {
      try {
        const res = await fetch("/api/create-checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items }),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        if (res.ok) {
          dispatch(setCheckoutId(data.id));
          if (data.webUrl) {
            setCheckoutUrl(data.webUrl);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    console.log("Cart Items", items);
    if (items && items.length > 0) {
      createCheckout();
    }
  }, [items, dispatch]);

  useEffect(() => {
    setLoading(false)
    if (cartItems.length > 0 && checkoutId) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [cartItems, checkoutId]);

  const metadata = {
    title: "Cart",
    description: "My description",
  };

  const handleRemoveFromCart = (itemId: ItemCart["id"]) => {
    dispatch(removeItem(itemId));
  };

  if (loading) {
    return (
      <Layout metadata={metadata}>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ height: "calc(100vh - 100px)" }}
        >
          <Box sx={{ width: "70px" }}>
            <Loader />
            <Typography>Loading...</Typography>
          </Box>
        </Stack>
      </Layout>
    );
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
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ textAlign: "center", height: "calc(100vh - 60px)" }}
          py={{ xs: 8 }}
        >
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
            <CartTotals total={cartTotal} checkoutUrl={checkoutUrl} />
          </Container>
        </Box>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  const contactInfo = await fetchContactInfo();
  const socialMedia = await fetchSocialMedia();

  return {
    props: {
      contactInfo,
      socialMedia,
    },
  };
}
