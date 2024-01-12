import React from 'react';
import { Box, Grid, Container, Typography, Button } from '@mui/material';
import TitleSection from '@/components/TitleSection/TitleSection';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
    {
        title: "Question 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices sit amet nulla eget elementum. Aliquam pulvinar pulvinar enim ac venenatis. Fusce eget auctor nisi. Nulla facilisi. Suspendisse accumsan sagittis pellentesque. Nunc volutpat euismod libero, non maximus metus suscipit ut. Quisque faucibus pulvinar urna convallis vestibulum. Suspendisse potenti."
    },

    {
        title: "Question 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices sit amet nulla eget elementum. Aliquam pulvinar pulvinar enim ac venenatis. Fusce eget auctor nisi. Nulla facilisi. Suspendisse accumsan sagittis pellentesque. Nunc volutpat euismod libero, non maximus metus suscipit ut. Quisque faucibus pulvinar urna convallis vestibulum. Suspendisse potenti."
    },

    {
        title: "Question 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices sit amet nulla eget elementum. Aliquam pulvinar pulvinar enim ac venenatis. Fusce eget auctor nisi. Nulla facilisi. Suspendisse accumsan sagittis pellentesque. Nunc volutpat euismod libero, non maximus metus suscipit ut. Quisque faucibus pulvinar urna convallis vestibulum. Suspendisse potenti."
    },

    {
        title: "Question 4",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices sit amet nulla eget elementum. Aliquam pulvinar pulvinar enim ac venenatis. Fusce eget auctor nisi. Nulla facilisi. Suspendisse accumsan sagittis pellentesque. Nunc volutpat euismod libero, non maximus metus suscipit ut. Quisque faucibus pulvinar urna convallis vestibulum. Suspendisse potenti."
    }
];

export default function FAQ() {
  return (
    <Box component={'section'} sx={{padding: '3rem 0'}}>
        <Container>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Box sx={{maxWidth: '300px'}}>
                        <TitleSection 
                            title={'General Frequently Asked Questions'}
                            textAlign={'left'}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box>

                        {faqs.map((item, index)=> {
                            return(
                                <Accordion key={index}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                    >
                                    {item.title}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}
