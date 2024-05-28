import React, { useEffect, useState } from 'react'
import { Box, Menu, MenuItem, Rating, Stack, Typography } from '@mui/material';
import { IRating } from '@/Interfaces/Interfaces';
import { AddRating } from '@/utils/DataServices';


interface UserRateProps {
    anchorRateMenu: HTMLElement | null;
    setAnchorRateMenu: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    value: number | null;
    setValue: any;
    selectedMarkerData: any;
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

const RateMenu = ({ anchorRateMenu, setAnchorRateMenu, value, setValue, selectedMarkerData }: UserRateProps) => {

    const handleCloseRateMenu = () => {
        setAnchorRateMenu(null)
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

    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRating({
          ...rating,
          [e.target.name]: e.target.value,
          userId: userId,
          BathroomId: selectedMarkerData?.id,
        })
      }

      
    const handleRate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (value === null || value < 0.5) {
            console.log("not rated yet")
        } else {
            try {
                const res = AddRating(rating);
                console.log("Response:", res);
               
    
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
            onClick={handleCloseRateMenu}
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
                                setRating({
                                    ...rating,
                                    rating : value ?? 0
                                })
                            }}
                            onChangeActive={(e, newHover) => {
                                setHover(newHover)
                            }}
                            onClick={handleRate}
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
