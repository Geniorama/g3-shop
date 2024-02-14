import React from 'react';
import { Box, Container, Grid, Typography, Link, Stack, IconButton } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <Box component={'footer'} sx={{padding: '2rem', backgroundColor: '#252B42'}}>
        <Container>
            <Grid container spacing={{xs: 3, sm: 5, lg: 18}} justifyContent={'flex-start'}>
                {/* Widget */}
                <Grid sx={{color: 'white'}} item xs={6} sm={'auto'}>
                    <Typography sx={{fontSize: '12px', marginBottom: '10px'}}>
                        Navigation
                    </Typography>
                    <Box component={'ul'} sx={{fontSize: '10px', listStyle: 'none', lineHeight: '2em'}}>
                        <Box component={'li'}>
                            <Link href="/" sx={{color: 'white'}}>Home</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link href="/shop" sx={{color: 'white'}}>Shop</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link href="/about" sx={{color: 'white'}}>About</Link>
                        </Box>
                        <Box component={'li'}>
                            <Link href="/contact" sx={{color: 'white'}}>Contact</Link>
                        </Box>
                    </Box>
                </Grid>

                {/* Widget */}
                <Grid sx={{color: 'white'}} item xs={6} sm={'auto'}>
                    <Typography sx={{fontSize: '12px', marginBottom: '10px'}}>
                        Legal
                    </Typography>
                    <Box component={'ul'} sx={{fontSize: '10px', listStyle: 'none', lineHeight: '2em'}}>
                        <Box component={'li'}>
                            <Link href="/privacy-policy" sx={{color: 'white'}}>Privacy policy</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link href="/terms-and-conditions" sx={{color: 'white'}}>Terms & conditions</Link>
                        </Box>
                    </Box>
                </Grid>

                {/* Widget */}
                <Grid sx={{color: 'white'}} item xs={6} sm={'auto'}>
                    <Typography sx={{fontSize: '12px', marginBottom: '10px'}}>
                        Categories
                    </Typography>
                    <Box component={'ul'} sx={{fontSize: '10px', listStyle: 'none', lineHeight: '2em'}}>
                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Signs & Banners</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Custom T-Shirts</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Marketing material</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Design</Link>
                        </Box>
                    </Box>
                </Grid>

                {/* Widget */}
                <Grid sx={{color: 'white'}} item xs={6} sm={'auto'}>
                    <Typography sx={{fontSize: '12px', marginBottom: '10px'}}>
                        Company info
                    </Typography>
                    <Box component={'ul'} sx={{fontSize: '10px', listStyle: 'none', lineHeight: '2em'}}>
                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Phone: (123) 456 789</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Address: Street 123</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Email: info@g3print.com</Link>
                        </Box>
                    </Box>
                </Grid>

                {/* Widget */}
                <Grid sx={{color: 'white'}} item xs={6} sm={'auto'}>
                    <Typography sx={{fontSize: '12px', marginBottom: '10px'}}>
                        Follow Us
                    </Typography>
                    <Box component={'ul'} sx={{fontSize: '10px', listStyle: 'none', lineHeight: '2em'}}>
                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Facebook</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Instagram</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Pinterest</Link>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box component={'hr'} sx={{opacity: '.2', margin: '2rem 0'}}></Box>
            <Grid container alignItems={'center'} justifyContent={'space-between'}>
                <Grid item>
                   <Typography color={'white'} fontSize={'10px'}>
                     Made with love ❤ by <Link sx={{color: 'white'}}>G3 Digital Marketing</Link> | {new Date().getFullYear()} © All rights reserved
                    </Typography> 
                </Grid>

                <Grid item xs={12} lg={'auto'}>
                   <Stack direction={'row'} justifyContent={{xs: 'center'}}>
                     <IconButton color='secondary'>
                        <FacebookOutlinedIcon />
                     </IconButton>
                     <IconButton color='secondary'>
                        <InstagramIcon />
                     </IconButton>
                   </Stack>
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}
