import {
  FormControl,
  TextField,
  Select,
  Grid,
  Box,
  Typography,
  InputLabel,
  MenuItem,
  Alert,
  Paper,
  Divider,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel
} from "@mui/material";
import { useForm } from "react-hook-form";

export default function FormBilling() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography fontWeight={"bold"} fontSize={{ xs: "25px" }}>
            CONTACT
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField label="Email" />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField label="Phone" />
          </FormControl>
        </Grid>

        {/* DELIVERY */}
        <Grid item xs={12} mt={{ xs: "30px" }}>
          <Typography fontWeight={"bold"} fontSize={{ xs: "25px" }}>
            DELIVERY
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="country-select-label">Country/Region</InputLabel>
            <Select
              labelId="country-select-label"
              id="country-select"
              label="Country/Region"
            >
              <MenuItem>United States</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField label="First name" />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField label="Last name" />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField label="Address" />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField label="Apartment, suite, etc. (optional)" />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <TextField label="City" />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="state-select-label">State</InputLabel>
            <Select
              labelId="state-select-label"
              id="state-select"
              label="State"
            >
              <MenuItem>United States</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <TextField label="ZIP code" />
          </FormControl>
        </Grid>

        <Grid item xs={12} mt={{ xs: 1 }}>
          <Typography fontWeight={"bold"}>Shipping method</Typography>

          <Alert sx={{ mt: { xs: 2 } }} severity="info">
            Enter your shipping address to view available shipping methods.
          </Alert>
        </Grid>

        <Grid item xs={12} mt={{ xs: "30px" }}>
          <Typography fontWeight={"bold"} fontSize={{ xs: "25px" }}>
            PAYMENT
          </Typography>

          <Paper sx={{ mt: { xs: 3 } }}>
            <Box p={{ xs: 3 }}>
              <Typography fontWeight={"bold"}>Credit Card</Typography>
            </Box>
            <Divider />
            <Grid
              p={{ xs: 3 }}
              spacing={2}
              sx={{ background: "#f5f3f3", margin:'0px', width: '100%' }}
              container
              justifyContent={'center'}
            >
              <Grid item sx={{paddingLeft: '0px !important'}} xs={12}>
                <FormControl fullWidth>
                  <TextField label={"Card number"} />
                </FormControl>
              </Grid>

              <Grid item sx={{paddingLeft: '0px !important'}} xs={12} md={6}>
                <FormControl fullWidth>
                  <TextField label={"Expiration date (MM/YY)"} />
                </FormControl>
              </Grid>

              <Grid item  xs={12} md={6}>
                <FormControl fullWidth>
                  <TextField label={"Security code"} type="password" />
                </FormControl>
              </Grid>
              <Grid item sx={{paddingLeft: '0px !important'}} xs={12}>
                <FormControl fullWidth>
                  <TextField label={"Name on card"} />
                </FormControl>
              </Grid>

              <Grid item sx={{paddingLeft: '0px !important'}} xs={12}>
                <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Use shipping address as billing address"/>
              </Grid>

              <Grid item sx={{paddingLeft: '0px !important'}} xs={12}>
                  <Button size="large" color="secondary" variant="contained" sx={{display: 'block', width: '100%'}}>
                    Pay Now
                  </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
