import dynamic from 'next/dynamic'
import React from 'react'

const DynamicMapViewPage = dynamic(() => import('./MapPageComponent'), {
  ssr:false,
})

export default DynamicMapViewPage
