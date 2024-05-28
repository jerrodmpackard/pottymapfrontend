import { getFavoritesByUserID } from '@/utils/DataServices';
import React, { useEffect, useState } from 'react'

const FavList = ({selectedMarkerData}: {selectedMarkerData: any}) => {

  const [favorites, setFavorites] = useState();

  useEffect(() => {
    const getData = async () => {
      // setFavorites(await getFavoritesByUserID(selectedMarkerData?.userId));
    }
  }, [])


  return (
    <div>
      <h1>Favorites coming soon!</h1>
    </div>
  )
}

export default FavList
