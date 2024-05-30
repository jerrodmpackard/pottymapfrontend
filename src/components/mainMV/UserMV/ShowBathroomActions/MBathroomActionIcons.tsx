import React, { useState } from 'react'
import MBathroomActionMenu from './MBathroomActionMenu';
import { Box, IconButton, Tooltip} from '@mui/material';
import { MoreVert } from '@mui/icons-material'


const MBathroomActionIcons = ({inFav, handleAddFavorite} : { inFav: boolean, handleAddFavorite: any }) => {

    const [mBAMenu, setMBAMenu] = useState<HTMLElement | null>(null);

  return (
    <Box>
        <Tooltip title='Options'>
            <IconButton color='inherit' onClick={(e) => setMBAMenu(e.currentTarget)}>
                <MoreVert />
            </IconButton>
        </Tooltip>
        <MBathroomActionMenu mBAMenu={mBAMenu} setMBAMenu={setMBAMenu} inFav={inFav} handleAddFavorite={handleAddFavorite}/>
    </Box>
  )
}

export default MBathroomActionIcons
