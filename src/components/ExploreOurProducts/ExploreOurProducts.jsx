import React from 'react';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import TitleSection from '@/components/TitleSection/TitleSection';
import ExampleImage from '../../../public/img/Layer_1.svg';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CardProduct from '@/components/CardProduct/CardProduct';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{textAlign: 'center'}}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={'span'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function ExploreOurProducts() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box component={'section'} sx={{padding: '3rem 1rem'}}>
        <Container>
            <Grid container>
                <TitleSection
                    image={ExampleImage}
                    title="Explore Our Products"
                />

                <Box sx={{ width: '100%', marginTop: '3em' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Item One" {...a11yProps(0)} />
                        <Tab label="Item Two" {...a11yProps(1)} />
                        <Tab label="Item Three" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={4} lg={3}>
                            <CardProduct />
                          </Grid>
                          <Grid item xs={12} md={4} lg={3}>
                            <CardProduct />
                          </Grid>
                          <Grid item xs={12} md={4} lg={3}>
                            <CardProduct />
                          </Grid>
                          <Grid item xs={12} md={4} lg={3}>
                            <CardProduct />
                          </Grid>
                          <Grid item xs={12} md={4} lg={3}>
                            <CardProduct />
                          </Grid>
                          <Grid item xs={12} md={4} lg={3}>
                            <CardProduct />
                          </Grid>
                          <Grid item xs={12} md={4} lg={3}>
                            <CardProduct />
                          </Grid>
                          <Grid item xs={12} md={4} lg={3}>
                            <CardProduct />
                          </Grid>
                        </Grid>

                        <Button variant='contained' color='secondary'>
                          View All Products
                        </Button>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        Item Two
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Item Three
                    </CustomTabPanel>
                </Box>
            </Grid>
        </Container>
    </Box>
  )
}
