import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Alert, IconButton, Typography, Stack } from '@mui/material'
import { Close} from '@mui/icons-material'
import React, { useState } from 'react'

const ShowBathroom = () => {
    const [placeholder, setPlaceholder] = useState<boolean>(false)

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
          <Stack>
            
          </Stack>
        </DialogContent>
        <DialogActions>
            <Button>Close</Button>
        </DialogActions> 
    </Dialog>
  )
}

export default ShowBathroom
