import { FormControl } from '@mui/material'
import React from 'react'

const AddDetails = ({form, setForm} : {form: any, setForm:any}) => {
  return (
    <div className='grid grid-cols-2 gap-6 my-4'>

      <FormControl>
        <label className="text-sm font-bold text-gray-700 mb-3">Gender</label>
        <select className="w-full h-10 rounded mb-3">
          <option value="mens & womens">Men's and Women's</option>
          <option value="gender neutral">Gender neutral</option>
          <option value="family restroom">Family restroom</option>
        </select>
      </FormControl>

      <FormControl>
        <label className="text-sm font-bold text-gray-700 mb-3">Type</label>
        <select className="w-full h-10 rounded mb-3">
          <option value="individual">Individual</option>
          <option value="shared">Shared</option>
        </select>
      </FormControl>

      <FormControl>
        <label className="text-sm font-bold text-gray-700 mb-3">Number of stalls</label>
        <input className="w-full h-10 px-3 py-2 rounded mb-3" placeholder="Enter number of stalls" />
      </FormControl>

      <FormControl>
      <label className="text-sm font-bold text-gray-700 mb-3">Wheelchair accessible</label>
      <select className="w-full h-10 rounded mb-3">
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      </FormControl>

      <FormControl>
        <label className="text-sm font-bold text-gray-700 mb-3">Hours of operation</label>
        <input className="w-full h-10 px-3 py-2 rounded mb-3" placeholder="Enter hours of operation" />
      </FormControl>

      <FormControl>
      <label className="text-sm font-bold text-gray-700 mb-3">Open to public</label>
      <select className="w-full h-10 rounded mb-3">
          <option value="yes">Yes</option>
          <option value="no">Cutomers only</option>
      </select>
      </FormControl>      
    </div>
  )
}

export default AddDetails
