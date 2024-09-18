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
import { useState, useRef, ChangeEvent } from "react";
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

  const [hasFile, setHasFile] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null | undefined>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

  const handleUpload = async () => {
    if (!file) return;

    const { name, type } = file;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", name);
    formData.append("fileType", type);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Upload response:", result);

      if (result) {
        const { uploadURL } = result;

        if (uploadURL) {
          const uploadResponse = await fetch(uploadURL, {
            method: "PUT",
            headers: {
              "Content-Type": type,
            },
            body: file,
          });

          console.log("up response", uploadResponse);

          if (uploadResponse.ok) {
            alert("Archivo subido exitosamente");
          } else {
            alert("Failed to upload file");
          }
        } else {
          alert("No upload URL received");
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value); // Parse to number
    setQuantity(newQuantity);
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
      setHasFile(true);
      setFile(file); // Guardar el nombre del archivo para mostrarlo en el UI
    }
  };

  const handleRemoveFile = () => {
    setHasFile(false);
    setFile(null); // Limpiar el nombre del archivo
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Limpiar el input de archivo
    }
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
          <Typography fontSize={"15px"} fontWeight={"600"}>
            Do you have a design?
          </Typography>

          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            onClick={handleFileInputClick}
            sx={{
              border: "1px dashed",
              borderColor: "indigo",
              padding: 2,
              textAlign: "center",
              my: 2,
              cursor: "pointer",
              backgroundColor: hasFile ? "indigo" : "white",
            }}
          >
            <AttachFileIcon
              sx={{
                color: hasFile ? "white" : "indigo",
              }}
            />
            <Typography
              fontWeight={"600"}
              fontSize={"15px"}
              color={hasFile ? "white" : "indigo"}
            >
              {hasFile ? "Change file" : "Click to select your file"}
            </Typography>
          </Stack>
          {hasFile && (
            <Stack
              direction={"row"}
              sx={{
                textAlign: "center",
                fontSize: "13px",
                gap: 1,
                justifyContent: "center",
              }}
            >
              <Link
                sx={{
                  color: "red",
                  textDecorationColor: "red",
                  cursor: "pointer",
                }}
                onClick={handleRemoveFile}
              >
                Remove file
              </Link>

              <Link
                sx={{
                  color: "green",
                  cursor: "pointer",
                }}
                onClick={handleUpload}
              >
                Confirm upload file
              </Link>
            </Stack>
          )}
          <input
            ref={fileInputRef}
            onChange={handleFileChange}
            type="file"
            name=""
            id=""
            style={{ display: "none" }}
            accept=".jpg,.jpeg,.png,.pdf"
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
