import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Createtrip from './create-trip'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './components/ui/coustom/Header'
import { Toaster } from './components/ui/sonner'
//import { Auth0Provider } from '@auth0/auth0-react';
//import { GoogleAuthProvider } from 'firebase/auth'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Import } from 'lucide-react'
import viewtrip from './view-trip/[tripid]/index.jsx'
import ViewTrip from './view-trip/[tripid]/index.jsx'
import myTrip from './my-trips'
import MyTrip from './my-trips'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: <Createtrip />
  },
  {
    path: '/view-trip/:tripid',
    element: <ViewTrip />
  },
 
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID} >

      <Header />
      <Toaster />
      <RouterProvider router={router} />

    </GoogleOAuthProvider>
  </StrictMode>
)
