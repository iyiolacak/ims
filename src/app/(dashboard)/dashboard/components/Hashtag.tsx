import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import React from 'react'
export interface Tag {
    productName: string;
    sold?: number;
    revenue?: number;
}
interface HashtagProps {
    tag: Tag;

}

const Hashtag: React.FC<HashtagProps> = ({ tag }) => {
  return (
    <Button className='group w-content h-content flex items-center border bg-white hover:bg-white rounded-md pl-1 pr-1.5 py-0.5 gap-1 h-full'>
        <div className={clsx('group-hover:bg-slate-200/90 transition-color flex items-center justify-center rounded-sm h-content size-4 bg-slate-200 border p-2', tag.sold && "w-auto px-0.5 *:text-xs")}>
            <p className={clsx('group-hover:text-slate-700 transition-all flex items-center h-full justify-center text-sm text-black font-medium select-none border')}>
                {tag.sold ? <span>{tag.sold.toLocaleString()}</span> : <span>#</span> }
            </p>
    </div>
        <h3 className='group-hover:text-slate-700 text-sm font-semibold text-black'>
            {tag.productName}
        </h3>
    </Button>
  )
}

export default Hashtag