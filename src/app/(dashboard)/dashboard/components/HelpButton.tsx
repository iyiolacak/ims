import { HelpCircleIcon, SparkleIcon, Sparkles } from 'lucide-react'
import React from 'react'

const HelpButton = () => {
  return (
    <button className="bg-neutral-200 text-black  flex flex-row mt-2 p-1 pl-0.5 whitespace-nowrap group transition-all w-min rounded-lg max-w-content font-semibold hover:bg-neutral-100 hover:text-black/80">
    <HelpCircleIcon size={16} className="mr-1"/>Need help?
    </button>
)
}

export default HelpButton