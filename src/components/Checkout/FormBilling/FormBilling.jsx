import { FormControl, TextField, Select, Grid, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

export default function FormBilling() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography fontWeight={'bold'} fontSize={{xs: '25px'}}>
              CONTACT
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField 
              label="First name"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <TextField 
              label="Last name"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField 
              label="Email"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField 
              label="Phone"
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} mt={{xs: '30px'}}>
          <Typography fontWeight={'bold'} fontSize={{xs: '25px'}}>
              DELIVERY
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
