'use client'
import React, { useContext } from 'react'
import Lookup from '@/data/Lookup'
import { UserDetailContext } from '@/context/UserDetailContext'
import Colors from '@/data/Colors'
import PricingModel from '@/components/ui/custom/PricingModel'

function Pricing() {
    const {userDetail , setUserDetail} = useContext(UserDetailContext)
  return (
    <div className='p-3 md:p-5 mt-3 flex flex-col items-center'>
      <div className='mt-10 flex flex-col items-center w-full p-10 md:px-32 lg:px-48'>
        <h2 className='text-5xl font-bold'>Pricing</h2>
        <p className='text-gray-400 max-w-xl text-center mt-4'>{Lookup.PRICING_DESC}</p>

        <div className='p-5 border rounded-xl w-full flex justify-between mt-7 items-center'
        style={{
            backgroundColor:Colors.BACKGROUND
        }}
        >
            <h2 className='text-lg'><span className='font-bold'>{userDetail?.token}</span> Tokens left</h2>
            <div>
              <h2 className='font-medium'>need more tokens? </h2>
              <p>upgrade your plan below</p>
            </div>
        </div>

      </div>

      <PricingModel/>
    </div>
  )
}

export default Pricing