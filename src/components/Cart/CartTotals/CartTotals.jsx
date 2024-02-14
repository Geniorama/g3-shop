import { Box, Typography, Grid, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { numberToPrice } from "../../../helpers/helpers";

export default function CartTotals() {
  return (
    <Box>
      <Grid mt={{ xs: 7 }} container justifyContent={"flex-end"}>
        <Grid item xs={12} md={6}>
          <Typography fontWeight={"bold"} fontSize={{ xs: "20px" }}>
            CART TOTALS
          </Typography>
          <TableContainer sx={{my:{xs: 3}}}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Typography fontSize={{xs: '15px'}} fontWeight={'bold'}>
                                SUBTOTAL
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontSize={{xs: '15px'}} sx={{textAlign: 'right'}}>
                               {numberToPrice(290)}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography fontSize={{xs: '15px'}} fontWeight={'bold'}>
                                TOTAL
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography fontSize={{xs: '15px'}} sx={{textAlign: 'right'}}>
                               {numberToPrice(290)}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
          </TableContainer>
          
          <Button href="/checkout" size="large" variant="contained" color="secondary" sx={{display: 'block', width: '100%', textAlign: 'center'}}>
            PROCEED TO CHECKOUT
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
