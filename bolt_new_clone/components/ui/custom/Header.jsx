import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import  Colors  from '@/data/Colors'
import { UserDetailContext } from '@/context/UserDetailContext';
import { useContext } from 'react';
import { ActionContext } from '@/context/ActionContext';
import { Download, Share2 } from 'lucide-react';

const Header = () => {
  const {userDetail , setUserDetail} = useContext(UserDetailContext);
  const {action , setAction} = useContext(ActionContext);

  // tells the action name whether it is deploy or share 
  const onActionBtn = (actionName) => {
    setAction({
      actionType: actionName,
      timeStamp: Date.now()
    })
  }

  return (
    <div>
        <div className = 'p-4 flex justify-between items-center'>
            <Image src="/logo.png" alt="logo" width={40} height={40} />
            {userDetail ? (
              <div className='flex gap-5'>
                <Button 
                  variant="outline" 
                  onClick={() => onActionBtn('export')}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button 
                  onClick={() => onActionBtn('deploy')}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Share2 className="h-4 w-4" />
                  Deploy
                </Button>
              </div>
            ) : (
              <div className = 'flex gap-5'>
                <Button variant = 'ghost' className='text-white'>Sign In</Button>
                <Button className='text-white' style = {{backgroundColor:Colors.BLUE}}>Get Started</Button>
              </div>
            )}
        </div>
    </div>
  )
}

export default Header