import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const AddDetailsTwo = ({ form, handleChange }: { form: any, setForm: any, handleChange: any }) => {
  return (
    <div className='grid grid-cols-2 gap-6 my-4'>
      <FormControl>
        <InputLabel >Key Required?</InputLabel>
        <Select name="keyRequired"
          label="Key Required?"
          value={form.keyRequired}
          autoWidth
          autoSave="true"
          onChange={handleChange}
        >
          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
          <MenuItem value="Code required">Code required</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel >Baby Changing Station?</InputLabel>
        <Select name="babyChangingStation"
          label="Baby Changing Station?"
          value={form.babyChangingStation}
          autoWidth
          autoSave="true"
          onChange={handleChange}
        >

          <MenuItem value="Yes">Yes</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel >Cleanliness</InputLabel>
        <Select name="cleanliness"
          label="Cleanliness"
          value={form.cleanliness}
          autoWidth
          autoSave="true"
          onChange={handleChange}
        >

          <MenuItem value="Very clean">Very clean</MenuItem>
          <MenuItem value="Clean">Clean</MenuItem>
          <MenuItem value="Average">Average</MenuItem>
          <MenuItem value="Dirty">Dirty</MenuItem>
          <MenuItem value="Very dirty">Very dirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel >Safety</InputLabel>
        <Select name="safety"
          label="Safety"
          value={form.safety}
          autoWidth
          autoSave="true"
          onChange={handleChange}
        >
          <MenuItem value="Very safe">Very safe</MenuItem>
          <MenuItem value="Safe">Safe</MenuItem>
          <MenuItem value="Average">Average</MenuItem>
          <MenuItem value="Unsafe">Unsafe</MenuItem>
          <MenuItem value="Very unsafe">Very unsafe</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default AddDetailsTwo

