import React from 'react'
import { Close } from '@mui/icons-material'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemIcon } from '@mui/material'
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

const ShareTwo = ({ isShareOpen, setIsShareOpen }: { isShareOpen: boolean, setIsShareOpen:any }) => {

  const palceholderUrl = "https://pottymap.vercel.app/"

  return (
    <Dialog
      open={isShareOpen}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle sx={{ m: 0, padding: 2, paddingRight: 5 }} className='truncate'>
        Share this bathroom
      </DialogTitle>
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: (theme) => theme.palette.grey[500]
        }}
        onClick={() => setIsShareOpen(false)}
      >
        <Close />
      </IconButton>

      <DialogContent dividers>
        <List>

          <ListItem>
            <LinkedinShareButton url={palceholderUrl} className="flex items-center">
              <ListItemIcon className="mr-1">
                <LinkedinIcon size={32} round={true} />
              </ListItemIcon>
              LinkedIn
            </LinkedinShareButton>
          </ListItem>
          <ListItem>
            <TwitterShareButton url={palceholderUrl} className="flex items-center">
              <ListItemIcon className="mr-1">
                <XIcon size={32} round={true} />
              </ListItemIcon>
              X (Formerly Twitter)
            </TwitterShareButton>
          </ListItem>
          <ListItem>
            <FacebookShareButton url={palceholderUrl} hashtag='PottyMap' className="flex items-center">
              <ListItemIcon className="mr-1">
                <FacebookIcon size={32} round={true} />
              </ListItemIcon>
              Facebook
            </FacebookShareButton>
          </ListItem>
          {/* need the appID */}
          {/* <ListItem>
        <FacebookMessengerShareButton appId="" url={palceholderUrl} className="flex items-center">
          <ListItemIcon className="mr-1">
            <FacebookMessengerIcon size={32} round={true} />
          </ListItemIcon>
          Facebook Messenger
        </FacebookMessengerShareButton>
      </ListItem> */}
          <ListItem>
            <WhatsappShareButton url={palceholderUrl} className="flex items-center">
              <ListItemIcon className="mr-1">
                <WhatsappIcon size={32} round={true} />
              </ListItemIcon>
              Whatsapp
            </WhatsappShareButton>
          </ListItem>
          <ListItem>
            <EmailShareButton url={palceholderUrl} className="flex items-center">
              <ListItemIcon className="mr-1">
                <EmailIcon size={32} round={true} />
              </ListItemIcon>
              Email
            </EmailShareButton>
          </ListItem>
          <ListItem>
            <WorkplaceShareButton url={palceholderUrl} className="flex items-center">
              <ListItemIcon className="mr-1">
                <WorkplaceIcon size={32} round={true} />
              </ListItemIcon>
              Workplace
            </WorkplaceShareButton>
          </ListItem>

        </List>
      </DialogContent>

      <DialogActions>
        <p className='invisible'>this is the footer</p>
      </DialogActions>
    </Dialog>
  )
}

export default ShareTwo
