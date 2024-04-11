import { AddLocationAltRounded, Bathroom, LocationOn } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material'
import React, { useState } from 'react'
import BetaMap from '../MapsMV/BetaMap';

const BottomNav = () => {
    const [value, setValue] = useState(0);
  return (
    <Box>
      {
        {
          0: <BetaMap />,
          1: <Bathroom />,
          // 2: <AddBathroom />
        }[value]
      }
        <Paper
        elevation={3}
        sx={{position:'fixed', bottom:0, left:0, zIndex:2, width: '100%'}}
        >  
            <BottomNavigation
            showLabels
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            >
                <BottomNavigationAction label='Map' icon={<LocationOn />}/>
                <BottomNavigationAction label='Bathrooms' icon={<Bathroom />}/>
                {/* we could use  WCRounded but people could take offense becuase of the two genders lol*/}
                <BottomNavigationAction label='Add' icon={<AddLocationAltRounded />}/>
            </BottomNavigation>
        </Paper>
    </Box>
  )
}

export default BottomNav