import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useNavigation } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrip() {

    const navigation = useNavigation();
    const [userTrips, setUserTrips] = React.useState([]);
    useEffect(()=>{
        GetUserTrips();
    })
    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigation('/');
            return;
        }
     
        const q = query(collection(db, 'AllTrips'), where('userEmail','==',user?.email))
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, '=', doc.data());
            setUserTrips(prevVal=>[...prevVal,doc.data()])
        });   


    }
    return (
<div>
    <h1>we are working on it</h1>
</div>
    )
}

export default MyTrip
