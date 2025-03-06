"use client"
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import { usePathname } from 'next/navigation'
import Intro from '../_components/Intro';
import RestroTab from '../_components/RestroTab';

function RestaurantDetails() {

    const param =usePathname();
    const [restaurant, setRestaurant] = useState([]);

    useEffect(()=>{
        GetRestaurantDetail(param.split("/")[2])
    },[])

    const GetRestaurantDetail = (restroSlug)=>{
        GlobalApi.GetBusinessDetail(restroSlug).then(resp=>{
            console.log(resp)
            if(resp?.restaurants && resp.restaurants.length > 0){
                setRestaurant(resp.restaurants[0]);
            }else{
                setRestaurant(null);
            }
        }).catch((error) => {
            console.error("Error", error)
            setRestaurant(null);
        });
    };

    if (!restaurant) {
        return <div>Loading...</div>;
      }
    

  return (
    <div>
        <Intro restaurant={restaurant}/>
        <RestroTab restaurant={restaurant}/>
    </div>
  )
}

export default RestaurantDetails