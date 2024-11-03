import { db } from '@/service/firebaseConfig'
import { getDoc ,doc} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import { toast } from 'sonner';
import InfoSection from './components/InfoSection';
import { useParams } from 'react-router-dom';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';

function ViewTrip() {
  const { tripid } = useParams();

  const [trip, setTrip] = React.useState([])


  useEffect(() => {
    tripid && GetTripData();
  }, [tripid])

  const GetTripData = async () => {
    const docRef = doc(db, 'AllTrips', tripid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Doccument:", docSnap.data())
      setTrip(docSnap.data())
    } else {
      console.log("no such data")
      toast('No trip Found')
    }
  }

  return (
    <div className='p-10  md:px-20 lg:px-44 xl:px-56'>
      <h1>{tripid}</h1>
      {/*information section*/}

      <InfoSection trip={trip} />
      {/*Recommended Hotel*/}
         <Hotels trip={trip}/>

      {/*daily plan*/}
        <PlacesToVisit trip={trip}/>

    </div>
  )
}

export default ViewTrip

