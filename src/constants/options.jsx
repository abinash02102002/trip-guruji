import { icons } from "lucide-react";

export const SelectTravelesList =[
    {
        id:1,
        title: 'Just Me',
        desc: 'A sole  traveler in exploration',
        icons:'✈️',
        people :'1'

    },
    {
        id:2,
        title: 'A Couple',
        desc: 'Two travels in tandem',
        icons:'🥂',
        people :'2 People'

    },
    {
        id:3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icons:'🏡',
        people :'3 to 5 people'

    },
    {
        id:4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icons:'🏄',
        people :'5 to 10 people'

    }
]

export const SelectBudgetOptions=[

    {
        id:1,
        title: 'cheap',
        desc: 'Stay conscious of costs',
        icons:'💴',
     
    },
    {
        id:2,
        title: 'moderate',
        desc: 'keep cost on the average side',
        icons:'💰',
     
    },
    {
        id:3,
        title: 'Luxury',
        desc: 'Dont  worry about the cost',
        icons:'💸',
     
    }
]

export const AI_PROMPT=`Generate Travel Plan for Location: {location} , for {totalDays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.`