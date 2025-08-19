import React, { useEffect, useRef } from 'react'
import { SandpackPreview , useSandpack } from '@codesandbox/sandpack-react'

function SandpackPreviewClient() {
    const previewRef = useRef()
    const { sandpack } = useSandpack()

useEffect(()=>{
  GetSandpackClient();
},[sandpack])

    const GetSandpackClient=async()=>{
      const client = previewRef.current?.getClient();
      if(client){
        console.log(client)
        const result = await client.getCodeSandboxURL();
        console.log(result)
      }
    }
  return (
    <SandpackPreview 
    ref={previewRef}
    style={{height: "80vh",}} showNavigator={true}/>
  )
}

export default SandpackPreviewClient