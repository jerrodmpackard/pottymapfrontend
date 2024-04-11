'use client'
import React from 'react'
import { Menu, Lock } from '@mui/icons-material'
import Typography from '@mui/material/Typography';
import { AppBar, Box, Button, Container, IconButton, Toolbar } from '@mui/material'
import { useValue } from '@/context/ContextProvider';
import UserIcons from '../UserMV/UserIcons';

import PhotoURL from '../../Assets/vecteezy_cartoon-doodle-golden-toilet_12156543.png'


const NavComponent = () => {

    //object 'user' holds the two properties 'name' and 'image'
    const user = {name: 'test', PhotoURL}

    //Ts couldn't infer the type of 'currentUser'
    //'state' is being returend by 'useValue()' and then deconstructed to get to 'currentUser'
    //'dispatch' is being directly returned by 'useValue()'
    const { state: { currentUser }, dispatch } = useValue();



    return (
        <AppBar>
            <Container maxWidth='lg'>
                <Toolbar disableGutters>
                    <Box sx={{ mr: 1 }}>
                        <IconButton size='large' color='inherit'>
                            <Menu />
                        </IconButton>
                    </Box>
                    <Typography
                        variant='h6'
                        component='h1'
                        noWrap
                        sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                    >
                        Potty Map
                    </Typography>
                    <Typography
                        variant='h6'
                        component='h1'
                        noWrap
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        PMap
                    </Typography>

                    {!currentUser ? (<Button color='inherit' startIcon={<Lock />} onClick={() => dispatch({type:'OPEN_LOGIN', payload: user})}> 
                        Login 
                    </Button>) : (<UserIcons />)}

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavComponent