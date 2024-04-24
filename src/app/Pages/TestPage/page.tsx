'use client'
import AutocompleteAddress from '@/app/components/mainMV/AddressSearchBox/AutocompleteAddress';
import AutofillCheckoutDemo from '@/app/components/mainMV/AddressSearchBox/SearchBoxComponent';
import React from 'react';

export default function TestPage() {
    return (
        <>
            <h1 className="text-6xl text-center">Let's hope this works</h1>

            <div className='flex justify-center'>
                <AutofillCheckoutDemo />
                {/* <AutocompleteAddress /> */}
            </div>
        </>
    )
}