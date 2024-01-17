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
        title: "What payment methods do you accept?",
        description: "We accept credit/debit cards (Visa, MasterCard, American Express) and secure methods like PayPal. We ensure secure transactions for your peace of mind."
    },

    {
        title: "How long does it take for my order to arrive?",
        description: "The delivery time varies based on your location. Typically, orders are processed within 1-2 business days, and shipping time can range from 3-7 business days. We'll provide you with a tracking number so you can monitor your package."
    },

    {
        title: "Can I make changes or returns?",
        description: "Yes, we accept changes and returns for non-customized products. Please check our return policy for more details and follow the instructions to initiate the process."
    },

    {
        title: "Do you offer international shipping?",
        description: "Yes! We offer international shipping to various countries. When making payment, select your country to find out shipping costs and estimated delivery times."
    },

    {
        title: "How can I track my order?",
        description: "Once your order is shipped, you will receive an email with a tracking link. You can click on that link or enter the tracking number on our tracking page to get real-time updates."
    },

    {
        title: "Can I personalize my products?",
        description: "Absolutely! We provide customization options for many of our products. Simply select the customization option when making your purchase and follow the provided instructions. Make sure to review the preview before confirming your order."
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
                                    {item.description}
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
