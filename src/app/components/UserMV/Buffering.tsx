
import { useValue } from '@/context/ContextProvider';
import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

const Buffering = () => {
    
    const {state:{loading}} = useValue();

  return (
    <Backdrop
    open={loading}
    sx={{zIndex: (theme) => theme.zIndex.modal + 1}}
    >
        <CircularProgress sx={{color:'blue'}}/>
    </Backdrop>
  )
}

export default Buffering