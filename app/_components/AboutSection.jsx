import React from 'react';

function AboutSection({ restaurant }) {
  return (
    <div className="mt-5 p-6 bg-white rounded-lg shadow-md">
      <p className="text-gray-600 mb-6">{restaurant.aboutUs}</p>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">Working Hours</h2>
      <p className="text-gray-600 mb-6">{restaurant.workingHours}</p>

      <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">Contact Us</h2>
      <p className="text-gray-600">Phone: +234-704-459-8881</p>
      <p className="text-gray-600">Email: royalspoonfoods4@gmail.com</p>
    </div>
  );
}

export default AboutSection;