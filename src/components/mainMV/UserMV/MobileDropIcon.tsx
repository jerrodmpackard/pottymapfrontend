import { MoreVert } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import MobileDropDown from './MobileDropDown'

interface MobileMenuProps {
    isModalOpen: boolean;
    setIsModalOpen: any;
}

const MobileDropIcon = ({isModalOpen, setIsModalOpen}: MobileMenuProps) => {

    const [mobileDropDown, setMobileDropDown] = useState<HTMLElement | null>(null);
    
    return (
        <Box>
            <Tooltip title='Click'>
                <IconButton color='inherit' onClick={(e) => setMobileDropDown(e.currentTarget)}>
                    <MoreVert />
                </IconButton>
            </Tooltip>
            <MobileDropDown mobileDropDown={mobileDropDown} setMobileDropDown={setMobileDropDown}  isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </Box>
    )
}

export default MobileDropIcon
