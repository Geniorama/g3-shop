import React from "react";
import { Container, Grid, Box, Typography, Button } from "@mui/material";
import TitleSection from "@/components/TitleSection/TitleSection";
import ExampleImage from "@/assets/img/Layer_1.svg";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import GridProducts from "@/components/GridProducts/GridProducts";
import type { Product } from "@/types";

function CustomTabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ textAlign: "center" }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: string | number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type ExploreOurProductsProps = {
  products: Product[];
};

export default function ExploreOurProducts({
  products,
}: ExploreOurProductsProps) {

  return (
    <Box component={"section"} sx={{ padding: "3rem 1rem" }}>
      <Container>
        <Grid container>
          <TitleSection image={ExampleImage} title="Explore Our Products" />

          <Box sx={{ width: "100%", marginTop: "3em" }}>
            <GridProducts products={products} />

            <Box sx={{textAlign: 'center'}}>
              <Button href="/shop" variant="contained" color="secondary">
                View All Products
              </Button>
            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
