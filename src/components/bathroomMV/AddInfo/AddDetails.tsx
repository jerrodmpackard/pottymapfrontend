import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

const AddDetails = ({form, setForm, handleChange} : {form:any , setForm:any, handleChange:any}) => {

  return (
    <div className='grid grid-cols-2 gap-6 my-4'>

      <FormControl>
        <InputLabel>Gender</InputLabel>
        <Select name="gender" 
        label="Gender"
        value={form.gender}  
        autoWidth
        onChange={handleChange}
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value="mens & womens">Men&apos;s and Women&apos;s</MenuItem>
          <MenuItem value="gender neutral">Gender neutral</MenuItem>
          <MenuItem value="family restroom">Family restroom</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Type</InputLabel>
        <Select name="type" 
        label="Type"
        value={form.type}
        autoWidth
        onChange={handleChange}
        >
          <MenuItem value="individual">Individual</MenuItem>
          <MenuItem value="shared">Shared</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        
        <TextField name="numberOfStalls"
        label="Number of Stalls"
        variant="outlined"  
        value={form.numberOfStalls} 
        onChange={handleChange}
        />
      </FormControl>

      <FormControl>
      <InputLabel>Wheelchair Accessible</InputLabel>
      <Select name="wheelChair" 
      label="Wheelchair Accessible"
      value={form.wheelchairAccessibility}
      autoWidth
      onChange={handleChange}
      >
        <MenuItem value="yes">Yes</MenuItem>
        <MenuItem value="no">No</MenuItem>
      </Select>
      </FormControl>

      <FormControl>
        <TextField name="hoursOfOperation" 
        label="Hours of Operation" 
        variant="outlined" 
        value={form.hoursOfOperation}
        onChange={handleChange} 
        />
      </FormControl>

      <FormControl>
      <InputLabel>Open to Public?</InputLabel>
      <Select name="openToPublic" 
      label="Open To Public?"
      value={form.openToPublic}
      autoWidth
      onChange={handleChange}>
          <MenuItem value=""></MenuItem>
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">Cutomers only</MenuItem>
      </Select>
      </FormControl>      
    </div>
  )
}

export default AddDetails
