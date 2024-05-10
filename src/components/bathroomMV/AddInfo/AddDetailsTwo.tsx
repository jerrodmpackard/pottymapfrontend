import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const AddDetailsTwo = ({form, setForm, handleChange} : {form:any , setForm:any, handleChange:any}) => {
  return (
    <div className='grid grid-cols-2 gap-6 my-4'>
      <FormControl>
        <InputLabel >Key Required ?</InputLabel>
        <Select name="keyRequired"
        label="Key Required?"
        value={form.keyRequired}
        autoWidth
        onChange={handleChange}
        >
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
          <MenuItem value="code">Code required</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel >Baby Changing Station?</InputLabel>
        <Select name="babyChangingStation"
        label="Baby Changing Station?"
        value={form.babyChangingStation}
        autoWidth
        onChange={handleChange}
        >
          
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </Select>
      </FormControl>
 
      <FormControl>
        <InputLabel >Cleanliness</InputLabel>
        <Select name="cleanliness" 
        label="Cleanliness"
        value={form.cleanliness}
        autoWidth 
        onChange={handleChange}
        >
          
          <MenuItem value="very clean">Very clean</MenuItem>
          <MenuItem value="clean">Clean</MenuItem>
          <MenuItem value="average">Average</MenuItem>
          <MenuItem value="dirty">Dirty</MenuItem>
          <MenuItem value="very dirty">Very dirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel >Safety</InputLabel>
        <Select name="safety"
        label="Safety"
        value={form.safety} 
        autoWidth
        onChange={handleChange}
        >
          <MenuItem value="very clean">Very safe</MenuItem>
          <MenuItem value="clean">safe</MenuItem>
          <MenuItem value="average">Average</MenuItem>
          <MenuItem value="dirty">Unsafe</MenuItem>
          <MenuItem value="very dirty">Very unsafe</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default AddDetailsTwo

