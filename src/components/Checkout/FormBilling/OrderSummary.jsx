import { Box, Typography, Badge, Stack, Divider } from '@mui/material';
import { numberToPrice } from '../../../helpers/helpers';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function OrderSummary() {
  const router = useRouter()
  useEffect(() => {
    const handleScroll = () => {
      if (window.screen.width > 900) {
        const orderSummary = document.getElementById('order-summary');
        const topSummary = orderSummary.getBoundingClientRect().top;

        if (window.scrollY >= topSummary) {
          orderSummary.style.position = 'fixed';
          orderSummary.style.top = '100px';
        } else {
          orderSummary.style.position = 'relative';
          orderSummary.style.top = '0px';
        }
      }
    };

    // Ejecutar la función cuando cambia la ruta
    handleScroll();

    // Agregar el evento de scroll al cargar la página
    window.addEventListener('scroll', handleScroll);

    // Limpiar el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [router.route]);

  return (
    <Box id="order-summary" sx={{transition: '.3s'}}>
        {/* Product items */}
        <Box>
            <Stack direction={'row'} spacing={3} alignItems={'center'}>
                <Badge badgeContent={4} color="primary">
                    <Image 
                    width={80}
                    height={80}
                    style={{objectFit: 'cover', borderRadius: '5%', border: '1px solid #ccc', boxSizing: 'border-box'}}
                    alt=''
                    src={'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
                </Badge>
                <Stack direction={'row'} alignItems={'center'} spacing={5} justifyContent={'space-between'}>
                    <Box>
                        <Typography>Name product</Typography>
                        <Typography color={'gray'} fontSize={{xs: '13px'}}>Lorem ipsum dolor sit amet.</Typography>
                    </Box>
                    <Typography fontSize={{xs: '14px'}}>{numberToPrice(13)}</Typography>
                </Stack>
            </Stack>
            <Divider sx={{my: {xs: 2}}}></Divider>
            <Stack direction={'row'} spacing={3} alignItems={'center'}>
                <Badge badgeContent={4} color="primary">
                    <Image 
                    width={80}
                    height={80}
                    style={{objectFit: 'cover', borderRadius: '5%', border: '1px solid #ccc', boxSizing: 'border-box'}}
                    alt=''
                    src={'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
                </Badge>
                <Stack direction={'row'} alignItems={'center'} spacing={5} justifyContent={'space-between'}>
                    <Box>
                        <Typography>Name product</Typography>
                        <Typography color={'gray'} fontSize={{xs: '13px'}}>Lorem ipsum dolor sit amet.</Typography>
                    </Box>
                    <Typography fontSize={{xs: '14px'}}>{numberToPrice(13)}</Typography>
                </Stack>
            </Stack>
            <Divider sx={{my: {xs: 2}}}></Divider>
            <Stack direction={'row'} spacing={3} alignItems={'center'}>
                <Badge badgeContent={4} color="primary">
                    <Image 
                    width={80}
                    height={80}
                    style={{objectFit: 'cover', borderRadius: '5%', border: '1px solid #ccc', boxSizing: 'border-box'}}
                    alt=''
                    src={'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} />
                </Badge>
                <Stack direction={'row'} alignItems={'center'} spacing={5} justifyContent={'space-between'}>
                    <Box>
                        <Typography>Name product</Typography>
                        <Typography color={'gray'} fontSize={{xs: '13px'}}>Lorem ipsum dolor sit amet.</Typography>
                    </Box>
                    <Typography fontSize={{xs: '14px'}}>{numberToPrice(13)}</Typography>
                </Stack>
            </Stack>
        </Box>

        {/* Resume price */}
        <Box my={{xs: 3}}>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontSize={{xs: '14px'}}>Subtotal</Typography>
                <Typography fontSize={{xs: '14px'}} component={'span'} fontWeight={'bold'}>{numberToPrice(10)}</Typography>
            </Stack>

            <Stack direction={'row'} justifyContent={'space-between'} mt={2}>
                <Typography fontSize={{xs: '14px'}}>Shipping</Typography>
                <Typography fontSize={{xs: '12px'}} component={'span'}>Enter shipping address</Typography>
            </Stack>

            <Stack direction={'row'} justifyContent={'space-between'} mt={2}>
                <Typography fontSize={{xs: '15px'}} fontWeight={'bold'}>TOTAL</Typography>
                <Typography fontSize={{xs: '15px'}} component={'span'}>
                    <Typography fontSize={{xs: '12px'}} component={'span'} color={'gray'} mr={1}>
                        USD
                    </Typography>
                    <Typography  fontWeight={'bold'} component={'span'}>
                        {numberToPrice(40)}
                    </Typography>
                </Typography>
            </Stack>
        </Box>
    </Box>
  )
}
