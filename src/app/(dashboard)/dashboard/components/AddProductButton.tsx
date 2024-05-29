"use client";
import { Button } from '@/components/ui/button'
import { PlusCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

const AddProductButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  const addProductRoute = "/dashboard/add-product"

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    router.push(addProductRoute)
  }
  
  return (
    <Button className={`${className}`} onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}>
        <div className='flex flex-row items-center'>
            <PlusCircleIcon size={19} className='mr-2'/>
        Add Product
        </div>
    </Button>
  )
}

export default AddProductButton