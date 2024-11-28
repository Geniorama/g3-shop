import { Box, Typography, Container, Button, Stack } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import Image from '@/assets/img/rb_2151880552.png'
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function RateUs() {
  const {contactInfo} = useSelector((state:RootState) => state.general)

  return (
    <Box sx={{backgroundColor: '#F8F8F8', textAlign: 'center', py: {xs: 5}}}>
        <Container sx={{position: 'relative'}}>
            <Box data-aos="fade-up" sx={{maxWidth: {xs: '150px', lg: '320px'}, mx: {xs: 'auto', lg: 'unset'}, position: {lg: 'absolute'}, top: '-80px', left: '120px'}}>
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
            {contactInfo && contactInfo.locationLink && (
                <Button href={contactInfo?.locationLink} target="_blank" sx={{mt: {xs: 2}}} variant="contained" color="secondary">Comment Here</Button>
            )}
        </Container>
    </Box>
  )
}
