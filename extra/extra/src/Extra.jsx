import React from 'react'

const extra = () => {
  return (
    <div className="bg-blue-700 rounded p-6  ">
        <a className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] rounded"
         href="/party/rastriya-swatantra-party"
          data-discover="true">
          <div
           className="flex items-center justify-between text-sm gap-3">
           <div className="flex items-center gap-2 min-w-0">
            <span className="h-3 w-3 rounded-full shrink-0" 
            >
        </span>
        <img alt="⚡" className="h-5 w-5 object-contain shrink-0" 
        src="https://nepalelectionupdates.com/candidates/signs/rastriya-swatantra-party.jpg"/>
        <span className="font-medium text-grey-400 dark:text-slate-100 truncate group-hover:underline  ">
            Rastriya Swatantra Party</span>
        </div>
        <div className="text-right shrink-0"   >
            <div 
            className="font-semibold text-slate-700 dark:text-slate-200 tabular-nums">
            26,56,802
        </div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
            60 seats
        </div>
        </div>
    </div>
</a>
<div className="mt-2 h-3 w-full rounded-full bg-slate-200 overflow-hidden dark:bg-slate-700">
    <div className="h-3 transition-[width] duration-700 ease-out"
     role="progressbar"
      aria-label="Rastriya Swatantra Party: 49.2%" 
      aria-valuenow="49.17587711074541"
       aria-valuemin="0" 
       aria-valuemax="100">
       </div>
    </div>
    <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
        49.2%
    </div>
    </div>
  )
}

export default extra