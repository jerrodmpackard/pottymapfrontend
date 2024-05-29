import { IAddFavorite, IBathrooms } from '@/Interfaces/Interfaces';
import { getFavoritesByUserID, removeFavorites } from '@/utils/DataServices';
import { ListItem, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { PiTrash } from "react-icons/pi";

const FavList = ({ map }: { map: mapboxgl.Map | null }) => {

  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    const holder = localStorage.getItem("Username");
    if (holder) {
      const parsedHolder = JSON.parse(holder);
      setUserId(parsedHolder.userId)
    }
  }, []);

  const [favorites, setFavorites] = useState<IBathrooms[]>();

  useEffect(() => {
    const getData = async () => {
      if (userId !== 0) {
        setFavorites(await getFavoritesByUserID(userId));
      }
    }

    getData();
  }, [userId])

  const handleRemoveFavorite = async (userId: number, bathroomId: number) => {
    await removeFavorites(userId, bathroomId);
  }

  const handleBathroomClick = (coordinates: [number, number]) => {
    if (map) {
      map.flyTo({
        center: coordinates,
        zoom: 15,
      });
    }
    // setPlaceholder(false)
  };


  return (
    <div>
      {favorites?.map((bathroom, idx) => {
        return (
          <Tooltip key={idx} title={bathroom.name}>
            <ListItem
              onClick={() => handleBathroomClick([bathroom.longitude, bathroom.latitude])}

              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)', // Change to desired hover color
                },
                paddingRight: 5
              }}
            >
              <PiTrash className='mr-3' onClick={() => {
                console.log(userId);
                console.log(bathroom.id);
                handleRemoveFavorite(userId, bathroom.id);
              }
              } />
              <Typography noWrap>{bathroom.name}</Typography>
            </ListItem>
          </Tooltip>
        )
      })}
    </div>
  )
}

export default FavList
