import {
  Box,
  Grid,
  Container,
  Typography,
  Breadcrumbs,
  Link,
} from "@mui/material";

type ProductHeadingProps = {
  title?: string,
  cover?: string
}

export default function ProductHeading({title, cover}:ProductHeadingProps) {
  const defaultImage = 'https://plus.unsplash.com/premium_photo-1661768208245-14edc8f71585?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  return (
    <Box
      sx={{
        backgroundImage: `url(${cover ? cover : defaultImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          background: "black",
          opacity: "30%",
          width: "100%",
          height: "100%",
          left: "0",
          top: "0",
        },
      }}
    >
      <Container sx={{ position: "relative" }}>
        <Box
          sx={{
            pt: { xs: 6, lg: 22},
            pb: { xs: 4, lg: 12},
            textAlign: "center",
          }}
        >
          <Typography 
            fontSize={{xs: "40px", md: "60px"}} 
            fontWeight={"bold"} 
            color={"white"}
            lineHeight={'1em'}
            component={'h1'}
            >
            {title}
          </Typography>

          <Box display={'flex'} justifyContent={'center'} sx={{py: {xs: 2}}}>
            <Breadcrumbs sx={{color: 'white'}} aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                Home
                </Link>
                <Link underline="hover" color="inherit" href="/shop">
                Shop
                </Link>
                <Typography color="#ccc">{title}</Typography>
            </Breadcrumbs>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
