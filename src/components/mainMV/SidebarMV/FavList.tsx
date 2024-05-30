import { IBathrooms } from '@/Interfaces/Interfaces';
import { getFavoritesByUserID, removeFavorites } from '@/utils/DataServices';
import { Box, IconButton, ListItem, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const FavList = ({ map, isOpen, setIsOpen }: { map: mapboxgl.Map | null, isOpen: any, setIsOpen: any }) => {

  const [userId, setUserId] = useState<number>(0);
  const [favorites, setFavorites] = useState<IBathrooms[]>([]);


  // Getting user ID
  useEffect(() => {
    const holder = localStorage.getItem("Username");
    if (holder) {
      const parsedHolder = JSON.parse(holder);
      setUserId(parsedHolder.userId)
    }
  }, []);


  // Getting user favorites
  useEffect(() => {
    const getData = async () => {
      if (userId !== 0) {
        setFavorites(await getFavoritesByUserID(userId));
      }
    }
    getData();
  }, [userId, isOpen])


  // Removing favorites
  const handleRemoveFavorite = async (userId: number, bathroomId: number) => {

    await removeFavorites(userId, bathroomId);

    setFavorites(await getFavoritesByUserID(userId));

  }


  // Fly to function when clicking a bathroom name in favorites list
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
    <>
     {favorites.length > 0 ? (
        favorites.map((bathroom, index) => (
          <Box sx={{ width: '100%', maxWidth: 295 }}>
            <ListItem
              key={index}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)', // Change to desired hover color
                },
              }}
              secondaryAction={
                <Tooltip title="delete">
                  <IconButton edge="end" onClick={() => handleRemoveFavorite(userId, bathroom.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              <Tooltip title={bathroom.name}>
                <Typography noWrap onClick={() => handleBathroomClick([bathroom.longitude, bathroom.latitude])}>
                  {bathroom.name}
                </Typography>
              </Tooltip>
            </ListItem>
          </Box>
        ))
      ) : (
        <Box sx={{ width: '100%', maxWidth: 295 }}>
          <Typography className='text-pretty'>No Favorites. Add some bathrooms to favorites and see them populate</Typography>
        </Box>
      )}
    </>
  )
}

export default FavList
