"use client";
import React from 'react'
import WelcomeSection from '../components/WelcomeSection'
import { Authenticated, Unauthenticated, useConvexAuth, useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api';
import { useAuth } from '@clerk/clerk-react';

const Analytics = () => {
  
  const user = useQuery(api.users.current, {})
  console.log(user);
  const { isLoading, isAuthenticated } = useConvexAuth()
  return (
    <>
    <WelcomeSection/> 
    <Unauthenticated>
      <div>
      authorize
      </div>
    </Unauthenticated>
    <Authenticated>
      <div>
      askgsakg
      </div>
    </Authenticated>
    {isLoading}
    {isAuthenticated}
    </>
  )
}

export default Analytics