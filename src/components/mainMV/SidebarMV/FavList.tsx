import { IAddFavorite, IBathrooms } from '@/Interfaces/Interfaces';
import { getFavoritesByUserID, removeFavorites } from '@/utils/DataServices';
import { CenterFocusStrongOutlined } from '@mui/icons-material';
import { IconButton, ListItem, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const FavList = ({ map, isOpen, setIsOpen }: { map: mapboxgl.Map | null, isOpen: any, setIsOpen: any }) => {

  const [userId, setUserId] = useState<number>(0);
  const [favorites, setFavorites] = useState<IBathrooms[]>([]);

  useEffect(() => {
    const holder = localStorage.getItem("Username");
    if (holder) {
      const parsedHolder = JSON.parse(holder);
      setUserId(parsedHolder.userId)
    }
  }, []);


  useEffect(() => {
    const getData = async () => {
      if (userId !== 0) {
        setFavorites(await getFavoritesByUserID(userId));
      }
    }

    getData();
  }, [userId, isOpen])

  const handleRemoveFavorite = async (userId: number, bathroomId: number) => {
    await removeFavorites(userId, bathroomId);
  }

  const handleBathroomClick = (coordinates: [number, number]) => {
    if (map) {
      map.flyTo({
        center: coordinates,
        zoom: 15,
      });
      setIsOpen(false)
    }
    // setPlaceholder(false)
  };


  return (
    <div>
      {favorites?.map((bathroom, index) => {
        if (!bathroom) {
          return (
            <Typography>No Favorites</Typography>
          );
        }

        return (
          
            <ListItem
              key={index}
              onClick={() => handleBathroomClick([bathroom.longitude, bathroom.latitude])}
              sx={{
                width: '100%',
                maxWidth: 295,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)', // Change to desired hover color
                },
              }}

              secondaryAction={
                <Tooltip title="delete" >
                   <IconButton edge="end" aria-label="delete" onClick={() => { handleRemoveFavorite(userId, bathroom.id);}}>
                      <DeleteIcon  />
                    </IconButton>
                </Tooltip>
              }
            >
              <Tooltip title={bathroom.name}>
                <Typography noWrap >{bathroom.name}</Typography>
              </Tooltip>
            </ListItem>
          
        )
      })}
    </div>
  )
}

export default FavList
