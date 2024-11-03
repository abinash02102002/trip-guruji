import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React from 'react'
import { Link } from 'react-router-dom'
import { useState ,useEffect} from 'react';
function HotelCarditem({ item , index}) {
    const [photoUrl,setPhotoUrl]=useState()
  useEffect(()=>{
 item&&GetPlacePhoto();},[item]
)
  const GetPlacePhoto=async()=>{

    const data={
      textQuery:item?.hotelName
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name)
      const photoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
      setPhotoUrl(photoUrl);
      
    })
  }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+item.hotelName+','+item.hotelAddress}>
          <div key={index} className='hover:scale-110 transition-all cursor-pointer' > 
            <img src={photoUrl? photoUrl:'./placeholder.svg'} className='rounded-xl h-[200px] w-full object-cover'/>
            <div className='flex flex-col'>
                <h2 className='font-bold'>{item.hotelName}</h2>
                <h2 className='text-xs text-gray-500'>📍{item.hotelAddress}</h2>
                <h2 className='text-sm font-semibold'>💰{item.price}</h2>
                <h2 className='text-sm'>⭐{item.rating}</h2>
            </div>
          </div>
          </Link>
  )
}

export default HotelCarditem
