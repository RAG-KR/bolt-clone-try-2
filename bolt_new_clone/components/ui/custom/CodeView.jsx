"use client";
import React, { useContext, useEffect, useState } from "react";
import Lookup from "../../../data/Lookup";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { MessagesContext } from "@/context/MessagesContext";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { api } from "@/convex/_generated/api";
import { useMutation, useConvex } from "convex/react";
import { useParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { countTokens } from "./ChatView";
import { UserDetailContext } from "@/context/UserDetailContext";

function CodeView() {
  const {id} = useParams()
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE)
  const {messages, setMessages} = useContext(MessagesContext)
  const UpdateFiles = useMutation(api.workspace.UpdateFiles)
  const convex = useConvex()
  const [loading, setLoading] = useState(false)
  const UpdateToken = useMutation(api.users.UpdateToken);
  const {userDetail, setUserDetail} = useContext(UserDetailContext)

  useEffect(()=>{
    id&&GetFiles()
  },[id])

   const GetFiles = async ()=>{
    setLoading(true)
    const result = await convex.query(api.workspace.GetWorkspace,{
      workspaceId:id
    })
    if(result?.fileData){
      const mergedFiles = {...Lookup.DEFAULT_FILE, ...result?.fileData}
      setFiles(mergedFiles)
    }
    setLoading(false)
   }

  useEffect(() => {
    if (messages && messages.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role === "user") {
        GenerateAiCode();
      }
    }
  }, [messages]);

  const GenerateAiCode = async ()=>{
    setLoading(true)
    try {
      const PROMPT = JSON.stringify(messages)+' '+Prompt.CODE_GEN_PROMPT
      const result = await axios.post('/api/gen-ai-code', {
        prompt:PROMPT
      })
      console.log(result.data)
      const aiResp = result.data
      if (aiResp && aiResp.files) {
        const mergedFiles = {...Lookup.DEFAULT_FILE, ...aiResp?.files}
        setFiles(mergedFiles)
        await UpdateFiles({
          workspaceId:id,
          files:aiResp?.files
        })
        
        // Calculate token usage (subtract from current balance)
        const currentTokens = Number(userDetail?.token) || 0;
        const tokenUsed = countTokens(JSON.stringify(aiResp));
        const newToken = currentTokens - tokenUsed;

        // Validate calculation
        if (isNaN(newToken) || !isFinite(newToken)) {
          console.error("❌ Invalid token calculation in CodeView, skipping update");
          setLoading(false);
          return;
        }

        try {
          // Update database
          await UpdateToken({
            token: newToken,
            userId: userDetail?._id,
          });
          
          // Update local context
          setUserDetail({...userDetail, token: newToken});
          
          // Log usage
          console.log(`CodeView - Tokens used: ${tokenUsed}, Remaining: ${newToken}`);
        } catch (error) {
          console.error("❌ Failed to update tokens in CodeView:", error);
        }
      }
    } catch (error) {
      console.error('Error generating AI code:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      <div className="bg-[#181818] w-full p-2 border">
        <div className="flex items-center flex-wrap shrink-0 p-1 bg-black w-[140px] gap-3 justify-center rounded-full">
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer ${activeTab == "code" && "bg-blue-500/25 text-blue-500 p-1 px-2 rounded-full"}`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer ${activeTab == "preview" && "bg-blue-500/25 text-blue-500 p-1 px-2 rounded-full"}`}
          >
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider theme="dark"
      files={files}
      customSetup={
        {
          dependencies:{
            ...Lookup.DEPENDANCY,
          },
          entry: "/src/index.js"
        }
      }
      options={{
        externalResources:['https://cdn.tailwindcss.com']
      }}
      >
        <SandpackLayout>
          {activeTab == "code" ? <>
            <SandpackFileExplorer style={{ height: "80vh" }} />
            <SandpackCodeEditor style={{height: "80vh",}}/>
          </>
          :
          <>
            <SandpackPreview style={{height: "80vh",}} showNavigator={true}/>
          </>
          }
        </SandpackLayout>
      </SandpackProvider>
             {loading && (
         <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-900/50 rounded-lg">  
           <Loader2Icon className="animate-spin h-10 w-10 text-white mb-3"/>
           <h2 className="text-white text-lg">Generating your files...</h2>
         </div>
       )}
    </div>
  );
}

export default CodeView;
