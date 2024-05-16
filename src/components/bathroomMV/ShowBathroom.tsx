import React, { useState } from 'react'

//Material UI imports
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Alert, IconButton, Typography, Stack, Rating, Tooltip } from '@mui/material'
import { Close } from '@mui/icons-material'

//Image imports
import Image from 'next/image'
import bgImg from '../../assets/Kids_Free_Hand_Drawing_of_Toilet_Paper_Rolls_Seamless_Background_Pattern_generated.jpg'

//Icon imports

import { PiHeart, PiStar, PiPersonLight, PiClockLight, PiKey, PiBuildings, PiDoor, PiShieldCheck, PiWheelchair, PiBabyLight, PiSprayBottleLight } from "react-icons/pi";
import { GrShare } from "react-icons/gr";
import RateIcon from '../mainMV/UserMV/RateIcon'


const ShowBathroom = ({ placeholder, setPlaceholder }: { placeholder: boolean, setPlaceholder: any }) => {

  const title = "Best Potty Spot"

  return (
    <Dialog
      open={placeholder}
      fullWidth={true}
      maxWidth='sm'
      style={{ zIndex: 101 }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
      </DialogTitle>
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: (theme) => theme.palette.grey[500]
        }}
        onClick={() => setPlaceholder(false)}
      >
        <Close />
      </IconButton>
      <DialogContent dividers className='h-[615px]'>
        <Box>
          <Image
            src={bgImg}
            alt="toilet background "
            height={200}
            width={900}
            className="aspect-[4/1] border-4 border-[#B9DEE6] rounded-2xl flex object-cover"
          />
        </Box>

        <Stack direction="row" className="mt-1 flex items-center">
          <Stack spacing={1} sx={{ flexGrow: 1 }} >
            <Tooltip title="Bathroom Rating">
              <Box>
                <Rating name="This bathrooms rating" value={4.5} precision={0.5} readOnly size="large" />
              </Box>
              {/* <Rating name="half-rating" defaultValue={0} precision={0.5} /> */}
            </Tooltip>
          </Stack>

          <Box>
            <Tooltip title="Favorite">
              <IconButton color="error">
                <PiHeart className='text-3xl' />
              </IconButton>
            </Tooltip>
          </Box>

          <Box>
            <RateIcon />
          </Box>

          <Box>
            <Tooltip title="Share Bathroom">
              <IconButton>
              <GrShare  className='text-2xl'/>
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>


        <Box>
          <h2 className='text-lg font-semibold'>General Information</h2>
          <div className='mx-2 mt-2 flex item-center'>
            <PiPersonLight className='text-2xl' />
            <p className="ml-1">Men&apos;s &amp; Women&apos;s</p>
          </div>
        
          <div className='mx-2 mt-2 flex item-center'>
            <PiClockLight className='text-2xl' />
            <p className="ml-1"> Hours 8:00am &#8210; 5:00pm</p>
          </div>
        
          <div className='mx-2 mt-2 flex item-center'>
            <PiKey  className='text-2xl' />
            <p className="ml-1">Key required</p>
          </div>

          <div className='mx-2 mt-2 flex item-center'>
            <PiBuildings className='text-2xl' />
            <p className="ml-1">Customers only</p>
          </div>

          <div className='mx-2 mt-2 flex item-center'>
            <PiDoor className='text-2xl' />
            <p className="ml-1">3 stalls</p>
          </div>

          <div className='mx-2 mt-2 flex item-center'>
            <PiShieldCheck className='text-2xl' />
            <p className="ml-1">Safe</p>
          </div>

          <h2 className='text-lg mt-4 font-semibold'>Amenities</h2>
          <div className='mx-2 mt-2 flex item-center'>
            <PiWheelchair className='text-2xl'/>
            <p className="ml-1">Wheelchair accessible</p>
          </div>
          < div className='mx-2 mt-2 flex item-center'>
            <PiBabyLight className='text-2xl' />
            <p className="ml-1">Baby changing station</p>
          </div>
          <div className='mx-2 mt-2 flex item-center'>
            <PiSprayBottleLight className='text-2xl' />
            <p className="ml-1">Very clean</p>
          </div>
        </Box>
      </DialogContent>

      <DialogActions className="mx-4 my-2">
        <Box sx={{ flexGrow: 1 }}>
          <Button color="secondary" variant="contained">Leave a comment</Button>
        </Box>
        <Button color="error" variant="contained">Report</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ShowBathroom
