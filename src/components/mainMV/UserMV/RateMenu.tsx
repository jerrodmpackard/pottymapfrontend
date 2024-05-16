import { Menu, MenuItem } from '@mui/material';
import React from 'react'

interface UserRateProps {
    anchorRateMenu: HTMLElement | null;
    setAnchorRateMenu: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const RateMenu = ({anchorRateMenu, setAnchorRateMenu}: UserRateProps) => {

    const handleCloseRateMenu = () => {
        setAnchorRateMenu(null)
    }

  return (
    <Menu
    anchorEl={anchorRateMenu}
    open={Boolean(anchorRateMenu)}
    onClose={handleCloseRateMenu}
    onClick={handleCloseRateMenu}
    >
        <MenuItem>
            
        </MenuItem>
    </Menu>
  )
}

export default RateMenu
