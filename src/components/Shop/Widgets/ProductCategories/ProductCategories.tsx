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
import { MenuCollection } from "@/types";
import { useRouter } from "next/router";

type ProductCategoriesProps = {
  categories?: MenuCollection[];
};

export default function ProductCategories({
  categories,
}: ProductCategoriesProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter()
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
            <ListItemButton href={`/collections/${cat.handle}`}>
              <ListItemText primary={cat.title} />
              {/* {open ? <ExpandLess /> : <ExpandMore />} */}
            </ListItemButton>
          </>
        ))}
      </List>
    </Box>
  );
}
