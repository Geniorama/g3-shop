import React from "react";
import { Box, Typography, useTheme, Link } from "@mui/material";
import Image from "next/image";
import styles from "./CardProduct.module.css";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { formatCurrency } from "@/helpers";
import type { Product } from "@/types";

export default function CardProduct({
  title,
  salePrice,
  normalPrice,
  image,
  type,
  slug,
}: Product) {
  const dataExample = {
    image:
      "https://images.unsplash.com/photo-1525299374597-911581e1bdef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Custom T-shirt",
    sale_price: "20",
    normal_price: "30",
    type: "variable",
  };

  return (
    <Box data-aos="fade-up" className={styles.CardProduct}>
      <Box
        sx={{
          width: "100%",
          // height: "40vh",
          aspectRatio: "1",
          position: "relative",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Stack
          spacing={1}
          sx={{ position: "relative", zIndex: "2" }}
          direction={"row"}
          padding={1}
        >
          {salePrice && <Chip color={"secondary"} label="Sale" />}
          {/* <Chip color='primary' label="Sale" /> */}
          {/* <Chip color='primary' label="Sale" /> */}
        </Stack>
        {image && (
          <Link href={`/product/${slug}`}>
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                left: "0",
                top: "0",
              }}
              src={image.url}
              alt={image.altText}
            />
          </Link>
        )}
      </Box>
      <Box sx={{ textAlign: "center", padding: "1.5em" }}>
        <Link
          href={`/product/${slug}`}
          style={{ textDecoration: "none", color: "unset" }}
        >
          <Typography
            sx={{ fontWeight: "bold", fontSize: "20px" }}
            component={"h3"}
          >
            {title}
          </Typography>
        </Link>
        {type == "variable" && (
          <Typography color={"gray"} fontSize={"12px"}>
            from
          </Typography>
        )}

        <Stack direction={"row"} spacing={1} justifyContent={"center"}>
          {/* Sale price */}
          {salePrice && (
            <Typography
              color={"gray"}
              component={"span"}
              sx={{ fontSize: "15px", textDecoration: "line-through" }}
            >
              {formatCurrency(salePrice)}
            </Typography>
          )}

          {/* Normal price */}
          {normalPrice && (
            <Typography
              color={"secondary"}
              component={"span"}
              sx={{ fontSize: "15px" }}
            >
              {formatCurrency(normalPrice)}
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
