'use client'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'next/navigation';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { MessagesContext } from '@/context/MessagesContext';
import Colors  from '@/data/Colors';
import { UserDetailContext } from '@/context/UserDetailContext';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Link } from 'lucide-react';
import Lookup from '@/data/Lookup';
import { useState } from 'react';
import axios from 'axios';
import Prompt from '@/data/Prompt';

function ChatView() {
    const {id} = useParams();
    const convex = useConvex();
    const { userDetail, setUserDetail} = useContext(UserDetailContext);
    const {messages, setMessages} = useContext(MessagesContext);
    const [userInput, setUserInput] = useState();

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


useEffect(() => {
  if(messages && messages.length > 0){
    const role = messages[messages?.length - 1].role;
    if(role === 'user'){
      GetAIResponse();
    }
  }
}, [messages]);

const GetAIResponse =  async () =>{
  const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
  const result = await axios.post('/api/ai-chat' , {
    prompt: PROMPT,
  })
  console.log(result.data.result);
}


  return (
    <div className='relative h-[85vh] flex flex-col'>
        <div className='flex-1 overflow-y-scroll '>
            {(messages || []).map((msg, index) => (
                <div key={index} 
                className='p-3 rounded-lg mb-2 flex gap-2 items-start'
                style={
                    {
                        backgroundColor:Colors.CHAT_BACKGROUND,

                    }
                }>
                    {msg?.role==='user'&&<Image src={userDetail?.picture} alt='userImage' width={30} height={30} className='rounded-full'/>}
                    <h2>{msg.content}</h2>
                </div>
            ))}
        </div>
        {/* Input Section */}
        <div
        className="p-5 border rounded-xl max-w-xl w-full mt-3"
        style={{ backgroundColor: Colors.BACKGROUND }}
      >
        <div className="flex gap-2">
          <textarea
            placeholder={Lookup.INPUT_PLACEHOLDER}
            onChange={(event) => setUserInput(event.target.value)}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer"
            />
          )}
        </div>
        <div>
          <Link className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}

export default ChatView