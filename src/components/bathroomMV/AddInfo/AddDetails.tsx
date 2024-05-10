import { FormControl, TextField } from '@mui/material'
import React from 'react'

const AddDetails = ({form, setForm, handleChange} : {form:any , setForm:any, handleChange:any}) => {

  return (
    <div className='grid grid-cols-2 gap-6 my-4'>

      <FormControl>
        <label className="text-sm font-bold text-gray-700 mb-3">Gender</label>
        <select name="gender" className="w-full h-10 rounded mb-3" onChange={handleChange}>
          <option value=""></option>
          <option value="mens & womens">Men&apos;s and Women&apos;s</option>
          <option value="gender neutral">Gender neutral</option>
          <option value="family restroom">Family restroom</option>
        </select>
      </FormControl>

      <FormControl>
        <label className="text-sm font-bold text-gray-700 mb-3">Type</label>
        <select name="type" className="w-full h-10 rounded mb-3" onChange={handleChange}>
          <option value=""></option>
          <option value="individual">Individual</option>
          <option value="shared">Shared</option>
        </select>
      </FormControl>

      <FormControl>
        <label className="text-sm font-bold text-gray-700 mb-3">Number of stalls</label>
        <input name="numberOfStalls" className="w-full h-10 px-3 py-2 rounded mb-3 border-2" placeholder="Enter number of stalls"  onChange={handleChange}/>
      </FormControl>

      <FormControl>
      <label className="text-sm font-bold text-gray-700 mb-3">Wheelchair accessible</label>
      <select name="wheelChair" className="w-full h-10 rounded mb-3" onChange={handleChange}>
        <option value=""></option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      </FormControl>

      <FormControl>
        <label className="text-sm font-bold text-gray-700 mb-3">Hours of operation</label>
        <input className="w-full h-10 px-3 py-2 rounded mb-3 border-2"  placeholder="8:30am - 12:30pm" onChange={handleChange} />
        
      </FormControl>

      <FormControl>
      <label className="text-sm font-bold text-gray-700 mb-3">Open to public</label>
      <select name="openTo" className="w-full h-10 rounded mb-3" onChange={handleChange}>
          <option value=""></option>
          <option value="yes">Yes</option>
          <option value="no">Cutomers only</option>
      </select>
      </FormControl>      
    </div>
  )
}

export default AddDetails
