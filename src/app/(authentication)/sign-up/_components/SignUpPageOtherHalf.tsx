import Logo from '@/app/(dashboard)/dashboard/components/Logo';
import React from 'react';

const SignUpPageOtherHalf = () => {
  return (
    <div className='flex w-full h-full bg-primary items-center text-center'>
        <h2 className='flex text-white text-6xl '>
            <span className='ml-12'><Logo size={64}/></span><span className='-ml-9'>
                Hassle-free inventory management.
                </span>
        </h2>
    </div>
  );
}

export default SignUpPageOtherHalf;
