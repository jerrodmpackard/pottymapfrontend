import React from 'react'
import { Drawer, IconButton, Typography, styled } from '@mui/material'
import { ChevronLeft } from '@mui/icons-material'

const DrawerHeader = styled('div')(({theme}) => ({
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    width:'250px',
    padding: theme.spacing(0,1),
    ...theme.mixins.toolbar,
}))

const Sidebar = ({isOpen, setIsOpen}: {isOpen:boolean , setIsOpen:any}) => {
  return (
    <Drawer
    variant='persistent'
    hideBackdrop={true}
    open={isOpen}
    >
        <DrawerHeader>
            <Typography>Potty Map</Typography>
            <IconButton onClick={() => setIsOpen(false)}>
                <ChevronLeft fontSize='large'/>
            </IconButton>
        </DrawerHeader>
    </Drawer>
  )
}

export default Sidebar
