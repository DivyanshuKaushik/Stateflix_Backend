import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SideMenu from './SideMenu';
import { HiMenu } from 'react-icons/hi';
import { useTheme } from 'next-themes';

export default function DrawerMenu() {
    const theme= useTheme()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div className="dark:bg-[#151515]">
        <Box
        sx={{ width: 250, }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        >
        <SideMenu />
        </Box>

    </div>
  );

  return (
    // <div className='lg:hidden dark:bg-[#101010]'>
    <>
        <button className='outline-none border-none' onClick={toggleDrawer("left", true)}><HiMenu className='text-xl' /> </button>
        <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        sx={{width:"50%",px:1}}
        >
        {list("left")}
        </Drawer>

    </>
    // </div>
  );
}
