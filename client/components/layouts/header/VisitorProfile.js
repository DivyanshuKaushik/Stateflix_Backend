import React from "react";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import {
  Box,
  Menu,
  Typography,
  Link,
  ListItemButton,
  List,
  ListItemText,
  Button,
  Divider,
  Stack,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { selectVisitor } from "../../../app/features/authSlice";
import DarkModeBtn from "../../utils/DarkModeBtn";
import API from '../../../services/API'
import { useRouter } from "next/router";

const VisitorProfile = ({visitor}) => {
    const router = useRouter()
    const theme = useTheme()
//   const visitor = useSelector(selectVisitor)
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const handleLogout = async() => {
    try{
        (await API.get('/auth/google/logout')).data
        window.location.href = '/'
        // router.push('/')
    }catch(err){
        console.log(err)
    }
  }
  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <Box display="flex" alignItems="center">
          <Image
            src={visitor.picture}
            alt="profile"
            width="30"
            height="30"
            className="roundedCircle"
          />
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <Typography
              color="textSecondary"
              variant="h5"
              fontWeight="400"
              sx={{ ml: 1 }}
            >
              Hi,
            </Typography>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                ml: 1,
              }}
              className="capitalize"
            >
              {visitor.name}
            </Typography>
            <FeatherIcon icon="chevron-down" width="20" height="20" />
          </Box>
        </Box>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={{
          "& .MuiMenu-paper": {
            width: "385px",
          },
        }}
      >
        <Box>
          <Box p={2} pt={0}>
            <List
              component="nav"
              aria-label="secondary mailbox folder"
              onClick={handleClose4}
            >
              <ListItemButton>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{width:"100%"}}>
                    <ListItemText primary="Mode" sx={{color: theme==="dark" ? "white":"black" }} />

                    <DarkModeBtn />
                </Stack>
              </ListItemButton>
              {/* <ListItemButton>
                <ListItemText primary="Account" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Change Password" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="My Settings" />
              </ListItemButton> */}
            </List>
          </Box>
          <Divider />
          <Box p={2}>
            <Link to="/">
              <Button fullWidth variant="contained" color="primary" onClick={handleLogout}>
                Logout
              </Button>
            </Link>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default VisitorProfile;
