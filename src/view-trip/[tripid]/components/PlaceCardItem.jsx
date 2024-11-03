import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React from 'react'
import { FaLocationCrosshairs } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
function PlaceCardItem({place}) {
  const [photoUrl,setPhotoUrl]=useState()
  useEffect(()=>{
 place&&GetPlacePhoto();},[place]
)
  const GetPlacePhoto=async()=>{

    const data={
      textQuery:place.placeName
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name)
      const photoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
      setPhotoUrl(photoUrl);
      
    })
  }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName}>
    <div className='shadow-md border rounded-xl p-3 mt-5 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
<img src={photoUrl? photoUrl:'./placeholder.svg'} className='w-[140px] h-[140px] object-cover rounded-xl'/>
<div>
    <h2 className='font-bold text-lg'>{place.placeName}</h2>
    <p className='text-sm text-gray-500'>{place.placeDetails}</p>
   <div className='flex justify-between'>
    <h2 className='mt-3 font-semibold text-red-500'>🕗{place.time}</h2>
    <h2 className='mt-3 font-semibold text-gray-700'><span className='text-2xl'>🎫</span>{place.ticketPricing}</h2>
  
    </div>
</div>
    </div>
    </Link>
  )
}

export default PlaceCardItem
