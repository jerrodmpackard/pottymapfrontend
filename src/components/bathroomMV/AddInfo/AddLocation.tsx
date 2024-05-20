import { FormControl, Button, TextField, InputLabel, Select, MenuItem } from '@mui/material'
import { AddressAutofill, AddressMinimap, useConfirmAddress, config } from '@mapbox/search-js-react';
import React, { useState, useCallback, useEffect, useRef } from 'react';

interface Feature {
  geometry: {
    coordinates: number[]
  }
  properties: {
    match_code: {
      confidence: string;
    };
  };
}


const AddLocation = ({ form, setForm, handleChange }: { form: any, setForm: any, handleChange: any }) => {

  const [showMinimap, setShowMinimap] = useState<boolean>(false);
  const [feature, setFeature] = useState<Feature | null>(null);
  const [mapToken, setMapToken] = useState<string>('');
  const [saveLatitude, setSaveLatitude] = useState<number>(0);
  const [saveLongitude, setSaveLongitude] = useState<number>(0);

  useEffect(() => {
    const accessToken: string = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';
    setMapToken(accessToken);
    config.accessToken = accessToken;
  }, []);

  const { formRef, showConfirm } = useConfirmAddress({
    minimap: true,
    skipConfirmModal: (feature: Feature) => {
      return ['exact', 'high'].includes(feature.properties.match_code.confidence);
    },
  });

  const handleRetrieve = useCallback(
    async (res: any) => {
      const feature2: Feature = res.features[0];
      setFeature(feature2);
      setShowMinimap(true);
    },
    [setFeature, setShowMinimap]
  );

  function handleSaveMarkerLocation(coordinate: any) {
    // console.log(`Marker moved to longitude ${JSON.stringify(coordinate[0])}º.`);
    // console.log(`Marker moved to latitude ${JSON.stringify(coordinate[1])}º.`);

    setSaveLongitude(coordinate[0]);
    setSaveLatitude(coordinate[1]);
  }

  useEffect(() => {
    if (feature != null) {
      setSaveLongitude(feature.geometry.coordinates[0]);
      setSaveLatitude(feature.geometry.coordinates[1]);
    }
  }, [feature])

  useEffect(() => {
    setForm({
      ...form,
      longitude: saveLongitude,
      latitude: saveLatitude
    })
  }, [saveLongitude, saveLatitude])

  const handleLocationSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const result = await showConfirm();
      if (result.type === 'nochange') {
        submitForm();
      }
    },
    [showConfirm, submitForm]
  );

  function submitForm() {
    setTimeout(() => {
      // resetForm();
    }, 2500);
  }



  // function resetForm() {
  //   const TextFields = document.querySelectorAll("TextField");
  //   TextFields.forEach((TextField: HTMLTextFieldElement) => (TextField.value = ""));
  //   setShowMinimap(false)
  //   setShowValidationText(false);
  //   setFeature(null);
  // }




  return (

    <form ref={formRef} onSubmit={handleLocationSubmit} autoComplete='off' className='grid grid-cols-2 gap-4 my-4' style={{ zIndex: 2100 }}>

      <AddressAutofill accessToken={mapToken} onRetrieve={handleRetrieve}>
      <FormControl fullWidth>
          <TextField id="mapbox-autofill" name="address"
            label="Address"
            variant="outlined"
            value={form.address}
            // focused
            autoComplete="address-line1"
            autoSave="true"
            onChange={handleChange}
          />
      </FormControl>
      </AddressAutofill>

      <FormControl fullWidth >
        <TextField name="city"
          id="city-form-control"
          label="City"
          variant="outlined"
          // focused
          value={form.city}
          autoSave="true"
          autoComplete="address-level2"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField name="state"
          id="state-form-control"
          label="State / Region"
          variant="outlined"
          // focused
          value={form.state}
          autoComplete="address-level1"
          autoSave="true"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField name="zipCode"
          label="Zip / Postcode"
          variant="outlined"
          id="zip-form-control"
          // focused
          value={form.zipCode}
          autoComplete="postal-code"
          autoSave="true"
          onChange={handleChange}
        />
      </FormControl>

      <div id="minimap-container" className="aspect-[3/2] mobile:aspect-[3/1] relative my-2 col-span-2">
        <AddressMinimap
          canAdjustMarker={true}
          satelliteToggle={true}
          // @ts-ignore
          feature={feature}
          show={showMinimap}
          onSaveMarkerLocation={handleSaveMarkerLocation}
        />
      </div>
     
    </form>

  )
}

export default AddLocation
