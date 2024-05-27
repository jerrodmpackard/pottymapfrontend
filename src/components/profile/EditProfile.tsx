import { Close } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React from 'react'

const EditProfile = () => {
    const open = true /// placeholder 

    const title = "ahhh"

    return (
        <Dialog
            open={open}
            fullWidth={true}
            maxWidth="sm"
        >
            <DialogTitle sx={{ m: 0, padding: 2, paddingRight: 5 }} className='truncate'>
                {title}
            </DialogTitle>
            <IconButton
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: (theme) => theme.palette.grey[500]
                }}
                // onClick={() => setIsReportOpen(false)}
            >
                <Close />
            </IconButton>

            <DialogContent dividers>
                <h1>eddting happens here</h1>




            </DialogContent>

            <DialogActions>
                <p>this is the footer</p>
            </DialogActions>
        </Dialog>
    )
}

export default EditProfile
