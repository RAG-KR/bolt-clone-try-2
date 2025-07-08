import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import  Colors  from '@/data/colors'

const Header = () => {
  return (
    <div>
        <div className = 'p-4 flex justify-between items-center'>
            <Image src="/logo.png" alt="logo" width={40} height={40} />
            <div className = 'flex gap-5'>
              <Button variant = 'ghost' className='text-white'>Sign In</Button>
              <Button className='text-white' style = {{backgroundColor:Colors.BLUE}}>Get Started</Button>
            </div>
        </div>
    </div>
  )
}

export default Header