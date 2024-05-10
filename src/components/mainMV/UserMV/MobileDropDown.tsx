import { AddCircleOutline, Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react'

interface MobileMenuProps {
    mobileDropDown: HTMLElement | null;
    setMobileDropDown: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}


const MobileDropDown: React.FC<MobileMenuProps> = ({mobileDropDown, setMobileDropDown}) => {

    const handleCloseUserMenu = () => {
        setMobileDropDown(null)
    }

    const router = useRouter();

    const handleLogout = () => {
        router.push("/")
        localStorage.clear()
    }
    
  return (
    <Menu
    open={Boolean(mobileDropDown)}
    anchorEl={mobileDropDown}
    onClose={handleCloseUserMenu}
    onClick={handleCloseUserMenu}
    >
        <MenuItem>
        <ListItemIcon>
            <Settings fontSize='small'/>
        </ListItemIcon>
            Profile Page
        </MenuItem>

        <MenuItem>
        <ListItemIcon>
            <AddCircleOutline fontSize='small' />
        </ListItemIcon>
            Add a Bathroom
        </MenuItem>

        <MenuItem onClick={handleLogout}>
        <ListItemIcon>
            <Logout fontSize='small'/>
        </ListItemIcon>
            Logout
        </MenuItem>
    </Menu>
  )
}

export default MobileDropDown
