import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useState, useEffect } from "react";
import Logo from "../../../public/img/g3-logoRecurso 1.svg";
import Image from "next/image";
import { Link, useTheme, Modal, TextField, InputAdornment, Badge } from "@mui/material";
import { styled } from '@mui/material/styles';
import {RootState} from '../../store/index'
import { useSelector } from "react-redux";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import type { MenuCollection } from "@/types";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    fontSize: '10px'
  },
}));

// const menuItems:MenuCollection[] = [
//   {
//     id: '1',
//     title: "Business Cards",
//     handle: "business-cards",
//   },
//   {
//     title: "Flyers",
//     path: "/",
//   },
//   {
//     title: "Roll labels",
//     path: "/",
//   },
//   {
//     title: "Stickers",
//     path: "/",
//   },
//   {
//     title: "Signs & Banners",
//     path: "/category/signs-and-banners",
//     list: [
//       {
//         title: "",
//         path: "",
//       },
//     ],
//   },
//   {
//     title: "Custom T-Shirts",
//     path: "/",
//   },
//   {
//     title: "Marketing material",
//     path: "/",
//   },
//   {
//     title: "Design",
//     path: "/collections/design",
//   },
// ];



function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);
  const [menuCollection, setMenuCollection] = useState<MenuCollection[]>([])
  
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const router = useRouter()

  async function fetchMenuItems(){
    try {
       const res = await fetch('/api/menuCollections')
       if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
       const menuData = await res.json()
       setMenuCollection(menuData.collections)
    } catch (error) {
       console.error(error)
    }
  }

  useEffect(()=>{
    fetchMenuItems()
  },[])

  useEffect(() => {
    if(openSearch){
      document.body.style.overflow="hidden"
      document.body.style.height="100vh"
    } else {
      document.body.style.overflow="unset"
      document.body.style.height="unset"
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height="unset"
    };
  }, [openSearch])

  const theme = useTheme();

  const handleOpenNavMenu = (event:any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event:any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenSearch = () => setOpenSearch(true);
  const handleCloseSearch = () => setOpenSearch(false);
  const handleGoToCart = () => router.push('/cart')

  type AuxMenuItemsProps = {
    handleClick?: MouseEventHandler<HTMLButtonElement>,
    icon: React.ReactElement,
    name?: string
  }
  
  const auxMenuItems:AuxMenuItemsProps[] = [
    {
      name: 'search',
      handleClick: handleOpenSearch,
      icon: <SearchIcon />,
    },
    {
      name: "cart",
      icon: <ShoppingCartCheckoutIcon />,
      handleClick: handleGoToCart
    },
  ];

  return (
    <AppBar sx={{ background: "white" }} position="fixed">
      <Modal
        open={openSearch}
        onClose={handleCloseSearch}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backgroundColor: 'rgba(0,0,0,.9)'
        }}
        >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            // background: 'white',
            transform: 'translate(-50%, -50%)',
            padding: 5,
            width: '90%',
            maxWidth: '600px'
          }}
          >
          <TextField
            fullWidth
            placeholder="Search for ..."
            variant="standard"
            sx={{
              '& .MuiInput-underline:before': {
                borderBottomColor: 'white'
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'white'
              }
            }}
            InputProps={{
              style: {
                color: 'white',
                fontSize: '20px'
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton sx={{color: 'white', fontSize: '20px'}}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Modal>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/">
            <Image alt="log-g3" src={Logo} />
          </Link>

          <Box
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            justifyContent={"flex-end"}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {menuCollection && menuCollection.length > 0 && menuCollection.map((item, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link sx={{textDecoration: 'none'}} href={`/collections/${item.handle}`}>
                    <Typography textAlign="center">{item.title}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            justifyContent={"center"}
          >
            {menuCollection && menuCollection.length > 0 && menuCollection.map((item, index) => (
              <Link
                key={index}
                href={`/collections/${item.handle}`}
                underline="none"
                sx={{
                  padding: "1em",
                  margin: "0 1em",
                  fontWeight: "600",
                  position: "relative",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    width: "0",
                    height: "3px",
                    background: theme.palette.secondary.main,
                    bottom: "0",
                    left: "50%",
                    transition: ".5s",
                  },
                  "&:hover:before": {
                    width: "100%",
                    left: "0",
                  },
                  "&:hover": {
                    color: theme.palette.secondary.main,
                  },
                  fontSize: "13px",
                }}
              >
                {item.title}
              </Link>
            ))}
          </Box>

          {/* Menu icons desktop */}
          <Box display={{ xs: "none", md: "flex" }} sx={{ flexGrow: 0 }}>
            {auxMenuItems.map((item, index) => {
              return (
                <IconButton
                  onClick={item.handleClick}
                  color="secondary"
                  key={index}
                >
                  <StyledBadge badgeContent={item.name === "cart" ? cartItems?.length : null} color="primary">
                    {item.icon}
                  </StyledBadge >
                </IconButton>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
