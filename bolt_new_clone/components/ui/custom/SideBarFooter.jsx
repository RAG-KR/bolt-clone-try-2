import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react'
import React from 'react'
import { Button } from '../button'

function SidebarFooter() {
    const options=[{
        name:'settings',
        icon:Settings
    },
    {
        name:'help',
        icon:HelpCircle
    },
    {
        name:'my subscription',
        icon:Wallet
    },
    {
        name:'sign out',
        icon:LogOut
    },
    
    ]
  return (
    <div className='p-2 mb-10'>
        {options.map((option , index)=>(
            <Button variant={'ghost'} className='w-full flex justify-start gap-2 my-3' key={index}>
                <option.icon />
                {option.name}
            </Button>
        ))}
    </div>
  )
}

export default SidebarFooter