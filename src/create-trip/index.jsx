import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import Loader from '@/components/ui/loader';
import { useNavigate } from 'react-router-dom';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [token, setToken] = useState(null);  // Store access token
  const [loading , setLoading] = useState(false);
  const [place , setPlace]=useState();
const navigate =useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Login Success, Token Response:", tokenResponse);
      setToken(tokenResponse?.access_token);  // Store token for debugging
      GetUserProfile(tokenResponse);  // Call profile fetch function on login success
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      toast.error("Google login failed. Please try again.");
    }
  });
  
  const GetUserProfile = (tokenInfo) => {
    if (!tokenInfo?.access_token) {
      console.error("Access token is missing");
      return;
    }

    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: 'application/json',
        },
      })
      .then((response) => {
        const userProfile = response.data;
        console.log("User Profile:", userProfile);
        localStorage.setItem('user', JSON.stringify(userProfile));
        setOpenDialog(false);
        OnGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error?.response || error.message);
        toast.error("Unable to fetch user profile. Please try again.");
      });
  };

  const OnGenerateTrip = async () => {
    setLoading(true)
    const user = localStorage.getItem('user');
    if (!user) {
      console.warn("User not logged in. Opening dialog.");
      setOpenDialog(true);
      return;
    }

    if (!formData?.noOfdays || !formData?.locations || !formData?.budget || !formData?.travelers) {
      toast.error("Please fill in all details");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.locations)
      .replace('{totalDays}', formData?.noOfdays)
      .replace('{traveler}', formData?.travelers)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfdays);
      console.log(FINAL_PROMPT)

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("AI Response:", result?.response?.text());
      setLoading(false)
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("Error in generating trip:", error);
      toast.error("Failed to generate trip plan. Please try again.");
    }
  };
  const SaveAiTrip=async(tripData)=>{

    setLoading(true)
    const user=JSON.parse(localStorage.getItem('user'));
    const docId=Date.now().toString()

    await setDoc(doc(db , "AllTrips", docId),{
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail:user?.email,
      id:docId
    });
    setLoading(false)
    navigate('/view-trip/'+docId)
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className='mt-20 my-3 flex-col gap-10'>
        {/* Destination Input */}
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <GooglePlacesAutocomplete 
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{place,
               onChange:(v)=>{ setPlace(v) ; handleInputChange('locations', v)}}}
          />
        </div>

        {/* Trip Duration Input */}
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning for your trip?</h2>
          <Input 
            type="number" 
            placeholder="Ex. 3"
            onChange={(e) => handleInputChange('noOfdays', e.target.value)}
          />
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div 
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget === item.title && 'shadow-lg border-black'}`}
              >
                <h2 className='text-4xl'>{item.icons}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers Selection */}
        <div>
          <h2 className='text-xl my-3 font-medium'>Who will you be traveling with?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item, index) => (
              <div 
                key={index}
                onClick={() => handleInputChange('travelers', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.travelers === item.people && 'shadow-lg border-black'}`}
              >
                <h2 className='text-4xl'>{item.icons}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Trip Button */}
      
      <div className='my-5 flex justify-end'>
        
         <Button className='text-lg hover:bg-red-400' disabled={loading} onClick={OnGenerateTrip}>
          {loading? 
         <Loader /> : 'Generate Trip'}

        </Button>
      </div>

      {/* Google Login Dialog */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div>
                <div className='flex flex-row justify-center'>
                  <img className='text-4xl' src='/logo.svg' alt="Trip GuRuJi Logo" />
                  <h1 className='text-3xl text-black font-bold'>Trip GuRuJi</h1>
                </div>
                <h2 className='text-xl font-bold mt-7 flex justify-center'>Sign in with Google</h2>
                <Button onClick={login}
                
                className='w-full mt-5'>
          
                  <FcGoogle className='h-10 w-10' />
                  Sign in with Google
                
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
