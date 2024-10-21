import React from "react";
import { Box, Grid, Container, Stack } from "@mui/material";
import TitleSection from "@/components/TitleSection/TitleSection";
import IconSection from "@/assets/img/Modo_de_aislamiento.svg";
import CardCategory from "../CardCategory/CardCategory";
import tshirt from "@/assets/img/t-shirt.png";
import mkting from "@/assets/img/mkting-material.png";
import type { CardCategoryProps } from "../CardCategory/CardCategory";

type ProductCategoriesProps = {
  title?: string;
  categories?: CardCategoryProps[];
};

export default function ProductCategories({
  title,
  categories,
}: ProductCategoriesProps) {
  return (
    <Box
      component={"section"}
      sx={{ padding: "3rem 1rem", backgroundColor: "#fafafa" }}
    >
      <Container>
        <TitleSection image={IconSection} title={title} />
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          gap={3}
          mt={4}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {categories?.map((cat, i) => (
            <Box key={i} sx={{ width: { xs: "100%", lg: "48%" } }}>
              <CardCategory
                buttonLink={cat.buttonLink}
                titleSmall={cat.titleSmall}
                title={cat.title}
                image={cat.image}
                buttonText={cat.buttonText}
              />
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
