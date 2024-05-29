import React, { useState } from 'react'
import { Box, Divider, Drawer, IconButton, Typography, styled, Tab, Tabs } from '@mui/material'
import { ChevronLeft } from '@mui/icons-material'
import FavList from './FavList';
import AllLocationsList from './AllLocationsList';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  openTab: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, openTab, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={openTab !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      >
      {openTab === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: 'fit content',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

const Sidebar = ({ isOpen, setIsOpen, map, setPlaceholder, selectedMarkerData }: { isOpen: boolean, setIsOpen: any, map: mapboxgl.Map | null, setPlaceholder:any, selectedMarkerData: any }) => {

  const [openTab, setOpenTab] = useState<number>(0)

  const handleTabChange = (e: React.SyntheticEvent, newOpenTab: number) => {
      setOpenTab(newOpenTab)
  }

  return (
    <Drawer
      variant='persistent'
      hideBackdrop={true}
      open={isOpen}
    >
        <DrawerHeader sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={openTab} onChange={handleTabChange}>
            <Tab label="Favorites" {...a11yProps(0)} />
            <Tab label="All Bathrooms" {...a11yProps(1)} />
          </Tabs>
          <IconButton onClick={() => setIsOpen(false)}>
            <ChevronLeft fontSize='large' />
          </IconButton>
        </DrawerHeader>

        <Box sx={{ p:3 }}>
          <CustomTabPanel openTab={openTab} index={0}>
            <FavList map={map} isOpen={isOpen} setIsOpen={setIsOpen} />
          </CustomTabPanel>
          <CustomTabPanel openTab={openTab} index={1}>
            <AllLocationsList map={map} setPlaceholder={setPlaceholder} setIsOpen={setIsOpen}/>
          </CustomTabPanel>
        </Box>
    </Drawer>
  )
}

export default Sidebar
