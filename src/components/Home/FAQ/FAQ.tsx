import React from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
import TitleSection from '@/components/TitleSection/TitleSection';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export type Faq = {
    question: string,
    answer: string
}

export type FaqProps = {
    faqs: Faq[]
}

export default function FAQ({faqs}:FaqProps) {
  if(!faqs){
    return
  }

  return (
    <Box component={'section'} sx={{padding: '3rem 0'}}>
        <Container>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Box mb={{xs: 3}} sx={{maxWidth: '300px'}}>
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
                                    {item.question}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography fontSize={{xs: '13px', lg: '15px'}}>
                                            {item.answer}
                                        </Typography>
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
