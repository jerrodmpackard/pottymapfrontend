import { Box, Divider, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useState } from 'react'
import { PiHeart, PiHeartDuotone } from "react-icons/pi";
import { GrShare } from 'react-icons/gr'
import RateTwo from './RateTwo';

interface MBAProps {
  mBAMenu: HTMLElement | null;
  setMBAMenu: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const MBathroomActionMenu = ({ mBAMenu, setMBAMenu }: MBAProps) => {

  const handleCloseBAMenu = () => {
    setMBAMenu(null)
  }

  // const [anchorRateMenuTwo, setAnchorRateMenuTwo] = useState<HTMLElement | null>(null);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false)
  const [liked, setLiked] = useState<boolean>(false)
  const [value, setValue] = useState<number | null>(0);

  const handleHeartClick = () => {
    setLiked(!liked)
  }


  return (
    <>
      <Menu
        anchorEl={mBAMenu}
        open={Boolean(mBAMenu)}
        onClose={handleCloseBAMenu}
        // onClick={handleCloseBAMenu}
      >
        {/* <Divider/> */}
        <Tooltip title={value === null || value < 0.5 ? "Rate Bathroom" : "View your rating"}>
          <RateTwo value={value} setValue={setValue}/>
        </Tooltip>
        <Divider/>
        <MenuItem onClick={handleHeartClick}>
          <ListItemIcon>
            {liked ? <PiHeartDuotone className="text-2xl" /> : <PiHeart className="text-2xl" /> }
          </ListItemIcon>
            {liked? "In favorites" : "Add to favorites"}  
        </MenuItem>

        <MenuItem onClick={() => {setIsShareOpen(true)}}>
          <ListItemIcon>
            <GrShare className="text-md"/>
          </ListItemIcon>
          Share
        </MenuItem>
      </Menu>
      <Box>

      </Box>
    </>
  )
}

export default MBathroomActionMenu
