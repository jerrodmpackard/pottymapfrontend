import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect } from 'react'

const AddDetails = ({ form, handleChange }: { form: any, setForm: any, handleChange: any }) => {

  // useEffect(() => {
  //   console.log(form)
  // }, [form])

  return (
    <div className='grid grid-cols-2 gap-6 my-4'>

      <FormControl className='col-span-2'>
        <TextField name="name"
          label="Name of Bathroom"
          variant="outlined"
          value={form.name}
          autoSave="true"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Gender</InputLabel>
        <Select name="gender"
          label="Gender"
          value={form.gender}
          autoWidth
          autoSave="true"
          onChange={handleChange}
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value="Men&apos;s &amp; Women&apos;s">Men&apos;s &amp; Women&apos;s</MenuItem>
          <MenuItem value="Gender neutral">Gender neutral</MenuItem>
          <MenuItem value="Family restroom">Family restroom</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Type</InputLabel>
        <Select name="type"
          label="Type"
          value={form.type}
          autoWidth
          autoSave="true"
          onChange={handleChange}
        >
          <MenuItem value="Individual">Individual</MenuItem>
          <MenuItem value="Shared">Shared</MenuItem>
        </Select>
      </FormControl>

      <FormControl>

        <TextField name="numberOfStalls"
          label="Number of Stalls"
          variant="outlined"
          value={form.numberOfStalls}
          autoSave="true"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Wheelchair Accessible</InputLabel>
        <Select name="wheelchairAccessibility"
          label="Wheelchair Accessible"
          value={form.wheelchairAccessibility}
          autoWidth
          autoSave="true"
          onChange={handleChange}
        >
          <MenuItem value="Wheelchair accessible">Yes</MenuItem>
          <MenuItem value="Not wheelchair accessible">No</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <TextField name="hoursOfOperation"
          label="Hours of Operation"
          variant="outlined"
          value={form.hoursOfOperation}
          autoSave="true"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Open to Public?</InputLabel>
        <Select name="openToPublic"
          label="Open To Public?"
          value={form.openToPublic}
          autoWidth
          autoSave="true"
          onChange={handleChange}>
          <MenuItem value=""></MenuItem>
          <MenuItem value="Open to public">Yes</MenuItem>
          <MenuItem value="Customers only">Cutomers only</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default AddDetails
