"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Confirmation() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [restaurantName, setRestaurantName] = useState('');

  useEffect(() => {
    // Fetch query parameters after the component mounts
    const orderId = searchParams.get('orderId') || 'N/A';
    const totalAmount = searchParams.get('totalAmount') || '0.00';
    const restaurantName = searchParams.get('restaurantName') || 'Royalspoon Foods & Events';

    if (orderId && totalAmount && restaurantName) {
      setOrderId(orderId);
      setTotalAmount(totalAmount);
      setRestaurantName(restaurantName);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Order Confirmed!</h1>
        <p className="text-gray-700 mb-6">
          Thank you for your order at <strong>{restaurantName}</strong>. Your order has been successfully placed.
        </p>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>Order ID:</strong> {orderId}
            </p>
            <p className="text-gray-700">
              <strong>Total Amount:</strong> ₦{totalAmount}
            </p>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          We will send you an email with the details of your order shortly. If you have any questions, please contact us at{' '}
          <a href="mailto:          royalspoonfoods4@gmail.com" className="text-blue-500 hover:underline">
          royalspoonfoods4@gmail.com
          </a>
          .
        </p>

        <Link href="/">
          <Button className="w-full bg-green-600 hover:bg-green-700">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Confirmation;