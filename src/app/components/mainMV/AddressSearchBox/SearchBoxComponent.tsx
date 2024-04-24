import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AddressAutofill, AddressMinimap, useConfirmAddress, config } from '@mapbox/search-js-react';

interface Feature {
    properties: {
        match_code: {
            confidence: string;
        };
    };
}

export default function AutofillCheckoutDemo() {
    const [showFormExpanded, setShowFormExpanded] = useState<boolean>(false);
    const [showMinimap, setShowMinimap] = useState<boolean>(false);
    const [feature, setFeature] = useState<Feature | null>(null);
    const [showValidationText, setShowValidationText] = useState<boolean>(false);
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        const accessToken: string = 'NEXT_PUBLIC_MAPBOX_TOKEN';
        setToken(accessToken);
        config.accessToken = accessToken;
    }, []);

    const formRef = useRef<HTMLFormElement>(null);

    const { showConfirm } = useConfirmAddress({
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
            setShowFormExpanded(true);
        },
        [setFeature, setShowMinimap]
    );

    function handleSaveMarkerLocation(coordinate: any) {
        console.log(`Marker moved to ${JSON.stringify(coordinate)}.`);
    }

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            const result = await showConfirm();
            if (result.type === 'nochange') submitForm();
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
        setShowFormExpanded(false);
        setShowValidationText(false);
        setFeature(null);
    }

    return (
        <>
            <form ref={formRef} className="flex flex-col" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <div className="w-full">
                        {/* Input form */}
                        <label className="text-sm font-bold text-gray-700 mb-3">Address</label>
                         {/* @ts-ignore */}
                        <AddressAutofill accessToken={token} onRetrieve={handleRetrieve}>
                            <input
                                className="input mb-3"
                                placeholder="Start typing your address, e.g. 123 Main..."
                                autoComplete="address-line1"
                                id="mapbox-autofill"
                            />
                        </AddressAutofill>
                        {!showFormExpanded && (
                            <div
                                id="manual-entry"
                                className="w-180 mt-2 text-sm text-gray-600 border-b border-gray-400 hover:border-black cursor-pointer"
                                onClick={() => setShowFormExpanded(true)}
                            >
                                Enter an address manually
                            </div>
                        )}
                        <div className="secondary-inputs" style={{ display: showFormExpanded ? 'block' : 'none' }}>
                            <label className="text-sm font-bold text-gray-700 mb-3">Address Line 2</label>
                            <input className="input mb-3" placeholder="Apartment, suite, unit, building, floor, etc." autoComplete="address-line2" />
                            <label className="text-sm font-bold text-gray-700 mb-3">City</label>
                            <input className="input mb-3" placeholder="City" autoComplete="address-level2" />
                            <label className="text-sm font-bold text-gray-700 mb-3">State / Region</label>
                            <input className="input mb-3" placeholder="State / Region" autoComplete="address-level1" />
                            <label className="text-sm font-bold text-gray-700 mb-3">ZIP / Postcode</label>
                            <input className="input" placeholder="ZIP / Postcode" autoComplete="postal-code" />
                        </div>
                    </div>
                    <div className="w-full">
                        {/* Visual confirmation map */}
                        <div id="minimap-container" className="h-64 w-96 relative mt-4">
                            {/* @ts-ignore */}
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
                </div>

                {/* Form buttons */}
                {showFormExpanded && (
                    <div className="mb-8">
                        <button type="submit" className="btn btn-primary mr-3">
                            Confirm
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={resetForm}>
                            Reset
                        </button>
                    </div>
                )}
            </form>

            {/* Validation text */}
            {showValidationText && <div id="validation-msg" className="mt-6 text-md font-bold">Order successfully submitted.</div>}
        </>
    );
}
