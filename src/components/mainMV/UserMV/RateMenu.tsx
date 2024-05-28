import React, { useEffect, useState } from 'react'
import { Box, Menu, MenuItem, Rating, Stack, Typography } from '@mui/material';
import { IRating } from '@/Interfaces/Interfaces';
import { AddRating, GetRatingByBathroomID } from '@/utils/DataServices';


interface UserRateProps {
    anchorRateMenu: HTMLElement | null;
    setAnchorRateMenu: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    value: number | null;
    setValue: any;
    selectedMarkerData: any;
    updateRating: any;
    setUpdateRating: any;
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

const RateMenu = ({ anchorRateMenu, setAnchorRateMenu, value, setValue, selectedMarkerData, updateRating, setUpdateRating }: UserRateProps) => {

    const handleCloseRateMenu = async () => {
        await handleRate(); // Call handleRate when menu is closed
        setAnchorRateMenu(null);
        setUpdateRating(false);
    }

    const [hover, setHover] = useState(-1);

    const [userNam, setUserNam] = useState<string>("");
    const [userId, setUserId] = useState<number>(0);

    useEffect(() => {
        const holder = localStorage.getItem("Username");
        if (holder) {
            const parsedHolder = JSON.parse(holder);
            setUserNam(parsedHolder.publisherName);
            setUserId(parsedHolder.userId)
        }
    }, []);


    // Adding new Rating
    const [rating, setRating] = useState<IRating>({
        id: 0,
        userId: userId,
        BathroomId: selectedMarkerData?.id,
        rating: 0
    });


    useEffect(() => {
        console.log(rating);
        setRating((prevRating) => ({
            ...prevRating,
            userId: userId,
            BathroomId: selectedMarkerData?.id || 0,
            rating: value ?? 0
        }));
    }, [userId, selectedMarkerData, value]);


    const handleRate = async () => {
        console.log(rating);

        if (value === null || value < 0.5) {
            console.log("not rated yet");
            console.log(value);
        } else {
            try {
                await AddRating(rating);
                setUpdateRating(true);
            } catch (error) {
                console.error('Error occured while adding rating', error)
                alert("Your rating was not added. Please try again.")
            }
        }
    }


 

    return (
        <Menu
            anchorEl={anchorRateMenu}
            open={Boolean(anchorRateMenu)}
            onClose={handleCloseRateMenu}
        >
            <MenuItem>
                <Stack direction="column">
                    <Typography className="ml-2">Rate Bathroom</Typography>
                    <Stack direction="column">
                        <Rating name="rating" precision={0.5}
                            value={value}
                            getLabelText={getLabelText}
                            onChange={(e, newValue) => {
                                setValue(newValue);
                                setRating((prevRating) => ({
                                    ...prevRating,
                                    rating: newValue ?? 0
                                }));
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
