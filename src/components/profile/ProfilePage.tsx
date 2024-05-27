'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import logo from '@/assets/vecteezy_cartoon-doodle-golden-toilet_12156543.png'
import pfp from '@/assets/pexels-kevinbidwell-3118074.jpg'
import bgImg from '@/assets/Kids_Free_Hand_Drawing_of_Toilet_Paper_Rolls_Seamless_Background_Pattern_generated.jpg'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'

const ProfilePage = () => {


  const [userNam, setUserNam] = useState("");
  const [userId, setUserId] = useState("")

  useEffect(() => {
    const holder = localStorage.getItem("Username");
    if (holder) {
      const parsedHolder = JSON.parse(holder);
      setUserNam(parsedHolder.publisherName);
      setUserId(parsedHolder.userId)
    }
  }, []);




  return (
    <>
      <AppBar style={{ zIndex: 10 }}>
        <Container maxWidth='lg'>
          <Toolbar disableGutters>
            <Box sx={{ mr: 1, marginTop: 1, marginBottom: 1 }}>
              <Button color="inherit"
                variant="contained"
                className='aspect-square'
                size="small"
              >
                <Image width={30} height={30} src={logo.src} alt="logo?" />
              </Button>
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
      <div className='mt-[80px] h-[calc(100dvh-80px)] bg-zinc-100'>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 gap-6">

          <section className="mt-10">
            <div className='border-4 border-[#B9DEE6] rounded-tl-2xl rounded-tr-2xl'>
              <Image src={bgImg}
                alt="toilet background "
                height={225}
                width={900}
                className="aspect-[2/1] sm:aspect-[4/1] flex object-cover"
              />
            </div>
            <div className="border-x-4 border-b-4 border-zinc-200 rounded-bl-2xl rounded-br-2xl pt-16">
              <Image src={pfp.src}
                alt="placeholder pfp"
                width={150}
                height={150}
                className='aspect-square rounded-full border-[#B9DEE6] border-4 drop-shadow-lg flex object-cover mt-[-150px] ml-[5%] '
              />

              <div className='p-4 flex-group'>

                <div className=''>
                  <h1>Name Goes here</h1>
                  <h2>{userNam}</h2>
                  <h2>{userId}</h2>
                </div>

                <div className='hidden md:flex md:grow md:invisible'>hi</div>

                <div>
                  <h1>hello</h1>
                </div>
              </div>


            </div>
          </section>

          <section className="mt-10 border-4 border-zinc-200 h-full">
            <h1>hello</h1>
            <h4>General information goes here</h4>
          </section>

          <section className="col-span-1 sm:col-span-2 mt-10 border-4 border-zinc-200 h-full">
            <h1>ajsdhgf</h1>
          </section>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
