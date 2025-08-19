import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react'
import React from 'react'
import { Button } from '../button'
import { useRouter } from 'next/navigation'


function SidebarFooter() {
    const router = useRouter()
    const options=[{
        name:'settings',
        icon:Settings,
        path:'/settings'
    },
    {
        name:'help',
        icon:HelpCircle,
        path:'/help'
    },
    {
        name:'my subscription',
        icon:Wallet,
        path:'/pricing'
    },
    {
        name:'sign out',
        icon:LogOut,
        action:'signout'
    },
    
    ]

const onOptionClick = (option)=>{
    if (option.action === 'signout') {
        // Handle sign out logic
        localStorage.removeItem('user')
        router.push('/')
        return
    }
    
    if (option.path) {
        router.push(option.path)
    }
}

  return (
    <div className='p-2 mb-10'>
        {options.map((option , index)=>(
            <Button variant={'ghost'} 
            onClick={()=>onOptionClick(option)}
            className='w-full flex justify-start gap-2 my-3' key={index}>
                <option.icon />
                {option.name}
            </Button>
        ))}
    </div>
  )
}

export default SidebarFooter