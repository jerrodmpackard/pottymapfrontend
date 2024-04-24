import { Alert, Snackbar } from '@mui/material'
import React from 'react'

//doesn't work yet
//

const Notification = () => {
  //const {stateTwo: {alertUser}, dispatchTwo} = useValueTwo()
    // const handleClose = (e, reason) => {
    //     if(reason === 'clickaway') return 
    //     dispatchTwo({type:'UPDATE_ALERT', payload:{...alertUser, open:false}})
    // }

    const handleClose = () => {

    }

  return (
    <Snackbar
    // open={alertUser.open}
    autoHideDuration={600}
    onClose={handleClose}
    anchorOrigin={{vertical:'top', horizontal:'center'}}
    >
        <Alert
        onClose={handleClose}
        // severity={alertUser.severity}
        sx={{width: '100%'}}
        variant='filled'
        elevation={6}
        >
          {/* {alertUser.message} */}
        </Alert>
    </Snackbar>
  )
}

export default Notification