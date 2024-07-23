import React from 'react'
import { Skeleton } from '../ui/skeleton'

const UserMenuButtonSkeleton = () => {
  return (
    <div className="h-[60px] w-full">
    <div className="flex h-full w-full flex-col rounded-xl border bg-white px-2">
      <div className="flex h-full items-center space-x-2">
        <Skeleton className="h-10 w-10 rounded-xl bg-slate-200" />
        <div className="flex flex-col space-y-1">
          <Skeleton className="h-4 w-24 rounded bg-slate-200" />
          <Skeleton className="h-3 w-32 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  </div>
)
}

export default UserMenuButtonSkeleton