import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function AppHeader() {

  const pages = [
    {
      name: "Home",
      link: "/"
    },
    {
      name: "About",
      link: ""
    }];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector(state => state.auth.user);

  const [isLoggedIn, setIsLoggedIn] = React.useState(user); 
  const navigate = useNavigate();

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
    <AppBar position="static" sx={{ backgroundColor: '#2F1B12' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src="/images/Stayora.png" width="80px" height="80px"/>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={()=>{handleCloseNavMenu(); navigate(`${page.link}`)}}>
                  <Typography sx={{ textAlign: "center" }}>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button key={page.name} onClick={()=>{handleCloseNavMenu(); navigate(`${page.link}`)}} sx={{ my: 2, color: "white" }}>
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 2 }}>
            {!isLoggedIn ? (
              <>
                <Tooltip title="Sign Up">
                  <IconButton color="inherit" onClick={()=> navigate("/signup")}>
                    <HowToRegIcon/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Sign In">
                  <IconButton color="inherit" onClick={()=> navigate("/signin")}>
                    <LoginIcon/>
                  </IconButton>
                </Tooltip>
              </>
            ): (
              <>
                 <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="User Avatar" src={user.profileImageUrl} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                       id="menu-appbar"
                      anchorEl={anchorElUser}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                   <MenuItem onClick={() => { handleCloseUserMenu(); navigate("/hotels/user"); }}>
                      <Typography sx={{ textAlign: "center" }}>Profile</Typography>
                   </MenuItem>
                   <MenuItem onClick={() => { handleCloseUserMenu(); setIsLoggedIn(false); }}>
                      <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                   </MenuItem>
                  </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppHeader;