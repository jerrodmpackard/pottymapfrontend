import React from 'react'
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import {
  LinkedinShareButton,
  TwitterShareButton,
  FacebookShareButton,
  // FacebookMessengerShareButton,
  WhatsappShareButton,
  EmailShareButton,
  WorkplaceShareButton,
  // PinterestShareButton,

  LinkedinIcon,
  XIcon,
  FacebookIcon,
  // FacebookMessengerIcon,
  WhatsappIcon,
  EmailIcon,
  WorkplaceIcon,
  // PinterestIcon,
} from "react-share";

import Head from 'next/head'

interface UserShareProps {
  anchorShareMenu: HTMLElement | null;
  setAnchorShareMenu: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

const ShareMenu = ({ anchorShareMenu, setAnchorShareMenu }: UserShareProps) => {

  const handleCloseShareMenu = () => {
    setAnchorShareMenu(null)
  }

  const currentPageUrl = window.location.href;
  const palceholderUrl = "https://pottymap.vercel.app/"

  return (
    <Menu
      anchorEl={anchorShareMenu}
      open={Boolean(anchorShareMenu)}
      onClose={handleCloseShareMenu}
      onClick={handleCloseShareMenu}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <MenuItem disabled={true}>Share to</MenuItem>
      <MenuItem>
        <LinkedinShareButton url={palceholderUrl} className="flex items-center">
          <ListItemIcon className="mr-1">
            <LinkedinIcon size={32} round={true} />
          </ListItemIcon>
          LinkedIn
        </LinkedinShareButton>
      </MenuItem>
      <MenuItem>
        <TwitterShareButton url={palceholderUrl} className="flex items-center">
          <ListItemIcon className="mr-1">
            <XIcon size={32} round={true} />
          </ListItemIcon>
          X (Formerly Twitter)
        </TwitterShareButton>
      </MenuItem>
      <MenuItem>
        <FacebookShareButton url={palceholderUrl} hashtag='PottyMap' className="flex items-center">
          <ListItemIcon className="mr-1">
            <FacebookIcon size={32} round={true} />
          </ListItemIcon>
          Facebook
        </FacebookShareButton>
      </MenuItem>
      {/* need the appID */}
      {/* <MenuItem>
        <FacebookMessengerShareButton appId="" url={palceholderUrl} className="flex items-center">
          <ListItemIcon className="mr-1">
            <FacebookMessengerIcon size={32} round={true} />
          </ListItemIcon>
          Facebook Messenger
        </FacebookMessengerShareButton>
      </MenuItem> */}
      <MenuItem>
        <WhatsappShareButton url={palceholderUrl} className="flex items-center">
          <ListItemIcon className="mr-1">
            <WhatsappIcon size={32} round={true} />
          </ListItemIcon>
          Whatsapp
        </WhatsappShareButton>
      </MenuItem>
      <MenuItem>
        <EmailShareButton url={palceholderUrl} className="flex items-center">
          <ListItemIcon className="mr-1">
            <EmailIcon size={32} round={true} />
          </ListItemIcon>
          Email
        </EmailShareButton>
      </MenuItem>
      <MenuItem>
        <WorkplaceShareButton url={palceholderUrl} className="flex items-center">
          <ListItemIcon className="mr-1">
            <WorkplaceIcon size={32} round={true} />
          </ListItemIcon>
          Workplace
        </WorkplaceShareButton>
      </MenuItem>
      {/* need an img url for media="" */}
      {/* <MenuItem>
        <PinterestShareButton media="" url={palceholderUrl} className="flex items-center">
          <ListItemIcon className="mr-1">
            <PinterestIcon size={32} round={true} />
          </ListItemIcon>
          Pinterest
        </PinterestShareButton>
      </MenuItem> */}
    </Menu>
  )
}

export default ShareMenu
