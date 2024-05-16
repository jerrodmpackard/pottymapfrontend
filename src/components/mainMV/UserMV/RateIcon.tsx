import { Box, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { PiStar } from 'react-icons/pi'
import RateMenu from './RateMenu';

const RateIcon = () => {

    const [anchorRateMenu, setAnchorRateMenu] = useState<HTMLElement | null>(null);
    return (
        <Box>
            <Tooltip title="Rate Bathroom">
                <IconButton>
                    <PiStar className='text-yellow-600 text-3xl' />
                </IconButton>
            </Tooltip>
            <RateMenu anchorRateMenu={anchorRateMenu} setAnchorRateMenu={setAnchorRateMenu}/>
        </Box>
    )
}

export default RateIcon
