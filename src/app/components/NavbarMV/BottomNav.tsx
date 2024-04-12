import { AddLocationAltRounded, Bathroom, LocationOn, WrongLocationRounded } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, Paper, Popover, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useValue } from '@/context/ContextProvider';
import BetaMap from '../MapsMV/BetaMap';
import Restroom from '../RestroomMV/Restroom';
import AddRestroom from '../RestroomMV/AddRestroom';

const BottomNav = () => {

  const [value, setValue] = useState(0);
  const { state: { currentUser }, dispatch } = useValue();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [value])


  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);


  return (
    <Box>
      {
        {
          0: <BetaMap />,
          // 1: <Restroom />,
          // 2: <AddRestroom />
          1: <AddRestroom/>
        }[value]
      }
      <Paper
        elevation={3}
        sx={{ position: 'fixed', bottom: 0, left: 0, zIndex: 2, width: '100%' }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction label='Map' icon={<LocationOn />} />
          {/* <BottomNavigationAction label='Bathrooms' icon={<Bathroom />} /> */}
          {/* we could use  WCRounded but people could take offense becuase of the two genders lol*/}

          {!currentUser ? (
            <Box>
              <BottomNavigationAction label='lol'
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                icon={<WrongLocationRounded />}

              />

              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>Login to Access</Typography>
              </Popover>
            </Box>

          ) : (<BottomNavigationAction label='Add' icon={<AddLocationAltRounded />} />)}
        </BottomNavigation>
      </Paper>
    </Box>
  )
}

export default BottomNav