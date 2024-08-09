import RocketLoader from "@/assets/img/rocket-loader.gif"
import { Box } from "@mui/material"
import { SxProps } from "@mui/material"

type LoaderProps = {
    sx?: SxProps
}

export default function Loader({sx}: LoaderProps) {
  return (
    <Box
        sx={sx}
        >
        <img style={{width: '100%', height: '100%'}} src={RocketLoader.src} alt="" />
    </Box>
  )
}
