import React from 'react';
import { Box, Container, Grid, Typography, Link, Stack, IconButton } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <Box component={'footer'} sx={{padding: '2rem', backgroundColor: '#252B42'}}>
        <Container>
            <Grid container spacing={8} justifyContent={'flex-start'}>
                {/* Widget */}
                <Grid sx={{color: 'white'}} item>
                    <Typography sx={{fontSize: '12px', marginBottom: '10px'}}>
                        Company info
                    </Typography>
                    <Box component={'ul'} sx={{fontSize: '10px', listStyle: 'none', lineHeight: '2em'}}>
                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>About Us</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Carrier</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Blog</Link>
                        </Box>
                    </Box>
                </Grid>

                {/* Widget */}
                <Grid sx={{color: 'white'}} item>
                    <Typography sx={{fontSize: '12px', marginBottom: '10px'}}>
                        Legal
                    </Typography>
                    <Box component={'ul'} sx={{fontSize: '10px', listStyle: 'none', lineHeight: '2em'}}>
                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Privacy policy</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Terms & conditions</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Warranty</Link>
                        </Box>
                    </Box>
                </Grid>

                {/* Widget */}
                <Grid sx={{color: 'white'}} item>
                    <Typography sx={{fontSize: '12px', marginBottom: '10px'}}>
                        Categories
                    </Typography>
                    <Box component={'ul'} sx={{fontSize: '10px', listStyle: 'none', lineHeight: '2em'}}>
                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Signs & Banner</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Carrier</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Blog</Link>
                        </Box>
                    </Box>
                </Grid>

                {/* Widget */}
                <Grid sx={{color: 'white'}} item>
                    <Typography sx={{fontSize: '12px', marginBottom: '10px'}}>
                        Company info
                    </Typography>
                    <Box component={'ul'} sx={{fontSize: '10px', listStyle: 'none', lineHeight: '2em'}}>
                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>About Us</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Carrier</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Blog</Link>
                        </Box>
                    </Box>
                </Grid>

                {/* Widget */}
                <Grid sx={{color: 'white'}} item>
                    <Typography sx={{fontSize: '12px', marginBottom: '10px'}}>
                        Company info
                    </Typography>
                    <Box component={'ul'} sx={{fontSize: '10px', listStyle: 'none', lineHeight: '2em'}}>
                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>About Us</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Carrier</Link>
                        </Box>

                        <Box component={'li'}>
                            <Link sx={{color: 'white'}}>Blog</Link>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box component={'hr'} sx={{opacity: '.2', margin: '2rem 0'}}></Box>
            <Grid container alignItems={'center'} justifyContent={'space-between'}>
                <Grid item>
                   <Typography color={'white'} fontSize={'10px'}>
                     Made with love by <Link sx={{color: 'white'}}>G3 Digital Marketing</Link> | {new Date().getFullYear()} © All rights reserved
                    </Typography> 
                </Grid>

                <Grid item>
                   <Stack direction={'horizontal'}>
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
