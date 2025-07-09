'use client'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';

function ChatView() {
    const {id} = useParams();
    const convex = useConvex();

    useEffect(() => {
        id&&GetWorkspaceData();
    }, [id]);

    //used to get workspace data using workspaceId
const GetWorkspaceData = async () =>{
const result = await convex.query(api.workspace.GetWorkspace, {
    workspaceId:id,
})
console.log(result);
return result;

}


  return (
    <div>ChatView</div>
  )
}

export default ChatView