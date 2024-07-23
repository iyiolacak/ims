import Logo from '@/app/(dashboard)/dashboard/components/Logo'
import React from 'react'

const AuthHeader = () => {
  return (
    <div className='w-full h-24 py-5 '>
      <div className='px-8'>
            <Logo size={25} />
      </div>
    </div>
  )
}

export default AuthHeader