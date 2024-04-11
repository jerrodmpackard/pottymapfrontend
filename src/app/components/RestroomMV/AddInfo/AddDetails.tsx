import { FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import React, { useState } from 'react'

const AddDetails = () => {

  const [gender, setGender] = useState('');
  const [type, setType] = useState('');
  const [stallNum, setStallNum] = useState('');
  const [wheelChair, setWheelChair] = useState('');
  const [hours, setHours] = useState('');
  const [accessibility, setAccessibility] = useState('');
  const [keyNeed, setKeyNeed] = useState('');
  const [babyStation, setBabyStation] = useState('');
  const [clean, setClean] = useState('');
  const [safety, setSafety] = useState('');


  const handleGenderTypeChange = () => {

  }

  const handleRestroomTypeChange = () => {

  }

  const handleStallNumberChange = () => {

  }

  const handleWheelChairChange = () => {

  }

  const handleHourTypeChange = () => {

  }

  const handleAccessibilityChange = () => {

  }

  const handleKeyNeedChange = () => {

  }

  const handleBabyStationChange = () => {

  }

  const handleCleaninessChange = () => {

  }

  const handleSafetyChange = () => {

  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel>Gender</InputLabel>
          <Select
          label=''
          onChange={handleGenderTypeChange}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={''}>Men's</MenuItem>
            <MenuItem value={''}>Women's</MenuItem>
            <MenuItem value={''}>Everyone else</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel>Type</InputLabel>
          <Select
          label='Type'
          onChange={handleRestroomTypeChange}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={'indivual'}>Indivual</MenuItem>
            <MenuItem value={'family'}>Family</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel>Number of Stalls</InputLabel>
          <Select
          label=''
          onChange={handleStallNumberChange}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={''}>1</MenuItem>
            <MenuItem value={''}>2</MenuItem>
            <MenuItem value={''}>3</MenuItem>
            <MenuItem value={''}>4</MenuItem>
            <MenuItem value={''}>5</MenuItem>
            {/* Two toilets for 16 to 35 employees. Three toilets for 36 to 55 employees. 
            Four toilets for 56 to 80 employees. Five toilets for 81 to 110 employees. */}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel>Wheelchair Accessibility </InputLabel>
          <Select
          label=''
          onChange={handleWheelChairChange}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={''}>Yes</MenuItem>
            <MenuItem value={''}>No</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel>Hours of Operation</InputLabel>
          <Select
          label='Hours of Operation'
          onChange={handleHourTypeChange}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={''}>12am - 4am</MenuItem>
            <MenuItem value={''}>4am to 8am</MenuItem>
            <MenuItem value={''}>8am to 12pm</MenuItem>
            <MenuItem value={''}>12pm to 4pm</MenuItem>
            <MenuItem value={''}>4pm to 8pm</MenuItem>
            <MenuItem value={''}>8pm to 12am</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel>Accessability</InputLabel>
          <Select
          label=''
          onChange={handleAccessibilityChange}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={''}>Open to public</MenuItem>
            <MenuItem value={''}>Customer's Only</MenuItem>
            <MenuItem value={''}>Private</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel>Key needed</InputLabel>
          <Select
          label=''
          onChange={handleKeyNeedChange}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={''}>yes</MenuItem>
            <MenuItem value={''}>no</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel>Baby Changing Station</InputLabel>
          <Select
          label=''
          onChange={handleBabyStationChange}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={''}>Yes</MenuItem>
            <MenuItem value={''}>No</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel>Cleaniness</InputLabel>
          <Select
          label=''
          onChange={handleCleaninessChange}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={''}>Very Clean</MenuItem>
            <MenuItem value={''}>Clean</MenuItem>
            <MenuItem value={''}>Neutral</MenuItem>
            <MenuItem value={''}>Dirty</MenuItem>
            <MenuItem value={''}>Very Dirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel>Safetiness</InputLabel>
          <Select
          label=''
          onChange={handleSafetyChange}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={''}>Very Safe</MenuItem>
            <MenuItem value={''}>Safe</MenuItem>
            <MenuItem value={''}>Neutral</MenuItem>
            <MenuItem value={''}>Sketchy </MenuItem>
            <MenuItem value={''}>Don't come here</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default AddDetails
