import { Logout, Settings } from '@mui/icons-material'
import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import { useRouter } from "next/navigation";
import React from 'react'

interface UserMenuProps {
    anchorUserMenu: HTMLElement | null;
    setAnchorUserMenu: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const UserMenu: React.FC<UserMenuProps> = ({ anchorUserMenu, setAnchorUserMenu }) => {


    const handleCloseUserMenu = () => {
        setAnchorUserMenu(null)
    }

    const router = useRouter();

    const handleLogout = () => {
        router.push("/")
        localStorage.clear()
    }
    
  return (
    <Menu
    anchorEl={anchorUserMenu}
    open={Boolean(anchorUserMenu)}
    onClose={handleCloseUserMenu}
    onClick={handleCloseUserMenu}
    >
        <MenuItem>
        <ListItemIcon>
            <Settings fontSize='small'/>
        </ListItemIcon>
            Profile
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

export default UserMenu