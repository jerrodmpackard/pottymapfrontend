import { FormControl } from '@mui/material'
import React from 'react'

const AddDetailsTwo = ({form, setForm, handleChange} : {form:any , setForm:any, handleChange:any}) => {
  return (
    <div className='grid grid-cols-2 gap-6 my-4'>
      <FormControl>
        <label className="text-sm font-bold text-gray-700 mb-3">Key required</label>
        <select name="needKey" className="w-full h-10 rounded mb-3 border-sky-800" onChange={handleChange}>
          <option value=""></option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="code">Code required</option>
        </select>
      </FormControl>

      <FormControl>
        <label className="text-sm font-bold text-gray-700 mb-3">Baby changing station</label>
        <select name="babyStation" className="w-full h-10 rounded mb-3" onChange={handleChange}>
          <option value=""></option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </FormControl>
 
      <FormControl>
        <label className="text-sm font-bold text-gray-700 mb-3">Cleanliness</label>
        <select name="cleanliness" className="w-full h-10 rounded mb-3" onChange={handleChange}>
          <option value=""></option>
          <option value="very clean">Very clean</option>
          <option value="clean">Clean</option>
          <option value="average">Average</option>
          <option value="dirty">Dirty</option>
          <option value="very dirty">Very dirty</option>
        </select>
      </FormControl>

      <FormControl>
        <label className="text-sm font-bold text-gray-700 mb-3">Safety</label>
        <select name="safety" className="w-full h-10 rounded mb-3" onChange={handleChange}>
          <option value=""></option>
          <option value="very clean">Very safe</option>
          <option value="clean">safe</option>
          <option value="average">Average</option>
          <option value="dirty">Unsafe</option>
          <option value="very dirty">Very unsafe</option>
        </select>
      </FormControl>
    </div>
  )
}

export default AddDetailsTwo

