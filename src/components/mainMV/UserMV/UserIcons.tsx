import { Avatar, Badge, Box, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import UserMenu from './UserMenu'

const UserIcons = () => {
    
    const [anchorUserMenu, setAnchorUserMenu] = useState<HTMLElement | null>(null);

  return (
    <Box>
        <Tooltip title='Open UserSettings'>
            <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
                <Avatar></Avatar>
            </IconButton>
        </Tooltip>
        <UserMenu anchorUserMenu={anchorUserMenu} setAnchorUserMenu={setAnchorUserMenu}/>
    </Box>
  )
}

export default UserIcons