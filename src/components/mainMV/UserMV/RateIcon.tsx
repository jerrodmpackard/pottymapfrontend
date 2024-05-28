import { Box, IconButton, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { PiStar, PiStarDuotone } from 'react-icons/pi'
import RateMenu from './RateMenu';

const RateIcon = ({selectedMarkerData, updateRating, setUpdateRating} : {selectedMarkerData: any, updateRating: any, setUpdateRating: any}) => {

    const [anchorRateMenu, setAnchorRateMenu] = useState<HTMLElement | null>(null);
    const [value, setValue] = useState<number | null>(0);

    return (
        <Box>
            <Tooltip title={value === null || value < 0.5 ? "Rate Bathroom" : "View your rating"}>
                <IconButton onClick={(e) => setAnchorRateMenu(e.currentTarget)}>
                    {value === null || value < 0.5 ? (
                        <PiStar className='text-yellow-600 text-3xl' />
                    ) : (
                        <PiStarDuotone className='star-icon text-3xl' />
                    )}
                </IconButton>
            </Tooltip>
            <RateMenu anchorRateMenu={anchorRateMenu} setAnchorRateMenu={setAnchorRateMenu} value={value} setValue={setValue} selectedMarkerData={selectedMarkerData} updateRating={updateRating} setUpdateRating={setUpdateRating} />
        </Box>
    )
}

export default RateIcon
