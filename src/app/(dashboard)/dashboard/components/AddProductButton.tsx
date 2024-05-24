import { Button } from '@/components/ui/button'
import { PlusCircleIcon } from 'lucide-react'
import React from 'react'

const AddProductButton = ({ className }: { className?: string }) => {
  return (
    <Button className={`${className}`}>
        <div className='flex flex-row items-center'>
            <PlusCircleIcon size={19} className='mr-2'/>
        Add Product
        </div>
    </Button>
  )
}

export default AddProductButton