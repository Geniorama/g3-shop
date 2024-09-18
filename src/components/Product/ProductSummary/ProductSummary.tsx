import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Box,
  Typography,
  Stack,
  Button,
  Link,
  TextField,
  FormControl,
  Input,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { numberToPrice } from "../../../helpers/helpers";
import type { Product, ItemCart } from "@/types";
import { useState, ChangeEvent } from "react";
import { ProductVariant } from "@/types";
import { useRouter } from "next/router";
import AttachFileIcon from "@mui/icons-material/AttachFile";

type SharedLinksProps = {
  icon: React.ReactElement;
  name: string;
  url: string;
};

type ProductSummaryProps = {
  dataProduct: Product;
  onAddToCart: (item: ItemCart) => Promise<void>;
};

export default function ProductSummary({
  dataProduct,
  onAddToCart,
}: ProductSummaryProps) {
  const {
    title,
    description,
    normalPrice,
    slug,
    image,
    options,
    variants,
    type,
    isVariable,
  }: Product = dataProduct;

  const [file, setFile] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string | null | undefined>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const router = useRouter();

  const handleAddItem = (item: Product, quantity: number) => {
    const itemCart: ItemCart = {
      ...item,
      quantity,
      id: selectedVariant?.variantId || item.id,
      normalPrice: selectedVariant?.price || item.normalPrice,
      selectedOptions: selectedVariant?.selectedOptions,
      mediaUrl: fileUrl,
    };

    onAddToCart(itemCart);
    router.push("/cart");
  };


  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value); // Parse to number
    setQuantity(newQuantity);
  };


  const handleOptionChange = (optionName: string, value: string) => {
    // Actualiza el estado con la nueva opción seleccionada
    const updatedOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(updatedOptions);

    if (variants) {
      // Verifica la lógica de coincidencia de variantes
      const matchingVariant = variants.find((variant) => {
        // Verifica si todas las opciones seleccionadas coinciden con las opciones de la variante
        return variant.selectedOptions?.every((option) => {
          // Encuentra la opción correspondiente en las opciones seleccionadas
          const selectedValue = updatedOptions[option.name];
          return selectedValue === option.value; // Asegúrate de que esta comparación sea la correcta
        });
      });

      setSelectedVariant(matchingVariant || null);
    }
  };

  const sharedLinks: SharedLinksProps[] = [
    {
      icon: <FacebookOutlinedIcon sx={{ fontSize: "16px" }} />,
      name: "Facebook",
      url: `https://www.facebook.com/sharer.php?u=${process.env.NEXT_PUBLIC_SITE_URL}/product/${slug}`,
    },
    {
      icon: <PinterestIcon sx={{ fontSize: "16px" }} />,
      name: "Pinterest",
      url: `https://pinterest.com/pin/create/bookmarklet/?media=${image?.url}&url=${process.env.NEXT_PUBLIC_SITE_URL}/product/${slug}&description=${title}`,
    },
    {
      icon: <TwitterIcon sx={{ fontSize: "16px" }} />,
      name: "X",
      url: `https://twitter.com/share?url=${process.env.NEXT_PUBLIC_SITE_URL}/product/${slug}&text=${title}`,
    },
  ];

  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    if(value){
      setFile(value)
    }
  }

  return (
    <Box>
      <Typography
        component={"h2"}
        fontSize={{ xs: "30px" }}
        fontWeight={"bold"}
      >
        {title}
      </Typography>

      <Typography color={"secondary"} fontWeight={"bold"} component={"span"}>
        {numberToPrice(normalPrice)}
      </Typography>

      <Typography
        component={"p"}
        color={"text.primary"}
        fontSize={{ xs: "15px" }}
        my={{ xs: 3 }}
        dangerouslySetInnerHTML={{ __html: `${description}` }}
      />

      {type === "Upload Design" && (
        <Stack mb={3}>
          <TextField 
             onChange={(e) => handleChange(e)}
             label="Do you have a design?"
             type="text"
             placeholder="Enter your URL Design"
             helperText="Paste here your url from cloud. For example: Drive Google, One Drive, Dropbox, Mega, etc"
          />
        </Stack>
      )}

      {options && isVariable && (
        <Stack direction={"column"} gap={2} mb={{ xs: 2 }}>
          <Typography fontSize={"15px"} fontWeight={"600"}>
            Select the options:
          </Typography>
          {options.map((option) => (
            <FormControl key={option.id}>
              <InputLabel id={option.id}>{option.name}</InputLabel>
              <Select
                labelId={option.id}
                label={option.name}
                value={selectedOptions[option.name] || ""}
                defaultValue={""}
                onChange={(e) =>
                  handleOptionChange(option.name, e.target.value)
                }
              >
                <MenuItem selected disabled value={""}>
                  Select an option
                </MenuItem>
                {option.values.map((value) => (
                  <MenuItem value={value.value} key={value.value}>
                    {value.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </Stack>
      )}

      {selectedVariant && (
        <Typography mb={{ xs: 2 }}>
          <Typography fontWeight={"600"} component={"span"}>
            Subtotal:{" "}
          </Typography>
          <Typography component={"span"}>
            {numberToPrice(selectedVariant?.price * quantity)}{" "}
          </Typography>
        </Typography>
      )}
      <Stack gap={2} direction={"row"}>
        <FormControl>
          <TextField
            InputProps={{
              inputProps: { min: 0 },
            }}
            id="qty"
            // defaultValue={1}
            value={quantity}
            onChange={handleQuantityChange}
            type="number"
            sx={{
              width: "60px",
            }}
          />
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleAddItem(dataProduct, quantity)}
          disabled={quantity < 1 || selectedOptions === undefined}
        >
          Add to Cart
        </Button>
      </Stack>

      {/* METADATA */}
      <Stack mt={{ xs: 5 }} direction={"row"}>
        <Typography fontSize={{ xs: "13px" }} fontWeight={"bold"}>
          Categories:
        </Typography>
        <Box fontSize={{ xs: "13px" }} ml={{ xs: 1 }}>
          {dataProduct.collections &&
            dataProduct.collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.handle}`}
              >
                {collection.title}
              </Link>
            ))}
        </Box>
      </Stack>

      {/* <Stack mt={{ xs: 1 }} direction={"row"}>
        <Typography fontSize={{ xs: "13px" }} fontWeight={"bold"}>
          Tags:
        </Typography>
        <Box fontSize={{ xs: "13px" }} ml={{ xs: 1 }}>
          <Link>Tag1</Link> , <Link>Tag2</Link>, <Link>Tag3</Link>
        </Box>
      </Stack> */}

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
          {sharedLinks.map((link) => (
            <Link
              key={link.name}
              sx={{ lineHeight: "1em" }}
              target="_blank"
              href={link.url}
            >
              {link.icon}
            </Link>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
