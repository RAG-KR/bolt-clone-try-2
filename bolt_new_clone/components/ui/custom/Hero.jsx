"use client";
import Lookup from "@/data/Lookup";
import React, { useContext, useState } from "react";
import { ArrowRight, Link } from "lucide-react";
import Colors from "@/data/colors";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import SignInDialog from "./SignInDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace)
  const router = useRouter();


  const onGenerate = async(input) => {
    //whatever user enters you can share that thing across the app as context
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }

    const msg = {
      role: "user",
      content: input
    }

    setMessages(msg);

    const workspaceId = await CreateWorkspace({
      user:userDetail._id,
      messages:[msg],
    })
    console.log(workspaceId);
    router.push('/workspace/'+workspaceId);
  };

  return (
    <div className="flex flex-col items-center mt-36 xl:mt-52 gap-2">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>
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
      <div className=" mt-8 flex flex-wrap gap-2 max-w-2xl items-center justify-center gap-3">
        {Lookup.SUGGSTIONS.map((suggestion, index) => {
          return (
            <h2
              onClick={() => onGenerate(suggestion)}
              key={index}
              className="p1 px-2 border rounded-full cursor-pointer text-sm text-gray-400 hover:text-white hover:bg-blue-500"
            >
              {suggestion}
            </h2>
          );
        })}
      </div>
      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(false)}
      />
    </div>
  );
};

export default Hero;
