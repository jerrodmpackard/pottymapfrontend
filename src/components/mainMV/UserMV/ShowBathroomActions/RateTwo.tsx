import React, { useState } from 'react'
import { Box, Collapse, ListItemIcon, ListItemText, Menu, MenuItem, Rating, Stack, Tooltip, Typography } from '@mui/material';
import { PiStar, PiStarDuotone } from 'react-icons/pi';
import { ExpandLess, ExpandMore } from '@mui/icons-material';


interface MBAPropsTwo {
    // anchorRateMenuTwo: HTMLElement | null;
    // setAnchorRateMenuTwo: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    value: number | null;
    setValue: any;
    open: boolean;
    setOpen: any
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


const RateTwo = ({ value, setValue, open, setOpen }: MBAPropsTwo) => {

    // const handleCloseRateMenuTwo = () => {
    //     setAnchorRateMenuTwo
    //     (null)
    // }

    const [hover, setHover] = useState(-1);



    return (
        <>
            <MenuItem sx={{ paddingTop: 2 }} className="flex items-center" onClick={() => setOpen(!open)}>
               
            <Tooltip title={value === null || value < 0.5 ? "Rate Bathroom" : "View your rating"}>
                <>
                    <ListItemIcon>
                        {value === null || value < 0.5 ? (
                            <PiStar className='text-yellow-600 text-3xl' />
                        ) : (
                            <PiStarDuotone className='star-icon text-3xl' />
                        )}
                    </ListItemIcon>
                    <Typography className="ml-2">Rate Bathroom</Typography>
                    {open ? <ExpandLess className="ml-2"/> : <ExpandMore  className="ml-2"/>}
                </>
            </Tooltip>
            </MenuItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <MenuItem>
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
                            <Box sx={{ ml: 1 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                    </Stack>
                </MenuItem>
            </Collapse>
        </>
    )
}

export default RateTwo
