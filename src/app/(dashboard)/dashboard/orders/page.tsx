"use client";
import React from 'react'
import WelcomeSection from '../components/WelcomeSection'
  import { Button } from '@/components/ui/button';
import RevenueChart from '../components/RevenueChart';

const Orders = () => {

  return (
    <>
    <WelcomeSection title='Orders' description='You can manage your orders here.'/> 
    <div className='w-96 h-72'>
      <RevenueChart/>
    </div>
    </>
  )
}

export default Orders;