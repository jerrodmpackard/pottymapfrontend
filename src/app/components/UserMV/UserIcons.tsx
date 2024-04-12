
import { useValue } from '@/context/ContextProvider'
import { Mail, Notifications } from '@mui/icons-material'
import { Avatar, Badge, Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import toiletImage from '@/assets/vecteezy_cartoon-doodle-golden-toilet_12156543.png'
import UserMenu from './UserMenu'

const UserIcons = () => {

    //De-structuring 'state'
    const {state:{currentUser}} = useValue()
    
    //Declaring state variable with types
    const [anchorUserMenu, setAnchorUserMenu] = React.useState<HTMLElement | null>(null);

  return (
    <Box>
        <IconButton size='large' color='inherit'>
            <Badge color='error' badgeContent={5}>
                <Mail/>
            </Badge>
        </IconButton>
        <IconButton size='large' color='inherit'>
            <Badge color='error' badgeContent={20}>
                <Notifications />
            </Badge>
        </IconButton>
        <Tooltip title='Open UserSettings'>
            <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
                <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
                    {currentUser?.name?.charAt(0).toUpperCase()}
                </Avatar>
            </IconButton>
        </Tooltip>
        <UserMenu {...{anchorUserMenu, setAnchorUserMenu}}/>
    </Box>
  )
}

export default UserIcons