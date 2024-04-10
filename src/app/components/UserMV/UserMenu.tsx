
import { useValue } from '@/context/ContextProvider';
import { Logout, Settings } from '@mui/icons-material'
import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import React from 'react'

interface UserMenuProps {
    anchorUserMenu: HTMLElement | null;
    setAnchorUserMenu: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const UserMenu: React.FC<UserMenuProps> = ({ anchorUserMenu, setAnchorUserMenu }) => {
    const{dispatch} = useValue();

    const handleCloseUserMenu = () => {
        setAnchorUserMenu(null)
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
        <MenuItem onClick={() => dispatch({type:'UPDATE_USER', payload:null})}>
        <ListItemIcon>
            <Logout fontSize='small'/>
        </ListItemIcon>
            Logout
        </MenuItem>
    </Menu>
  )
}

export default UserMenu