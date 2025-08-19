import React, { useEffect, useRef, useContext, useState } from 'react'
import { SandpackPreview , useSandpack } from '@codesandbox/sandpack-react'
import { ActionContext } from '@/context/ActionContext';

function SandpackPreviewClient({ onSandboxUrlReady }) {
    const previewRef = useRef()
    const { sandpack } = useSandpack()
    const { action, setAction } = useContext(ActionContext)
    const [isProcessing, setIsProcessing] = useState(false)

useEffect(()=>{
  if (!isProcessing) {
    GetSandpackClient();
  }
},[sandpack])

useEffect(() => {
  if ((action?.actionType === 'deploy' || action?.actionType === 'export') && !isProcessing) {
    GetSandpackClient();
  }
}, [action]);

    const GetSandpackClient=async()=>{
      if (isProcessing) return; // Prevent multiple simultaneous calls
      
      try {
        setIsProcessing(true);
        const client = previewRef.current?.getClient();
        
        // Check if client is ready and sandpack is initialized
        if(client && sandpack?.clients && Object.keys(sandpack.clients).length > 0){
          console.log('Client ready, getting CodeSandbox URL...')
          
          // Wait a bit to ensure client is fully initialized
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          try {
            const result = await client.getCodeSandboxURL();
            console.log('CodeSandbox URL result:', result)
            
            // Pass the sandbox URL to parent component
            if (onSandboxUrlReady && result) {
              onSandboxUrlReady(result);
            }
            
            // Handle actions based on actionType
            if (action?.actionType == 'deploy'){
              // Use location.href instead of window.open to avoid popup blockers
              const deployUrl = 'https://'+result.sandboxId+'.csb.app/';
              console.log('Opening deploy URL:', deployUrl);
              window.location.href = deployUrl;
            }else if (action?.actionType=='export'){
              console.log('Opening export URL:', result?.editorUrl);
              window.open(result?.editorUrl, '_blank');
            }
            
            // Reset action after handling
            if (action) {
              setAction(null);
            }
          } catch (urlError) {
            console.error('Error getting CodeSandbox URL:', urlError);
            // Try alternative approach
            if (action?.actionType === 'deploy' || action?.actionType === 'export') {
              console.log('Trying alternative approach...');
              // You can implement alternative sandbox creation here
            }
          }
        } else {
          console.log('Client not ready yet, will retry when ready...');
        }
      } catch (error) {
        console.error('Error in GetSandpackClient:', error);
        // Fallback: try to create sandbox manually
        if (action?.actionType === 'deploy' || action?.actionType === 'export') {
          console.log('Falling back to manual sandbox creation...');
          // You can implement a fallback here if needed
        }
      } finally {
        setIsProcessing(false);
      }
    }
  return (
    <SandpackPreview 
    ref={previewRef}
    style={{height: "80vh",}} showNavigator={true}/>
  )
}

export default SandpackPreviewClient