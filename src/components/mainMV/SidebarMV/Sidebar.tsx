import React from 'react'
import { Divider, Drawer, IconButton, Typography, styled } from '@mui/material'
import { ChevronLeft } from '@mui/icons-material'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '250px',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: any }) => {
  return (
    <Drawer
      variant='persistent'
      hideBackdrop={true}
      open={isOpen}
    >
      <DrawerHeader>
        <Typography>Favorites</Typography>
        <IconButton onClick={() => setIsOpen(false)}>
          <ChevronLeft fontSize='large' />
        </IconButton>
      </DrawerHeader>

      <Divider />
      
      <Typography className='pl-2 pt-4'>Favorites feature coming soon!</Typography>
    </Drawer>
  )
}

export default Sidebar
