import { addFavorites, getFavoritesByUserID, getMapDots, removeFavorites } from '@/utils/DataServices';
import { Box, IconButton, FormControl, List, ListItem, ListSubheader, Tooltip, TextField, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { PiHeartFill, PiHeart } from 'react-icons/pi';
import { IAddFavorite, IBathrooms } from '@/Interfaces/Interfaces';

const AllLocationsList = ({ map, setPlaceholder, setIsOpen }: { map: mapboxgl.Map | null, setPlaceholder: any, setIsOpen: any }) => {
  const [filter, setFilter] = useState('');
  const [bathrooms, setBathrooms] = useState<IBathrooms[]>([]);
  const [filteredBathrooms, setFilteredBathrooms] = useState<IBathrooms[]>([]);
  const [favorites, setFavorites] = useState<IBathrooms[]>([]);
  const [userId, setUserId] = useState<number>(0);

  // Getting user ID
  useEffect(() => {
    const holder = localStorage.getItem("Username");
    if (holder) {
      const parsedHolder = JSON.parse(holder);
      setUserId(parsedHolder.userId);
    }
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (userId !== 0) {
        const userFavorites = await getFavoritesByUserID(userId);
        setFavorites(userFavorites);
      }
    };
    fetchFavorites();
  }, [userId]);

  useEffect(() => {
    const getData = async () => {
      const mapDots = await getMapDots();
      const bathroomsData = mapDots.features.map((feature: any) => ({
        id: feature.properties.id,
        name: feature.properties.name,
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
      }));
      setBathrooms(bathroomsData);
      setFilteredBathrooms(bathroomsData);
    };
    getData();
  }, []);

  useEffect(() => {
    if (bathrooms.length > 0) {
      const lowerCaseFilter = filter.toLowerCase();
      const filtered = bathrooms.filter(bathroom =>
        bathroom.name.toLowerCase().includes(lowerCaseFilter)
      );

      setFilteredBathrooms(filtered);

      if (map && map.isStyleLoaded()) {
        if (filtered.length) {
          map.setFilter('bathrooms', [
            'match',
            ['get', 'name'],
            filtered.map(bathroom => bathroom.name),
            true,
            false
          ]);
        } else {
          map.setFilter('bathrooms', null);
        }
      }
    }
  }, [filter, bathrooms, map]);

  const handleBathroomClick = (coordinates: [number, number]) => {
    if (map) {
      const [lng, lat] = coordinates;
      if (!isNaN(lng) && !isNaN(lat)) {
        map.flyTo({
          center: coordinates,
          zoom: 15,
        });
        setIsOpen(false);
        setPlaceholder(false);
      } else {
        console.error("Invalid coordinates:", coordinates);
      }
    }
  };

  const handleFavorites = async (bathroom: IBathrooms) => {
    try {
      const isAlreadyFavorited = favorites.some(fav => fav.id === bathroom.id);

      if (isAlreadyFavorited) {
        await removeFavorites(userId, bathroom.id);
        setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== bathroom.id));
        console.log("Removing from favorites");
      } else {
        const favoriteData: IAddFavorite = {
          id: 0, 
          userId: userId,
          bathroomId: bathroom.id,
        };

        await addFavorites(favoriteData);
        setFavorites(prevFavorites => [...prevFavorites, bathroom]);
        console.log("Adding to favorites");
      }
      
    } catch (error) {
      console.error('Error occurred while handling favorite', error);
    }
  };

  return (
    <>
      <FormControl fullWidth sx={{ paddingTop: 1 }}>
        <TextField type="text"
          label="Filter by name"
          placeholder="Enter a bathroom name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </FormControl>

      <Typography>
        Results
      </Typography>

      <List
        sx={{ width: '100%', maxWidth: 295, height: '100%', maxHeight: 600, bgcolor: 'background.paper', p:1 }}
        className="overflow-y-scroll overflow-hidden"
      >
        {filteredBathrooms.length === 0 ? (
          <Typography>No Favorites</Typography>
        ) : (
          filteredBathrooms.map((bathroom, index) => {
            const isInFavorites = favorites.some(fav => fav.id === bathroom.id);
            
            return (
              <ListItem
                key={index}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Change to desired hover color
                  },
                }}
                secondaryAction={
                  <Tooltip title={isInFavorites ? "In favorites" : "Add to favorites"}>
                    <IconButton edge="end" onClick={() => handleFavorites(bathroom)}>
                      {isInFavorites ? (
                        <PiHeartFill className='text-3xl text-red-600' />
                      ) : (
                        <PiHeart className='text-3xl text-red-600' />
                      )}
                    </IconButton>
                  </Tooltip>
                }
              >
                <Tooltip title={bathroom.name}>
                  <Typography noWrap onClick={() => handleBathroomClick([bathroom.longitude, bathroom.latitude])}>{bathroom.name}</Typography>
                </Tooltip>
              </ListItem>
            );
          })
        )}
      </List>
    </>
  );
};

export default AllLocationsList;
