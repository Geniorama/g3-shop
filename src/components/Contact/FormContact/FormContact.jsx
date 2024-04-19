import {
  TextField,
  Grid,
  Box,
  Button,
  Stack,
  Checkbox,
  Typography,
  Link,
} from "@mui/material";

export default function FormContact() {
  return (
    <Box>
      <Stack direction={{xs: "column", md: "row"}} spacing={2}>
        <TextField label="Name" placeholder="Your Name" sx={{ width: {xs: "100%", md: "50%"} }} />

        <TextField
          label="Email"
          placeholder="Your Email"
          sx={{ width: {xs: "100%", md: "50%"} }}
        />
      </Stack>

      <TextField
        label="Phone"
        placeholder="Your Phone"
        sx={{ width: "100%", my: { xs: 2 } }}
      />

      <TextField
        label="Message"
        multiline
        placeholder="Your comments"
        sx={{ width: "100%" }}
        rows={5}
      />

      <Typography lineHeight={'1em'} fontSize={'12px'} my={2}>
        By clicking &quot;<b>SEND MESSAGE</b>&quot;, you agree to our <Link position={'relative'} display={'inline-block'} href="/privacy-policy" target="_blank">data processing policies</Link>.
      </Typography>

      <Button variant="contained" color="secondary">SEND MESSAGE</Button>
    </Box>
  );
}
