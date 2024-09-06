import { Box, Typography, Container, Button, Stack } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import Image from '@/assets/img/icon-rate-us.svg'

export default function RateUs() {
  return (
    <Box sx={{backgroundColor: '#F8F8F8', textAlign: 'center', py: {xs: 5}}}>
        <Container sx={{position: 'relative'}}>
            <Box data-aos="fade-up" sx={{maxWidth: {xs: '150px', lg: '280px'}, mx: {xs: 'auto', lg: 'unset'}, position: {lg: 'absolute'}, top: '0', left: '80px'}}>
                <img style={{width: '100%'}} src={Image.src} alt="" />
            </Box>
            <Typography
                color={'primary'}
                sx={{
                    fontSize: {xs: '50px'},
                    fontWeight: 'bold'
                }}
                >Rate Us</Typography>
            <Stack direction={'row'} justifyContent={'center'} gap={2} mb={{xs: 2}}>
                {[1,2,3,4,5].map((star) => (
                    <StarIcon sx={{color: '#ffc81d', fontSize: '30px'}} key={star} />
                ))}
            </Stack>
            <Typography sx={{fontSize: {xs: '20px'}}}>In Google Reviews</Typography>
            <Button href="https://maps.app.goo.gl/4zA87HhfrKAFc5RB7" target="_blank" sx={{mt: {xs: 2}}} variant="contained" color="secondary">Comment Here</Button>
        </Container>
    </Box>
  )
}
