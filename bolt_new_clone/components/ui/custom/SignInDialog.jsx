import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";

function SignInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
const CreateUser = useMutation(api.users.CreateUser)
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer" + tokenResponse.access_token } }
      );

      console.log(userInfo);
      const user = userInfo.data;
      //now i have saved to database
      await CreateUser({
        name:user?.name,
        email:user?.email,
        picture:user?.picture,
        uid:uuid4()
      })

// now i will save in local storage so that when we refresh we can get it from local storage
if(typeof window !== 'undefined'){
  localStorage.setItem('user',JSON.stringify(user))
}



      setUserDetail(userInfo?.data);
      //have to save the user info in the database so that reload the page will not lose the user info
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-2xl font-bold text-white text-center">
                {Lookup.SIGNIN_HEADING}
              </h2>
              <p className="mt-2 text-sm text-gray-500 text-center">
                {Lookup.SIGNIN_SUBHEADING}
              </p>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-400 mt-3 mb-3"
                onClick={googleLogin}
              >
                Sign In with Google
              </Button>
              <p className="text-sm text-gray-500 ">
                {Lookup.SIGNIn_AGREEMENT_TEXT}
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
