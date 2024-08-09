import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItemButton,
  Divider,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import type { Collection } from "shopify-buy";

type ProductCategoriesProps = {
  categories?: Collection[];
};

export default function ProductCategories({
  categories,
}: ProductCategoriesProps) {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box>
      <Typography fontWeight={"600"} component={"h5"} variant="h6">
        Product Categories
      </Typography>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {categories && categories.map((cat) => (
          <>
            <Divider />
            <ListItemButton onClick={handleClick}>
              <ListItemText primary={cat.title} />
              {/* {open ? <ExpandLess /> : <ExpandMore />} */}
            </ListItemButton>
          </>
        ))}
      </List>
    </Box>
  );
}
