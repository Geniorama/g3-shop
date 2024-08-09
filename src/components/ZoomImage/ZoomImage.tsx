import { Box, IconButton } from "@mui/material";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

interface ZoomImageProps {
  src: string;
}

export default function ZoomImage({ src }: ZoomImageProps) {
  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      <img
        style={{ height: "100%", objectFit: "cover", width: "100%" }}
        src={src}
        alt=""
      />
      <IconButton sx={{ position: "absolute", bottom: "10px", right: "10px" }}>
        <ZoomOutMapIcon sx={{ color: "white", fontSize: "30px" }} />
      </IconButton>
    </Box>
  );
}
