import axios from "axios";

// Define the base URL
const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';
//https://places.googleapis.com/v1/places:searchText'

// Retrieve the API key from the environment variables
const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

// Configure headers
const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': [
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
};

// Function to get place details
export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);
export const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY 