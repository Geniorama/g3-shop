import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  Box,
  Typography,
  Stack,
  Button,
  Link,
} from "@mui/material";
import { numberToPrice } from "../../../helpers/helpers";

export default function ProductSummary({dataProduct}) {
  const { name, description, price } = dataProduct;
  return (
    <Box>
      <Typography
        component={"h2"}
        fontSize={{ xs: "30px" }}
        fontWeight={"bold"}
      >
        {dataProduct.name}
      </Typography>

      <Typography color={"secondary"} fontWeight={"bold"} component={"span"}>
        {numberToPrice(price)}
      </Typography>

      <Typography
        component={"p"}
        color={"text.primary"}
        fontSize={{ xs: "15px" }}
        my={{ xs: 3 }}
      >
        {description}
      </Typography>

      <Stack direction={"row"}>
        <Button variant="contained">Add to Cart</Button>
      </Stack>

      {/* METADATA */}
      <Stack mt={{ xs: 5 }} direction={"row"}>
        <Typography fontSize={{ xs: "13px" }} fontWeight={"bold"}>
          Categories:
        </Typography>
        <Typography fontSize={{ xs: "13px" }} ml={{ xs: 1 }}>
          <Link href="/">Cat1</Link> , <Link>Cat2</Link>, <Link>Cat3</Link>
        </Typography>
      </Stack>

      <Stack mt={{ xs: 1 }} direction={"row"}>
        <Typography fontSize={{ xs: "13px" }} fontWeight={"bold"}>
          Tags:
        </Typography>
        <Typography fontSize={{ xs: "13px" }} ml={{ xs: 1 }}>
          <Link>Tag1</Link> , <Link>Tag2</Link>, <Link>Tag3</Link>
        </Typography>
      </Stack>

      <Stack mt={{ xs: 1 }} direction={"row"} alignItems={"center"}>
        <Typography fontSize={{ xs: "13px" }} fontWeight={"bold"}>
          Share:
        </Typography>
        <Stack
          direction={"row"}
          spacing={2}
          ml={{ xs: 1 }}
          alignItems={"center"}
        >
          <Link sx={{ lineHeight: "1em" }} href="/">
            <FacebookOutlinedIcon sx={{ fontSize: "16px" }} />
          </Link>

          <Link sx={{ lineHeight: "1em" }}>
            <PinterestIcon sx={{ fontSize: "16px" }} />
          </Link>

          <Link sx={{ lineHeight: "1em" }}>
            <TwitterIcon sx={{ fontSize: "16px" }} />
          </Link>

          <Link sx={{ lineHeight: "1em" }}>
            <LinkedInIcon sx={{ fontSize: "16px" }} />
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
