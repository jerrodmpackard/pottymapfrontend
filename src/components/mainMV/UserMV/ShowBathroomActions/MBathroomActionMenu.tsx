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

  //opens the share modal
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false)

  //adds to favorites
  const [liked, setLiked] = useState<boolean>(false)


  //rating
  const [value, setValue] = useState<number | null>(0);
  const [open, setOpen] = useState<boolean>(false)
 
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
        
        
        <MenuItem onClick={handleHeartClick}>
          <ListItemIcon>
            {liked ? <PiHeartDuotone className="ml-1 text-3xl" /> : <PiHeart className="ml-1 text-3xl" /> }
          </ListItemIcon>
            {liked? "In favorites" : "Add to favorites"}  
        </MenuItem>

        
        <RateTwo value={value} setValue={setValue} open={open} setOpen={setOpen} />
        

        <MenuItem onClick={() => {setIsShareOpen(true)}}>
          <ListItemIcon>
            <GrShare className="text-2xl ml-2"/>
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
