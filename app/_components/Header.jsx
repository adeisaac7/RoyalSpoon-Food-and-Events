"use client"; 
import { Button } from '@/components/ui/button';
import { SignInButton, SignOutButton, SignUpButton, useUser } from '@clerk/nextjs';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { CartUpdateContext } from '../_context/CartUpdateContext';
import GlobalApi from '../_utils/GlobalApi';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Cart from './Cart';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      GetUserCart();
    } else {
      setCart([]);
      localStorage.removeItem('cart');
    }
  }, [user, updateCart]);

  const GetUserCart = async () => {
    try {
      const resp = await GlobalApi.GetUserCart(user?.primaryEmailAddress?.emailAddress);
      setCart(resp?.userCarts || []);
      localStorage.setItem('cart', JSON.stringify(resp?.userCarts || []));
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  return (
    <div className='flex justify-between items-center px-4 md:px-6 py-4 shadow-sm bg-white w-full'>
      {/* Logo at the extreme left */}
      <Link href='/'>
        <Image
          src="/logo.png"
          alt="LOGO"
          width={70}
          height={70}
          className="w-14 h-14 md:w-20 md:h-20 cursor-pointer"
        />
      </Link>

      {/* Cart and User Menu */}
      <div className='flex items-center gap-4'>
        {isSignedIn ? (
          <>
            {/* Cart */}
            <Popover>
              <PopoverTrigger asChild>
                <div className='flex items-center gap-2 cursor-pointer'>
                  <ShoppingCart className='w-5 h-5 md:w-6 md:h-6' />
                  <span className='p-1 px-2 rounded-full bg-slate-200 text-xs md:text-sm'>{cart?.length || 0}</span>
                </div>
              </PopoverTrigger>
              <PopoverContent className='w-full'>
                <Cart cart={cart} />
              </PopoverContent>
            </Popover>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src={user?.imageUrl}
                  alt='User Avatar'
                  width={30}
                  height={30}
                  className='rounded-full w-8 h-8 md:w-9 md:h-9'
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={'/user'}>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href={'/user#/my-orders'}>
                  <DropdownMenuItem>My Orders</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <SignOutButton>Logout</SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className='flex gap-2 md:gap-3'>
            <SignInButton mode='modal'>
              <Button variant="outline" className='text-xs md:text-sm px-3 py-1'>Login</Button>
            </SignInButton>
            <SignUpButton mode='modal'>
              <Button className='text-xs md:text-sm px-3 py-1'>Sign Up</Button>
            </SignUpButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
