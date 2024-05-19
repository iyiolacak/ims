import React from 'react'
interface HashtagProps {
    HashtagName: string;
}

const Hashtag = ({ HashtagName }: HashtagProps) => {
  return (
    <div className='w-content flex items-center border bg-white rounded-md pl-1 pr-1.5 py-0.5 gap-1'>
        <div className='flex items-center justify-center rounded-sm h-content size-4 bg-slate-200 border p-2'>
            <p className='flex items-center h-full justify-center text-sm text-black font-medium select-none'>
                #
            </p>
        </div>
        <h3 className='text-sm font-semibold text-black'>
            {HashtagName}
        </h3>
    </div>
  )
}

export default Hashtag