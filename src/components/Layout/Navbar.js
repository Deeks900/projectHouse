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
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import { NavLink } from "react-router-dom";
import {signOut, deleteAccount} from './../../store/actions';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";

const pages = [{name:"Submit Project", url:'/create'}, {name:"About", url:'/about'}];

function Navbar() {
  const firebase = useFirebase();
  const firestore = useFirestore();
const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleSignOut = async()=>{
    console.log("I am handle sign out");
    let result = await signOut()(firebase, dispatch);
    console.log("I am the result after signing out");
  }

  const handleDelete = async()=>{
    console.log("I ma handle deltee");
    let result = await deleteAccount()(firebase, firestore, dispatch);
  }

  const settings = [{name:'Logout', functionCall:handleSignOut}, {name:"Delete Account", functionCall:handleDelete}];

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
    <AppBar position="static" style={{backgroundColor:'#50DBB4', height:{md:'9vh',lg:'12vh'}}}>
      <Container>
        <Toolbar sx={{ height:'9vh', minHeight:'9vh', maxHeight:'9vh'}} disableGutters>
          <StoreMallDirectoryIcon fontSize='large' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr:{sm:-45, md:-42, lg:-15},
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Berkshire Swash',
              fontWeight: 700,
              fontSize: 30,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ProjectStore
          </Typography>

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
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <NavLink to={page.url} style={{textDecoration:'none'}}><Typography sx={{fontFamily: 'Black Ops One'}} textAlign="center">{page.name}</Typography></NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <StoreMallDirectoryIcon fontSize='large' sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Berkshire Swash',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ProjectStore
          </Typography>
          <Box style={{marginLeft: 600}} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft:{md:0} }}>
            {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <NavLink style={{textDecoration:'none'}} to={page.url}><Typography sx={{fontFamily:'Cormorant', color:'white', fontSize:20, marginRight:6}} textAlign="center">{page.name}</Typography></NavLink>
                </MenuItem>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography onClick={setting.functionCall} textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
