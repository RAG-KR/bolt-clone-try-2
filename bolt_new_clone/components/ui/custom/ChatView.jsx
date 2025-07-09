'use client'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'next/navigation';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { MessagesContext } from '@/context/MessagesContext';
import Colors  from '@/data/Colors';

function ChatView() {
    const {id} = useParams();
    const convex = useConvex();
    const {messages, setMessages} = useContext(MessagesContext);

    useEffect(() => {
        id&&GetWorkspaceData();
    }, [id]);

    //used to get workspace data using workspaceId
const GetWorkspaceData = async () =>{
const result = await convex.query(api.workspace.GetWorkspace, {
    workspaceId:id,
})
setMessages(result?.messages);
console.log(result);
return result;

}


  return (
    <div>
        <div>
            {(messages || []).map((msg, index) => (
                <div key={index} 
                className='p-3 rounded-lg mb-2'
                style={
                    {
                        backgroundColor:Colors.CHAT_BACKGROUND,

                    }
                }>
                    <h2>{msg.content}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChatView