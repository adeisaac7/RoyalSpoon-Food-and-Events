import { MapPin } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function Intro({ restaurant }) {
  const [totalReview, setTotalReview] = useState(0);
  const [avgRating, setAvgRating] = useState("4.5");

  useEffect(() => {
    if (restaurant?.review?.length) {
      CalculateRating();
    }
  }, [restaurant]);

  const CalculateRating = () => {
    let total = 0;
    let count = 0;

    restaurant.review.forEach((item) => {
      total += item.star;
      count++;
    });

    const result = count > 0 ? (total / count).toFixed(1) : "4.5";
    setTotalReview(count);
    setAvgRating(result);
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {restaurant?.banner?.url ? (
        <Image
          src={restaurant.banner.url}
          width={1000}
          height={300}
          className="w-full h-[220px] object-cover rounded-xl"
          alt="Restaurant banner"
        />
      ) : (
        <div className="h-[120px] w-full bg-slate-200 animate-pulse rounded-xl"></div>
      )}

      <h2 className="text-3xl font-bold mt-2">{restaurant.name}</h2>

      <div className="flex items-center gap-2 mt-2">
        <Image src="/star.png" alt="star" width={20} height={20} />
        <label className="text-gray-500">
          {avgRating} ({totalReview})
        </label>
      </div>

      <h2 className="text-gray-500 mt-2 flex gap-2 items-center">
        <MapPin className="w-7 h-7 min-w-[20px] min-h-[20px] md:w-8 md:h-8 lg:w-9 lg:h-9" />
        {restaurant.address || "Address not available"}
      </h2>
    </div>
  );
}

export default Intro;