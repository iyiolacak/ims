import React from 'react'
interface CardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    actionComponent?: React.ReactNode;
}
const FormCard: React.FC<CardProps> = ({ title, children, className, actionComponent }) => {
  return (
        // container
        <div className={`${className} flex flex-col border-[1.5px] border-slate-200 bg-white rounded-xl w-full shadow-sm`}>
        {/* title */}
        <div className="flex items-center text-start border-b border-slate-200">
          <div className="w-full flex items-center justify-between px-4 py-4">
            <h2 className="text-slate-900 font-semibold text-md">{title}</h2>
            {actionComponent && <div>{actionComponent}</div>}
          </div>
        </div>
        <div className="flex flex-col px-6 py-5">
          {/* Scrollable div */}
          {children}
        </div>
      </div>
)
}

export default FormCard