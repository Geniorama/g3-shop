import { Box, Typography, CircularProgress } from "@mui/material";

export default function LoaderPage() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography>Loading page</Typography>
    </Box>
  );
}
