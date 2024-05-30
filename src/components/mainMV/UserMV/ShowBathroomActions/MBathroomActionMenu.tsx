import { Box, Divider, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import React, { useState } from 'react'
import { PiHeart, PiHeartDuotone, PiHeartFill } from "react-icons/pi";
import { GrShare } from 'react-icons/gr'
import RateTwo from './RateTwo';
import ShareTwo from './ShareTwo';

interface MBAProps {
  mBAMenu: HTMLElement | null;
  setMBAMenu: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  inFav: boolean;
  handleAddFavorite: any;
}

const MBathroomActionMenu = ({ mBAMenu, setMBAMenu, inFav, handleAddFavorite }: MBAProps) => {

  const handleCloseBAMenu = () => {
    setMBAMenu(null)
  }

  //opens the share modal
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false)
 

  //rating
  const [value, setValue] = useState<number | null>(0);
  const [open, setOpen] = useState<boolean>(false)
 


  return (
    <>
      <Menu
        anchorEl={mBAMenu}
        open={Boolean(mBAMenu)}
        onClose={handleCloseBAMenu}
        // onClick={handleCloseBAMenu}
      >
        <MenuItem onClick={handleAddFavorite}>
          <ListItemIcon>
            {inFav ? (<PiHeartFill className='text-3xl text-red-600 ml-1' />) : (<PiHeart className='text-3xl text-red-600 ml-1' />)}
          </ListItemIcon>
            {inFav ? "In favorites" : "Add to favorites"}  
        </MenuItem>

        <RateTwo value={value} setValue={setValue} open={open} setOpen={setOpen} />

        <MenuItem onClick={() => {setIsShareOpen(true)}}>
          <ListItemIcon>
            <GrShare className="text-2xl ml-2"/>
          </ListItemIcon>
          Share
        </MenuItem>
      </Menu>
      <ShareTwo isShareOpen={isShareOpen} setIsShareOpen={setIsShareOpen} />
    </>
  )
}

export default MBathroomActionMenu
