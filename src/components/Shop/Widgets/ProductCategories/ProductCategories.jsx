import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Collapse, ListItemButton, Divider } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export default function ProductCategories() {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box>
        <Typography fontWeight={'600'} component={'h5'} variant='h6'>
            Product Categories
        </Typography>
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            >
            <ListItemButton onClick={handleClick}>
                <ListItemText primary="Category" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Starred" />
                </ListItemButton>
                </List>
            </Collapse>
            <Divider />
            <ListItemButton>
                <ListItemText primary="Category" />
                <ExpandMore />
            </ListItemButton>
            <Divider />
            <ListItemButton>
                <ListItemText primary="Category" />
                <ExpandMore />
            </ListItemButton>
            <Divider />
            <ListItemButton>
                <ListItemText primary="Category" />
                <ExpandMore />
            </ListItemButton>
            <Divider />
            <ListItemButton>
                <ListItemText primary="Category" />
                <ExpandMore />
            </ListItemButton>
        </List>
    </Box>
  )
}
