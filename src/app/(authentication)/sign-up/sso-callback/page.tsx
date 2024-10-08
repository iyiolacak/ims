"use client";
import { useSignUpContext } from '@/context/BaseAuthContext';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import React from 'react';
import LoadingCircle from '../_components/LoadingCircle';

const SSOCallback = () => {
  return (
    <div className='flex flex-grow min-w-max h-full items-center justify-center'>
      <div className='flex flex-row items-center'>
        <span className="mr-2">
          <LoadingCircle color='#707070 ' size={65}/>
        </span>
      </div>
      <AuthenticateWithRedirectCallback />
    </div>
  );
};

export default SSOCallback;
