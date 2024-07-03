import { Box, Typography } from "@mui/material"
import G3Logo from '../../assets/img/g3-logoRecurso 1.svg'

export default function CommingSoon() {
  return (
    <Box
        sx={{
            height: '100vh',
            width: '100vw',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            p:{xs: 3},
            textAlign: 'center'
        }}
        >
        <img style={{width: '180px'}} src={G3Logo.src} alt="" />
        <Typography 
            fontSize={'3rem'}
            fontWeight={'bold'}
            color={'primary'}
            lineHeight={'1em'}
            mt={{xs: 3}}
            >
            Comming Soon
        </Typography>
    </Box>
  )
}
