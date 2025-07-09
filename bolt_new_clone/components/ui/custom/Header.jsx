import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import  Colors  from '@/data/colors'
import { UserDetailContext } from '@/context/UserDetailContext';
import { useContext } from 'react';

const Header = () => {
  const {userDetail , setUserDetail} = useContext(UserDetailContext);
  return (
    <div>
        <div className = 'p-4 flex justify-between items-center'>
            <Image src="/logo.png" alt="logo" width={40} height={40} />
           {!userDetail && <div className = 'flex gap-5'>
              <Button variant = 'ghost' className='text-white'>Sign In</Button>
              <Button className='text-white' style = {{backgroundColor:Colors.BLUE}}>Get Started</Button>
            </div>
            }
        </div>
    </div>
  )
}

export default Header