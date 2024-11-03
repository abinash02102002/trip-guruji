import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import axios from 'axios';



function InfoSection({ trip }) {
const [photoUrl,setPhotoUrl]=useState()
  useEffect(()=>{
   trip&&GetPlacePhoto();},[trip]
)
  const GetPlacePhoto=async()=>{

    const data={
      textQuery:trip?.userSelection?.locations
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name)
      const photoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
      setPhotoUrl(photoUrl);
      
    })
  }
  return (
    <div >
      <img src={photoUrl? photoUrl:'./placeholder.svg'} className='h-[350px] w-full object-cover rounded-xl' />
      <div className='flex  justify-between items-center'>
      <div className='my-5 flex flex-col gap-2'>
        <h2 className='text-3xl font-bold'>{trip?.userSelection?.locations}</h2>
        <div className='flex gap-5'>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-600'>{trip?.userSelection?.noOfdays} Day</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-600'>{trip?.userSelection?.budget} Budget</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-600'>No. of traveller: {trip?.userSelection?.travelers}</h2>
        </div>

      </div>
      <Button><IoIosSend /></Button>
      </div>
    </div>
  )
}

export default InfoSection
