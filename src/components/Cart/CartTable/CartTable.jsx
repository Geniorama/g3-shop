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
import {
  Typography,
  IconButton,
  Box,
  Stack,
  TextField,
  Button,
  Grid,
} from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", "Business cards", 6.0, 2, 4.0),
  createData("Ice cream sandwich", "Pop material", 9.0, 37, 4.3),
  createData("Banner", "Banner", 16.0, 24, 6.0),
];

export default function CartTable() {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>IMAGE</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>PRODUCT</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>PRICE</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>QUANTITY</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>TOTAL</TableCell>
              <TableCell style={{ fontWeight: "bold" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Image
                    width={70}
                    height={70}
                    alt=""
                    src={
                      "https://images.unsplash.com/photo-1495846414472-6696652d955f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                  />
                </TableCell>
                <TableCell>
                  <ul>
                    <span
                      style={{ display: "inline-block", marginBottom: "10px" }}
                    >
                      Product name
                    </span>
                    <li>
                      <b>Color:</b>
                      <span> Red</span>
                    </li>
                    <li>
                      <b>Size:</b>
                      <span> Small</span>
                    </li>
                  </ul>
                </TableCell>
                <TableCell>{numberToPrice(row.fat)}</TableCell>
                <TableCell>{row.carbs}</TableCell>
                <TableCell>{numberToPrice(row.fat * row.carbs)}</TableCell>
                <TableCell>
                  <IconButton sx={{ color: "red" }}>
                    <CloseIcon sx={{ fontSize: "13px" }} color="red" />
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
