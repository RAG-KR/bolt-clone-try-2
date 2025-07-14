"use client"
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Link from 'next/link'
import { useSidebar } from '../sidebar'


function WorkspaceHistory() {
    const {userDetail , setUserDetail} = useContext(UserDetailContext)
    const convex = useConvex()
    const [workspaceList , setWorkspaceList] = useState([])
    const{toggleSidebar} = useSidebar()

    useEffect(()=>{
        userDetail && GetAllWorkspace()
    },[userDetail])

    const GetAllWorkspace = async()=>{ 
        const result = await convex.query(api.workspace.GetAllWorkspace,{
            userId:userDetail._id,
        })
        console.log(result)
        setWorkspaceList(result)
    }
  return (
    <div>
        <h2 className='font-medium text-lg'>Your Chats</h2>
        <div>
            {workspaceList&&workspaceList.map((workspace , index)=>(
                <Link href={'/workspace/'+workspace?._id} key={index}>
                <h2 onClick={toggleSidebar}  className='text-sm text-gray-400 mt-2 font-light hover:text-white cursor-pointer'>
                    {workspace?.messages[0]?.content}
                </h2>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default WorkspaceHistory