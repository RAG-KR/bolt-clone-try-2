import Lookup from '@/data/Lookup'
import React, { useState } from 'react'

function PricingModel() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [isPro, setIsPro] = useState(true)

  return (
    <div className='mt-10 w-full'>
      {/* Toggle for Pro/Teams and Annual billing - full width to match token display */}
      <div className='flex justify-between items-center mb-8 w-full'>
        <div className='flex items-center bg-gray-800 p-1 rounded-full'>
          <button 
            onClick={() => setIsPro(true)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${isPro ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Pro
          </button>
          <button 
            onClick={() => setIsPro(false)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${!isPro ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Teams
          </button>
        </div>
        <div className='flex items-center'>
          <span className='text-gray-400 mr-3'>Annual billing</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAnnual ? 'bg-blue-600' : 'bg-gray-600'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
      
      {/* Pricing cards container - full width to match token display */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full'>
        {Lookup.PRICING_OPTIONS.map((pricing , index)=>{
            const monthlyPrice = pricing.price;
            const annualPrice = (pricing.price * 12 * 0.8).toFixed(2); // 20% discount for annual
            const displayPrice = isAnnual ? annualPrice : monthlyPrice;
            const billingPeriod = isAnnual ? 'year' : 'month';
            const billingText = isAnnual ? 'Billed annually' : 'Billed monthly';
            
            return (
            <div key={index} className='border p-6 rounded-lg'>
                <h2 className='font-bold text-2xl'>{pricing.name}</h2>
                <div className='mt-3'>
                    <span className='text-green-400 font-bold text-lg'>{pricing.tokens} tokens</span>
                </div>
                <p className='text-gray-400 mt-2 text-sm'>{pricing.desc}</p>
                <div className='mt-4'>
                    <span className='text-3xl font-bold'>${displayPrice}</span>
                    <span className='text-gray-400 ml-2'>/ {billingPeriod}</span>
                </div>
                <div className='mt-4 text-sm text-gray-500'>
                    {billingText}
                </div>
                {isAnnual && (
                    <div className='mt-2 text-sm text-green-400'>
                        Save ${(monthlyPrice * 12 - annualPrice).toFixed(2)} per year
                    </div>
                )}
                <button className='w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors'>
                    Upgrade to {pricing.name}
                </button>
            </div>
        )})}
      </div>
    </div>
  )
}

export default PricingModel