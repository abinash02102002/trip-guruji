import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  return (
    <div className=''>
      <h2 className='font-bold text-lg'>Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary && Object.entries(trip.tripData.itinerary).map(([dayKey, dayData]) => (
          <div key={dayKey} >
            <h2 className=' text-xl text-center font-bold'>{dayKey.charAt(0).toUpperCase() + dayKey.slice(1)}</h2>
            <h2 className='text-center'> best Time: {dayData.bestTime}</h2>
            <div className='grid grid-cols-2 gap-5'>
            {dayData.plan.map((place) => (
              <div key={place.placeName}>
                
                <PlaceCardItem  place={place}/>
              </div>
            ))}
            </div>
             {/* Line separator between days */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
