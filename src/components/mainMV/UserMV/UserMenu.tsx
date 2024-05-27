import { Logout, Settings } from '@mui/icons-material'
import { ListItemIcon, Menu, MenuItem, Typography } from '@mui/material'
import { useRouter } from "next/navigation";
import React from 'react'

interface UserMenuProps {
    anchorUserMenu: HTMLElement | null;
    setAnchorUserMenu: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }: UserMenuProps) => {


    const handleCloseUserMenu = () => {
        setAnchorUserMenu(null)
    }

    const router = useRouter();

    const handleLogout = () => {
        router.push("/")
        localStorage.removeItem("Token")
        localStorage.removeItem("Username")
    }

    const handleProfile = () => {
        router.push('/Pages/ProfileView')
    }
    
  return (
    <Menu
    anchorEl={anchorUserMenu}
    open={Boolean(anchorUserMenu)}
    onClose={handleCloseUserMenu}
    onClick={handleCloseUserMenu}
    >
        <MenuItem className="flex items-center">
            <ListItemIcon>
                <Settings fontSize='small'/>
            </ListItemIcon>
            Profile
        </MenuItem>
        <MenuItem onClick={handleLogout} className="flex items-center">
            <ListItemIcon>
                <Logout fontSize='small' color="error"/>
            </ListItemIcon>
            <Typography color="error">
                Logout
            </Typography>
        </MenuItem>
    </Menu>
  )
}

export default UserMenu