'use client'
import AutocompleteAddress from '@/components/mainMV/AddressSearchBox/AutocompleteAddress';
import DynamicSearchBoxComponent from '@/components/mainMV/AddressSearchBox/DynamicSearchBoxComponent';
import AutofillCheckoutDemo from '@/components/mainMV/AddressSearchBox/SearchBoxComponent';
import React from 'react';

export default function TestPage() {
    return (
        <div className='bg-gray-100 mt-10 mx-16'>
            <h1 className="text-6xl text-center py-8">Let&apos;s hope this works</h1>

            <div className='grid grid-cols-1 grid-flow-col mx-60 pb-8'>
                {/* <AutofillCheckoutDemo /> */}
                <DynamicSearchBoxComponent />
                {/* <AutocompleteAddress /> */}
            </div>
        </div>
    )
}