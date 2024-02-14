import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useState } from 'react';
import Logo from '../../../public/img/g3-logoRecurso 1.svg';
import Image from 'next/image';
import { Link, useTheme } from '@mui/material';

const menuItems = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Signs & Banners',
    path: '/category/signs-and-banners',
    list: [
      {
        title: '',
        path: ''
      }
    ]
  },
  {
    title: 'Custom T-Shirts',
    path: '/'
  },
  {
    title: 'Marketing material',
    path: '/'
  },
  {
    title: 'Design',
    path: '/'
  }
];


const auxMenuItems = [
  {
    title: 'Login / Register',
    path: '/',
    icon: <PersonOutlineIcon />
  },
  {
    path: '/',
    icon: <SearchIcon />
  },
  {
    path: '/cart',
    icon: <ShoppingCartCheckoutIcon />
  }
];



function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const theme = useTheme()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar sx={{background: 'white'}} position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/">
            <Image alt='log-g3' src={Logo} />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {auxMenuItems.map((item, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{item.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} justifyContent={'center'}>
            {menuItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.path}
                underline='none'
                sx={{
                  padding: '1em',
                  margin: '0 1em',
                  fontWeight: '600',
                  position: 'relative',
                  '&:before':{
                    content: '""',
                    position: 'absolute',
                    width: '0',
                    height: '3px',
                    background: theme.palette.secondary.main,
                    bottom: '0',
                    left: '50%',
                    transition: '.5s'
                  },
                  '&:hover:before':{
                    width: '100%',
                    left: '0',
                  },
                  '&:hover':{
                    color: theme.palette.secondary.main
                  }
                }}
                >
                {item.title}
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {auxMenuItems.map((item, index) => {
              return(
                <IconButton href={item.path} color='secondary' key={index}>
                  {item.icon}
                </IconButton>
              )
            })}
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;