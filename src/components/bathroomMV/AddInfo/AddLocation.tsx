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
    console.log(`Marker moved to longitude ${JSON.stringify(coordinate[0])}º.`);
    console.log(`Marker moved to latitude ${JSON.stringify(coordinate[1])}º.`);
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

  useEffect(() => {
    console.log(form)
  }, [form])

  // function resetForm() {
  //   const TextFields = document.querySelectorAll("TextField");
  //   TextFields.forEach((TextField: HTMLTextFieldElement) => (TextField.value = ""));
  //   setShowMinimap(false)
  //   setShowValidationText(false);
  //   setFeature(null);
  // }




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

      <div className='hidden'>

      </div>

    </form>

  )
}

export default AddLocation
