import { Box, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useState } from 'react'
import { PiStar, PiStarDuotone } from 'react-icons/pi'
import RateTwo from './RateTwo';

interface MBAProps {
  mBAMenu: HTMLElement | null;
  setMBAMenu: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const MBathroomActionMenu = ({ mBAMenu, setMBAMenu }: MBAProps) => {

  const handleCloseBAMenu = () => {
    setMBAMenu(null)
  }

  const [anchorRateMenuTwo, setAnchorRateMenuTwo] = useState<HTMLElement | null>(null);
  
  const [value, setValue] = useState<number | null>(0);


  return (
    <Menu
      anchorEl={mBAMenu}
      open={Boolean(mBAMenu)}
      onClose={handleCloseBAMenu}
      onClick={handleCloseBAMenu}
    >
      <Tooltip title={value === null || value < 0.5 ? "Rate Bathroom" : "View your rating"}>
        <RateTwo value={value} setValue={setValue}/>
      </Tooltip>

      <MenuItem >
        
        Favorite
      </MenuItem>

      <MenuItem >
        
        Share
      </MenuItem>
    </Menu>
  )
}

export default MBathroomActionMenu
