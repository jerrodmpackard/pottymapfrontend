import React, { useState } from 'react'
import { Box, Menu, MenuItem, Rating, Stack, Typography } from '@mui/material';


interface UserRateProps {
    anchorRateMenu: HTMLElement | null;
    setAnchorRateMenu: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    value: number | null;
    setValue: any
}

    const labels: { [index: string]: string } = {
        0.5: 'Abysmal',
        1: 'Very Bad',
        1.5: 'Bad',
        2: 'Poor',
        2.5: 'Mediocre',
        3: 'Average',
        3.5: 'Good',
        4: 'Great',
        4.5: 'Almost Perfect',
        5: 'Perfection',
    };

    function getLabelText(value: number) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

const RateMenu = ({ anchorRateMenu, setAnchorRateMenu, value, setValue }: UserRateProps) => {

    const handleCloseRateMenu = () => {
        setAnchorRateMenu(null)
    }

    const [hover, setHover] = useState(-1);

    return (
        <Menu
            anchorEl={anchorRateMenu}
            open={Boolean(anchorRateMenu)}
            onClose={handleCloseRateMenu}
            onClick={handleCloseRateMenu}
        >
            <MenuItem>
                <Stack direction="column">
                    <Typography className="ml-2">Rate Bathroom</Typography>
                    <Stack direction="row">    
                        <Rating name="rating bathroom" precision={0.5} 
                            value={value}
                            getLabelText={getLabelText}
                            onChange={(e, newValue) => {
                                setValue(newValue)
                            }}
                            onChangeActive={(e, newHover) => {
                                setHover(newHover)
                            }}
                        />
                        {value !== null && (
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                    </Stack>
                </Stack>
                
            </MenuItem>
        </Menu>
    )
}

export default RateMenu
