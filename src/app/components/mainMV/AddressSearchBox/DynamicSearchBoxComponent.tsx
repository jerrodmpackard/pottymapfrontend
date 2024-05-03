import React from 'react'
import dynamic from 'next/dynamic'

const DynamicSearchBoxComponent = dynamic(() => import('./SearchBoxComponent'), {
    ssr: false,
})

export default DynamicSearchBoxComponent
