import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Alert, IconButton, Typography, Stack, Rating, Tooltip } from '@mui/material'
import { Close} from '@mui/icons-material'
import React, { useState } from 'react'

const ShowBathroom = ({placeholder, setPlaceholder} : {placeholder:boolean, setPlaceholder:any}) => {

    const title = "lol"

  return (
    <Dialog
    open={placeholder}
    fullWidth={true}
    maxWidth='md'
    style={{zIndex: 101}}
    >
        <DialogTitle sx={{m:0, p:2}}>
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
            {/* Image */}
          </Box>
          <Stack direction="row" className="mt-2">
            <Stack spacing={1}>
              <Tooltip title="Rate this Bathroom">
                <Rating name="half-rating" defaultValue={0} precision={0.5} />
              </Tooltip>
            </Stack>

            
          </Stack>
        </DialogContent>
        <DialogActions>
            <Button>Close</Button>
        </DialogActions> 
    </Dialog>
  )
}

export default ShowBathroom
