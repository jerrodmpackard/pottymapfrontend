import { Close } from '@mui/icons-material'
import { Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material'
import React from 'react'
import DynamicSearchBoxComponent from '../AddressSearchBox/DynamicSearchBoxComponent'

const ModalInputs = ({isModalOpen, setIsModalOpen} : {isModalOpen:boolean, setIsModalOpen:any}) => {


    
  return (
    <Dialog
      open={isModalOpen}
    >
        <DialogTitle>
            Add a Bathroom
            <IconButton
            sx={{
                position:'absolute',
                top:8,
                right:8,
                color:(theme) => theme.palette.grey[500]
            }}
            onClick={() => setIsModalOpen(false)}
            >
                <Close />
            </IconButton>


        </DialogTitle>
            {/* <DynamicSearchBoxComponent/> */}
        {/* <DialogActions>

        </DialogActions> */}
    </Dialog>
  )
}

export default ModalInputs
