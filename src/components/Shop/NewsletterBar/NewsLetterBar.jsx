import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  FormControl,
  Stack,
  Button,
  useTheme,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function NewsLetterBar() {
  return (
    <Box component={"section"} sx={{ background: "#ffe4f2" }} py={{ xs: 7 }}>
      <Container>
        <Stack direction={{xs: "column", md: "row"}} justifyContent={"space-between"}>
          <Stack direction={"row"} alignItems={"center"} mb={{xs: 3, md: 0}}>
            <MailOutlineIcon sx={{ fontSize: "30px" }} />
            <Typography
              ml={{ xs: 1 }}
              fontSize={{ xs: "26px" }}
              fontWeight={"bold"}
            >
              Subscribe to Our Newsletter
            </Typography>
          </Stack>
          <Stack direction={{xs: "column", md: "row"}}>
            <TextField sx={{background: 'white', borderRadius: '5px 0px 0px 5px',
                '& fieldset':{
                    border: 'none', 
                },
                '@media screen and (max-width: 600px)':{
                    borderRadius: '5px'
                }
            }}  placeholder="Your Email" />
            <Button variant="contained" sx={{
                borderRadius: '0px 5px 5px 0px !important', 
                fontSize: '15px !important',
                '@media screen and (max-width: 600px)':{
                    borderRadius: '5px !important',
                    marginTop: '10px'
                }
                }}>Subscribe</Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
