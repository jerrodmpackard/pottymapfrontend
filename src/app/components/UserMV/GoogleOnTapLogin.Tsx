import { Google } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

const GoogleOnTapLogin = () => {
  return (
    <Button
    variant='outlined'
    startIcon={<Google/>}
    >
        Login with Google
    </Button>
  )
}

export default GoogleOnTapLogin