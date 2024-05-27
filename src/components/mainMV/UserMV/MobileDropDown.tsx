import { AddCircleOutline, Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react'

interface MobileMenuProps {
    mobileDropDown: HTMLElement | null;
    setMobileDropDown: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    isModalOpen: boolean;
    setIsModalOpen: any;
}


const MobileDropDown = ({mobileDropDown, setMobileDropDown, isModalOpen, setIsModalOpen}: MobileMenuProps) => {

    const handleCloseUserMenu = () => {
        setMobileDropDown(null);
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const router = useRouter();

    const handleLogout = () => {
        router.push("/");
        localStorage.removeItem("Token")
        localStorage.removeItem("Username")
    }

    const handleProfile = () => {
        router.push('/Pages/ProfileView')
    }
    
  return (
    <Menu
    open={Boolean(mobileDropDown)}
    anchorEl={mobileDropDown}
    onClose={handleCloseUserMenu}
    onClick={handleCloseUserMenu}
    >
        <MenuItem onClick={handleProfile}>
        <ListItemIcon>
            <Settings fontSize='small'/>
        </ListItemIcon>
            Profile Page
        </MenuItem>

        <MenuItem onClick={handleOpenModal}>
        <ListItemIcon>
            <AddCircleOutline fontSize='small' />
        </ListItemIcon>
            Add a Bathroom
        </MenuItem>

        <MenuItem onClick={handleLogout} color="error">
        <ListItemIcon>
            <Logout fontSize='small'/>
        </ListItemIcon>
            Logout
        </MenuItem>
    </Menu>
  )
}

export default MobileDropDown
