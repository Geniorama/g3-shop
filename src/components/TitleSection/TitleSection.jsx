import React from 'react'
import { Box, Typography, Stack, useTheme } from '@mui/material';
import Image from 'next/image';


export default function TitleSection({image, title, textAlign}) {
  const theme = useTheme()
  console.log(textAlign)
  return (
    <Box sx={{textAlign: textAlign ? textAlign : 'center', margin: 'auto'}}>
        {image && (
            <Image width={70} height={70} src={image} alt=''/>
        )}
        
        <Stack sx={{justifyContent: 'center'}} direction={'horizontal'}>
            {(textAlign == 'left' || textAlign == undefined) && (
                <Stack direction={'horizontal'}>
                    <Box 
                        sx={{
                            display: 'inline-block',
                            width: '5px',
                            height: '100%',
                            backgroundColor: theme.palette.primary.main,
                            marginRight: '2px'
                        }} component={'span'}></Box>
                    <Box 
                        sx={{
                            display: 'inline-block',
                            width: '5px',
                            height: '100%',
                            backgroundColor: theme.palette.secondary.main
                        }} component={'span'}></Box>
                </Stack>
            )}

            <Typography component={'h2'} color={'primary'} variant='h6' sx={{fontWeight: 'bold', margin: '0 1rem', lineHeight: '1.2em'}}>
                {title}
            </Typography>

            {(textAlign == 'right' || textAlign == undefined) && (
                <Stack direction={'horizontal'}>
                    <Box 
                        sx={{
                            display: 'inline-block',
                            width: '5px',
                            height: '100%',
                            backgroundColor: theme.palette.primary.main,
                            marginRight: '2px'
                        }} component={'span'}></Box>
                    <Box 
                        sx={{
                            display: 'inline-block',
                            width: '5px',
                            height: '100%',
                            backgroundColor: theme.palette.secondary.main
                        }} component={'span'}></Box>
                </Stack>
            )}
        </Stack>
    </Box>
  )
}
