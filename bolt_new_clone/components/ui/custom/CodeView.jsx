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


function CodeView() {
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE)
  const {messages, setMessages} = useContext(MessagesContext)

  useEffect(() => {
    if (messages && messages.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role === "user") {
        GenerateAiCode();
      }
    }
  }, [messages]);

  const GenerateAiCode = async ()=>{
    try {
      const PROMPT = JSON.stringify(messages)+' '+Prompt.CODE_GEN_PROMPT
      const result = await axios.post('/api/gen-ai-code', {
        prompt:PROMPT
      })
      console.log(result.data)
      const aiResp = result.data
      if (aiResp && aiResp.files) {
        const mergedFiles = {...Lookup.DEFAULT_FILE, ...aiResp.files}
        setFiles(mergedFiles)
      }
    } catch (error) {
      console.error('Error generating AI code:', error)
    }
  }

  return (
    <div>
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
      <SandpackProvider template="react" theme="dark"
      files={files}
      customSetup={
        {
          dependencies:{
            ...Lookup.DEPENDANCY,
          }
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
    </div>
  );
}

export default CodeView;
