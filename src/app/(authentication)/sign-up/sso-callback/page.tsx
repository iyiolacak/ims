"use client"
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import React from 'react'

const SSOCallback = () => {
  return (
    <AuthenticateWithRedirectCallback/>
  )
}

export default SSOCallback