import React from "react";
import { Box, Grid, Container, useTheme } from "@mui/material";
import TitleSection from "@/components/TitleSection/TitleSection";
import CircleTechnique from "@/components/CircleTechnique/CircleTechnique";
import type { CircleTechniqueProps } from "@/components/CircleTechnique/CircleTechnique";

type TechniquesProps = {
  techniques: CircleTechniqueProps[];
};

export default function Techniques({ techniques }: TechniquesProps) {
  const theme = useTheme();

  if(!techniques){
    return
  }

  return (
    <Box
      component={"section"}
      sx={{ padding: "3rem 1rem", backgroundColor: "#fafafa" }}
    >
      <Container>
        <Grid spacing={6} container justifyContent={"center"}>
          <Grid item xs={12}>
            <TitleSection title={"Techniques"} />
          </Grid>
          {techniques.map((tech, i) => (
            <Grid key={i} item xs={6} md={3}>
              <CircleTechnique
                title={tech.title}
                color={theme.palette.secondary.main}
                image={tech.image}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
