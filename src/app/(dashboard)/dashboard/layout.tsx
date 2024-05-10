import NavBar from '@/components/NavBar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <NavBar/>
        <div className='px-12 py-12'>
        {children}
        </div>
    </div>
  )
}

export default Layout