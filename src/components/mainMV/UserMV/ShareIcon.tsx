import React, { useState } from 'react'
import { Box, IconButton, Tooltip } from '@mui/material'
import { GrShare } from 'react-icons/gr'
import ShareMenu from './ShareMenu';

const ShareIcon = () => {

    const [anchorShareMenu, setAnchorShareMenu] = useState<HTMLElement | null>(null);

    return (
        <Box>
            <Tooltip title="Share Bathroom">
                <IconButton  onClick={(e) => setAnchorShareMenu(e.currentTarget)}>
                    <GrShare className='text-2xl' />
                </IconButton>
            </Tooltip>
            <ShareMenu anchorShareMenu={anchorShareMenu} setAnchorShareMenu={setAnchorShareMenu}/>
        </Box>
    )
}

export default ShareIcon
