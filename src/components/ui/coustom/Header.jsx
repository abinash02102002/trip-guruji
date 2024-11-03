import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import axios from 'axios';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { googleLogout } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { toast } from 'sonner';

export default function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]); // Added user as a dependency for useEffect

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Login Success, Token Response:", tokenResponse);
      GetUserProfile(tokenResponse);
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      toast.error("Google login failed. Please try again.");
    }
  });

  const GetUserProfile = (tokenInfo) => {
    if (!tokenInfo?.access_token) {
      console.error("Access token is missing");
      toast.error("Access token is missing. Please try again.");
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
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error?.response || error.message);
        toast.error("Unable to fetch user profile. Please try again.");
      });
  };

  return (
    <div className='p-7 shadow-md flex justify-between'>
      <div className='flex flex-row'>
        <img className='text-4xl' src='/logo.svg' alt="Trip GuRuJi Logo" />
        <h1 className='text-3xl text-black font-bold'>Trip GuRuJi</h1>
      </div>
      {user ? (
        <div className='flex items-center gap-5'>
          <a href="/create-trip">
          <Button variant='outline' className='rounded-full text-lg font-semibold'>+ create Trip</Button>
          </a>
          <a href="/my-trips">
          <Button variant='outline' className='rounded-full text-lg font-semibold'>My Trip</Button>
          </a>
          <Popover>
            <PopoverTrigger>
              <img src={user?.picture} alt="User Profile" className='h-[35px] w-[35px] rounded-full' />
            </PopoverTrigger>
            <PopoverContent>
              <h2 className='cursor-pointer' onClick={() => {
                googleLogout();
                localStorage.clear();
                window.location.reload();
              }}>Log out</h2>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button className='font-bold text-xl' onClick={() => setOpenDialog(true)}>Sign in</Button>
      )}
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
                <Button onClick={login} className='w-full mt-5'>
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
