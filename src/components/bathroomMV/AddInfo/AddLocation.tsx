import { FormControl, Button, TextField } from '@mui/material'
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
  const [showValidationText, setShowValidationText] = useState<boolean>(false);
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
    (res: any) => {
      const feature: Feature = res.features[0];
      setFeature(feature);
      setSaveLongitude(feature.geometry.coordinates[0]);
      setSaveLatitude(feature.geometry.coordinates[1]);
      console.log(feature);
      setShowMinimap(true);
    },
    [setFeature, setShowMinimap]
  );

    function handleSaveMarkerLocation(coordinate: any) {
      console.log(`Marker moved to longitude ${JSON.stringify(coordinate[0])}º.`);
      console.log(`Marker moved to latitude ${JSON.stringify(coordinate[1])}º.`);
    }

    useEffect(() => {
      console.log(`Longitude: ${saveLongitude}`);
      console.log(`Latitude: ${saveLatitude}`);
    }, [saveLatitude, saveLongitude])

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
    setShowValidationText(true);
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

  const hideBtns = () => {
    setShowMinimap(false)
  }

  const completeStep = () => {

  }

  return (

    <form ref={formRef} onSubmit={handleLocationSubmit}>
      <div className='grid grid-cols-2 gap-6 my-4' style={{ zIndex: 2100 }}>
        <FormControl>
          <AddressAutofill accessToken={mapToken} onRetrieve={handleRetrieve}>
            <TextField id="mapbox-autofill" name="address"
              label="Address"
              variant="outlined"
              value={form.address}
              margin="normal"
              autoComplete="address-line1"
              autoSave="true"
              onChange={handleChange}
            />
          </AddressAutofill>
        </FormControl>

        <FormControl className='w-full p-2'>
          <TextField name="city"
            label="City"
            variant="outlined"
            margin="normal"
            value={form.city}
            autoSave="true"
            autoComplete="address-level2"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl className='w-full p-2'>
          <TextField name="state"
            label="State / Region"
            variant="outlined"
            value={form.state}
            autoComplete="address-level1"
            autoSave="true"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <TextField name="zipCode"
            label="Zip / Postcode"
            variant="outlined"
            value={form.zipCode}
            autoComplete="postal-code"
            autoSave="true"
            onChange={handleChange}
          />
        </FormControl>

        <div id="minimap-container" className="h-64 w-full relative my-2 col-span-2">
          <AddressMinimap
            canAdjustMarker={true}
            satelliteToggle={true}
            // @ts-ignore
            feature={feature}
            show={showMinimap}
            onSaveMarkerLocation={handleSaveMarkerLocation}
          />
        </div>
      </div>


      {/* <div className={showMinimap ? 'grid grid-cols-2 gap-6 mt-10 mb-2': 'hidden' }>
          <Button variant="contained" type='submit' className='mr-3' onClick={hideBtns}>Add Location</Button>
          <Button variant='outlined' type="button" color='info' className="ml-3" onClick={resetForm}>Reset</Button>
        </div> */}

    </form>

  )
}

export default AddLocation
