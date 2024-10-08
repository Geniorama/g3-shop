import { Box, Typography, Grid, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { numberToPrice } from "../../../helpers/helpers";

type CartTotalsProps = {
  subtotal?: number;
  total?: number;
  checkoutUrl: string;
};

export default function CartTotals({ subtotal, total, checkoutUrl }: CartTotalsProps) {
  return (
    <Box>
      <Grid mt={{ xs: 7 }} container justifyContent={"flex-end"}>
        <Grid item xs={12} md={6}>
          <Typography fontWeight={"bold"} fontSize={{ xs: "20px" }}>
            CART TOTALS
          </Typography>
          <TableContainer sx={{ my: { xs: 3 } }}>
            <Table>
              <TableBody>
                {subtotal && (
                  <TableRow>
                    <TableCell>
                      <Typography fontSize={{ xs: "15px" }} fontWeight={"bold"}>
                        SUBTOTAL
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        fontSize={{ xs: "15px" }}
                        sx={{ textAlign: "right" }}
                      >
                        {numberToPrice(subtotal)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
                {total && (
                  <TableRow>
                    <TableCell>
                      <Typography fontSize={{ xs: "15px" }} fontWeight={"bold"}>
                        TOTAL
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        fontSize={{ xs: "15px" }}
                        sx={{ textAlign: "right" }}
                      >
                        {numberToPrice(total)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Button
            href="/shop"
            variant="outlined"
            size="large"
            sx={{
              mb: 1,
              width: '100%'
            }}
            >
            CONTINUE SHOPPING
          </Button>
          <Button
            href={checkoutUrl}
            size="large"
            variant="contained"
            color="secondary"
            sx={{ display: "block", width: "100%", textAlign: "center" }}
          >
            PROCEED TO CHECKOUT
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
