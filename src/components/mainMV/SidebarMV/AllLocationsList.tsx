import { getMapDots } from '@/utils/DataServices';
import { Box, Button, List, ListItem, ListItemText, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl';

type Bathroom = {
  name: string;
  coordinates: [number, number];
};

interface MapDots {
  features: Bathroom[];
}

const AllLocationsList = ({ map }: { map: mapboxgl.Map | null }) => {

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
  };


  return (
    <Box>
      <TextField type="text"
        placeholder="Filter by Name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}

      />

      <Box>
      <List sx={{ width: '295px'}}>
        {filteredBathrooms.map((bathroom, index) => (
          <Tooltip key={index} title={bathroom.name}>
            <ListItem
              onClick={() => handleBathroomClick(bathroom.coordinates)}
              style={{ cursor: 'pointer' }}
              >
              <ListItemText
                primary={bathroom.name}
                className="truncate"
                
              />
            </ListItem>
          </Tooltip>
        ))}
      </List>
      </Box>
    </Box>
  )
}

export default AllLocationsList
