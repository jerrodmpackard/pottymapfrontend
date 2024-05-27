'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import logo from '@/assets/vecteezy_cartoon-doodle-golden-toilet_12156543.png'
import pfp from '@/assets/pexels-kevinbidwell-3118074.jpg'
import bgImg from '@/assets/Kids_Free_Hand_Drawing_of_Toilet_Paper_Rolls_Seamless_Background_Pattern_generated.jpg'
import { AppBar, Box, Button, Collapse, Container, Fab, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import PaletteIcon from '@mui/icons-material/Palette';
import AppsIcon from '@mui/icons-material/Apps';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import NumbersIcon from '@mui/icons-material/Numbers';



const ProfilePage = () => {


  const [userNam, setUserNam] = useState("");
  const [userId, setUserId] = useState("")

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const holder = localStorage.getItem("Username");
    if (holder) {
      const parsedHolder = JSON.parse(holder);
      setUserNam(parsedHolder.publisherName);
      setUserId(parsedHolder.userId)
    }
  }, []);




  return (
    <div className='bg-zinc-100'>
      <AppBar style={{ zIndex: 10 }}>
        <Container maxWidth='lg'>
          <Toolbar disableGutters>
            <Box sx={{ mr: 1, marginTop: 1, marginBottom: 1 }}>
              <IconButton
                className='aspect-square'
                size="small"
              >
                <Image width={30} height={30} src={logo.src} alt="logo?" />
              </IconButton>
            </Box>
            <Typography
              variant='h6'
              component='h1'
              noWrap
              sx={{ flexGrow: 1, display: { xs: 'flex' } }}
            >
              Potty Map
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <div className='mt-[67.25px] h-[calc(100dvh-67.25px)] '>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-6 gap-6">

          <section className="mt-10 md:col-span-4">
            <div className='border-4 border-[#B9DEE6] rounded-tl-2xl rounded-tr-2xl'>
              <Image src={bgImg}
                alt="toilet background "
                height={225}
                width={900}
                className="aspect-[2/1] sm:aspect-[4/1] flex object-cover"
              />
            </div>
            <div className="relative border-x-4 border-b-4 border-zinc-200 rounded-bl-2xl rounded-br-2xl pt-16">
              <Image src={pfp.src}
                alt="placeholder pfp"
                width={150}
                height={150}
                className='aspect-square rounded-full border-[#B9DEE6] border-4 drop-shadow-lg flex object-cover mt-[-150px] ml-[9%] '
              />

              <div className='p-4 grid grid-cols-2 sm:grid-cols-3'>
                <div>
                  <h2 className='text-center font-bold tracking-wide text-sky-700'>{userNam}</h2>
                </div>

                <div className='hidden md:flex md:grow md:invisible '>hi</div>

                <Tooltip title="Edit profile" >
                  <Fab color="primary" size="small" aria-label="edit" className="absolute bottom-4 right-4">
                    <EditIcon />
                  </Fab>
                </Tooltip>

              </div>
            </div>
          </section>

          <section className="mt-10 border-4 border-zinc-200 rounded-2xl md:col-span-2">
            <List
              subheader={
                <ListSubheader component="div" className="rounded-tr-2xl rounded-tl-2xl">
                  General Information
                </ListSubheader>
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <NumbersIcon />
                </ListItemIcon>
                <ListItemText primary={`Account number is ${userId} `} />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <ChangeCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItemButton>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <PaletteIcon />
                </ListItemIcon>
                <ListItemText primary="Color Theme" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <AppsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Color Theme Coming Soon!" />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </section>

          <section className="border-4 border-zinc-200 rounded-2xl h-full md:col-span-3">
            <h2 className="text-2xl font-semibold px-4 md:px-0 mt-4 text-center">Favorite Spot</h2>

            {/* <textarea name="decription" className='w-full' rows={5} cols={1}>
              My favorite poty spot is 
            </textarea> */}
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              defaultValue="Hello"
              
              className='m-4 min-w-96'
            />
          </section>

          <section className="border-4 border-zinc-200 rounded-2xl h-full md:col-span-3">
            <h2 className="text-2xl font-semibold px-4 md:px-0 mt-4 text-center">Favorites</h2>


            <p className="text-center">favorites go here</p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
