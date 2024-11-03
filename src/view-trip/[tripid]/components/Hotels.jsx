import React from 'react';
import { Link } from 'react-router-dom';
import HotelCarditem from './hotelCarditem';

function Hotels({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
      <div className='grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-5'> 
        {trip?.tripData?.hotelOptions?.map((item, index) => (
            <HotelCarditem item={item } index={index} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
