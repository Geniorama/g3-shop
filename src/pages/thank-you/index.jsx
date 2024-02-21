import Layout from "@/components/Layout/Layout";
import { Box, Typography, Container, useTheme, Button, Link, Stack } from "@mui/material";
import IconThankYou from '@/assets/img/icon-g3-thank-you.png';

const metadata = {
    title: "Thank You",
    description: "Lorem ipsum",
};

export default function ThankYouPage() {
const theme = useTheme()

  return (
    <Layout
        metadata={metadata}
    >
    <Box 
        mt={{xs: '50px', md: '60px'}} 
        textAlign={'center'} 
        component={'section'}
        py={5}
        px={2}
        minHeight={'90vh'}
        sx={{
            display: 'grid',
            placeItems: 'center',
            backgroundColor: `${theme.palette.primary.dark}`
        }}
        
        >
        <Container>
            <img style={{width: '100%', maxWidth: '200px'}} src={IconThankYou.src} alt="" />
            <Typography
                fontSize={{xs:'30px', md: '70px'}}
                fontWeight={'bold'}
                color={'white'}
                lineHeight={'1em'}
            >THANK YOU!</Typography>
            <Typography
                fontSize={{xs:'15px', md: '30px'}}
                color={'#cccccc'}
            >We have received your order. We will contact you soon</Typography>
            <Stack mt={4} direction={{xs: 'column', md: 'row'}} alignItems={'center'} justifyContent={'center'} spacing={4}>
                <Link href="/" color={'#ffffff'}>Back to Home</Link>
                <Button variant="contained" color="secondary">
                    Rate us on Google
                </Button>
            </Stack>
        </Container>
    </Box>

    </Layout>
  )
}
