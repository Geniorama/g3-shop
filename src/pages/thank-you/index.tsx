import Layout from "@/components/Layout/Layout";
import {
  Box,
  Typography,
  Container,
  useTheme,
  Button,
  Link,
  Stack,
} from "@mui/material";
import IconThankYou from "@/assets/img/icon-g3-thank-you.png";
import CommingSoon from "@/components/CommingSoon/CommingSoon";
import LoaderPage from "@/components/Loader/LoaderPage";
import useCommingSoon from "@/hooks/useCommingSoon";
import type { Entry } from "contentful";
import { fetchGeneralSettings } from "@/lib/dataFetchers";

const metadata = {
  title: "Thank You",
  description: "Lorem ipsum",
};

type ThankYouPageProps = {
  commingSoonMode: Entry;
};

export default function ThankYouPage({ commingSoonMode }: ThankYouPageProps) {
  const theme = useTheme();
  const { isCommingSoon, isLoadingPage } = useCommingSoon(
    commingSoonMode?.fields?.maintenanceMode as boolean
  );

  if (isLoadingPage) {
    return <LoaderPage />;
  }

  if (isCommingSoon) {
    return <CommingSoon />;
  }

  return (
    <Layout metadata={metadata}>
      <Box
        mt={{ xs: "50px", md: "60px" }}
        textAlign={"center"}
        component={"section"}
        py={5}
        px={2}
        minHeight={"90vh"}
        sx={{
          display: "grid",
          placeItems: "center",
          backgroundColor: `${theme.palette.primary.dark}`,
        }}
      >
        <Container>
          <img
            style={{ width: "100%", maxWidth: "200px" }}
            src={IconThankYou.src}
            alt=""
          />
          <Typography
            fontSize={{ xs: "30px", md: "70px" }}
            fontWeight={"bold"}
            color={"white"}
            lineHeight={"1em"}
          >
            THANK YOU!
          </Typography>
          <Typography fontSize={{ xs: "15px", md: "30px" }} color={"#cccccc"}>
            We have received your order. We will contact you soon
          </Typography>
          <Stack
            mt={4}
            direction={{ xs: "column", md: "row" }}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={4}
          >
            <Link href="/" color={"#ffffff"}>
              Back to Home
            </Link>
            <Button variant="contained" color="secondary">
              Rate us on Google
            </Button>
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps() {
  const commingSoonMode = await fetchGeneralSettings();

  return {
    props: {
      commingSoonMode,
    },
  };
}
