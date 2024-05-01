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


const AddLocation = ({ formInputs, setFormInputs } : { formInputs: any, setFormInputs: any }, { handleChange }: { handleChange: any }) => {

  const [showMinimap, setShowMinimap] = useState<boolean>(false);
  const [feature, setFeature] = useState<Feature | null>(null);
  const [showValidationText, setShowValidationText] = useState<boolean>(false);
  const [mapToken, setMapToken] = useState<string>('');

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
      setShowMinimap(true);
    },
    [setFeature, setShowMinimap]
  );

  function handleSaveMarkerLocation(coordinate: any) {
    console.log(`Marker moved to longitude ${JSON.stringify(coordinate[0])}º.`);
    console.log(`Marker moved to latitude ${JSON.stringify(coordinate[1])}º.`);
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const result = await showConfirm();
      if (result.type === 'nochange') {
        submitForm();
      }
    },
    [showConfirm]
  );

  function submitForm() {
    setShowValidationText(true);
    setTimeout(() => {
      resetForm();
    }, 2500);
  }

  function resetForm() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input: HTMLInputElement) => (input.value = ""));
    setShowMinimap(false)
    setShowValidationText(false);
    setFeature(null);
  }

  const hideBtns = () => {
    setShowMinimap(false)
  }

  const completeStep = () => {

  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-6 my-4' style={{zIndex: 2100}}>
          <FormControl >
            <label className="text-sm font-bold text-gray-700 mb-3">Address</label>
            <AddressAutofill accessToken={mapToken} onRetrieve={handleRetrieve}>
              <input
                className="w-full h-10 px-3 py-2 rounded mb-3 border-2"
                placeholder="Start typing your address, e.g. 123 Main..."
                autoComplete="address-line1"
                id="mapbox-autofill"
              />
            </AddressAutofill>
          </FormControl>

          <FormControl>
            <label className="text-sm font-bold text-gray-700 mb-3">City</label>
            <input className="w-full h-10 px-3 py-2 rounded mb-3 border-2" placeholder="City" autoComplete="address-level2" />
          </FormControl>

          <FormControl>
            <label className="text-sm font-bold text-gray-700 mb-3">State / Region</label>
            <input className="w-full h-10 px-3 py-2 rounded mb-3 border-2" placeholder="State / Region" autoComplete="address-level1" />
          </FormControl>

          <FormControl>
            <label className="text-sm font-bold text-gray-700 mb-3">ZIP / Postcode</label>
            <input className="w-full h-10 px-3 py-2 rounded mb-3 border-2" placeholder="ZIP / Postcode" autoComplete="postal-code" />
          </FormControl>
        </div>

        <div className='gap-6'>
          <div id="minimap-container" className="h-64 w-full relative my-2">
            <AddressMinimap
              canAdjustMarker={true}
              satelliteToggle={true}
              // @ts-ignore
              feature={feature}
              show={showMinimap}
              onSaveMarkerLocation={handleSaveMarkerLocation}
            />
          </div>
          
          <div className={showMinimap ? 'grid grid-cols-2 gap-6 mt-10 mb-2': 'hidden' }>
            <Button variant="contained" type='submit' className='mr-3' onClick={hideBtns}>Add Location</Button>
            <Button variant='outlined' type="button" color='info' className="ml-3" onClick={resetForm}>Reset</Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default AddLocation
