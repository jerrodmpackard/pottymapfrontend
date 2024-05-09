import React from 'react'
import dynamic from 'next/dynamic'

const DynamicMapPageComponent = dynamic(() => import('./MapPageComponent'), {
    ssr: false,
})

export default DynamicMapPageComponent
