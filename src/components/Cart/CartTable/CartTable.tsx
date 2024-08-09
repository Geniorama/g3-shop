import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { numberToPrice } from "../../../helpers/helpers";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import type { ItemCart, Product } from "@/types";
import { useDispatch } from "react-redux";
import { removeItem } from "@/store/features/cartSlice";

import {
  Typography,
  IconButton,
  Box,
  Stack,
  TextField,
  Button,
  Grid,
} from "@mui/material";

type CartTableProps = {
  products: ItemCart[],
  onRemoveItem: (itemId: ItemCart["id"]) => void
};

export default function CartTable({ products, onRemoveItem }: CartTableProps) {
  const dispatch = useDispatch()

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>{/**IMAGE */}</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>PRODUCT</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>PRICE</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>QUANTITY</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>TOTAL</TableCell>
              <TableCell style={{ fontWeight: "bold" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {product.image && (
                  <TableCell component="th" scope="row">
                    <img style={{width: '70px', height: '70px', objectFit: 'cover'}} src={product.image.url} alt="" />
                  </TableCell>
                )}
                <TableCell>
                  <Typography
                    fontWeight={'bold'}
                    >
                    {product.title}
                  </Typography>
                  {product.selectedOptions && product.selectedOptions.map(option => (
                    <Box key={option.name} sx={{fontSize: '12px', paddingLeft: 2}} component={'ul'}>
                      <Box component={'li'}>
                        <Typography fontSize={'12px'} fontWeight={'600'} component={'span'}>{option.name}: </Typography>
                        <Typography fontSize={'12px'} component={'span'}>{option.value}</Typography>
                      </Box>
                    </Box>
                  ))}
                </TableCell>
                <TableCell>{numberToPrice(product.normalPrice)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{numberToPrice(product.normalPrice * product.quantity)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onRemoveItem(product.id)} sx={{ color: "red" }}>
                    <CloseIcon sx={{ fontSize: "13px", color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Grid container mt={{ xs: 3 }} >
        <Grid item xs={12} md={6}>
          <Stack direction={{xs: "column", md: "row"}}>
            <TextField
              size="small"
              label="Coupon code"
              sx={{
                background: "white",
                "& fieldset": {
                  borderRadius: "5px 0px 0px 5px",
                },
                "@media screen and (max-width: 600px)": {
                  borderRadius: "5px",
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                borderRadius: "0px 5px 5px 0px !important",
                fontSize: "12px !important",
                "@media screen and (max-width: 600px)": {
                  borderRadius: "5px !important",
                  marginTop: "10px",
                },
              }}
            >
              APPLY COUPON
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6} sx={{textAlign: 'right'}}>
            <Button size="large" variant="contained" sx={{borderRadius: '5px !important', fontSize: "12px !important", background: '#ccc', 
              '@media screen and (max-width: 600px)':{
                width: '100%',
                marginTop: '20px'
              }
              
              }}>
                UPDATE CART
            </Button>
        </Grid>
      </Grid> */}
    </Box>
  );
}
