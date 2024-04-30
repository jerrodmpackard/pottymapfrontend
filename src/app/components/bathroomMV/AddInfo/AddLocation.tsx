import { FormControl, Button } from '@mui/material'
import { AddressAutofill, AddressMinimap, useConfirmAddress, config } from '@mapbox/search-js-react';
import React, { useState, useCallback, useEffect, useRef } from 'react';

interface Feature {
  properties: {
      match_code: {
          confidence: string;
      };
  };
}

const AddLocation = ({ form, setForm }: { form: any, setForm: any }, { handleChange }: { handleChange: any }) => {

  
  return (
    <div>
      <div>
        
      </div>

      <div className='grid grid-cols-2 gap-6 my-4'>

      </div>
    </div>
  )
}

export default AddLocation
