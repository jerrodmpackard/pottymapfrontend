import { getMapDots } from '@/utils/DataServices';
import { Box, Button, FormControl, List, ListItem, ListItemText, ListSubheader, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl';

type Bathroom = {
  name: string;
  coordinates: [number, number];
};

interface MapDots {
  features: Bathroom[];
}

const AllLocationsList = ({ map, setPlaceholder }: { map: mapboxgl.Map | null, setPlaceholder:any }) => {

  const [filter, setFilter] = useState('');
  const [bathrooms, setBathrooms] = useState<Bathroom[]>([]);
  const [filteredBathrooms, setFilteredBathrooms] = useState<Bathroom[]>([]);

  useEffect(() => {
    const getData = async () => {
      const mapDots: MapDots = await getMapDots()
      const bathroomsData = mapDots.features.map((feature: any) => ({
        name: feature.properties.name,
        coordinates: feature.geometry.coordinates,
      }));
      setBathrooms(bathroomsData)
      setFilteredBathrooms(bathroomsData)
    }
    getData()
  }, [])

  useEffect(() => {
    if (bathrooms.length > 0) {
      const lowerCaseFilter = filter.toLowerCase();
      const filtered = bathrooms.filter(bathroom =>
        bathroom.name.toLowerCase().includes(lowerCaseFilter)
      );

      setFilteredBathrooms(filtered);

      if (map) {
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
      map.flyTo({
        center: coordinates,
        zoom: 15,
      });
    }
    setPlaceholder(false)
  };


  return (
    <Box>
      <FormControl fullWidth>
        <TextField type="text"
          label="Filter by name"
          placeholder="Enter a bathroom name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </FormControl>




      <List
        sx={{ width: '100%', maxWidth: 295, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        className="truncate"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Results
          </ListSubheader>
        }
      >
        {filteredBathrooms.map((bathroom, index) => (
          <Tooltip key={index} title={bathroom.name}>
            <ListItem
              onClick={() => handleBathroomClick(bathroom.coordinates)}
              
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)', // Change to desired hover color
                },
                paddingRight: 5
              }}
            >
              <ListItemText
                primary={bathroom.name}

              />
            </ListItem>
          </Tooltip>
        ))}
      </List>

    </Box>
  )
}

export default AllLocationsList
