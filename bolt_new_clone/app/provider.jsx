"use client";
import React, { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/ui/custom/Header";
import { UserDetailContext } from "@/context/UserDetailContext";
import { MessagesContext } from "@/context/MessagesContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSideBar from "@/components/ui/custom/AppSideBar";
import { ActionContext } from "@/context/ActionContext";

const provider = ({ children }) => {
  const [messages, setMessages] = useState();
  const [userDetail, setUserDetail] = useState();
  const [action , setAction] = useState(); 
  const convex = useConvex();

  useEffect(() => {
    IsAuthenticated();
  }, []);

  const IsAuthenticated = async () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        //fetch form database
        const result = await convex.query(api.users.GetUser, {
          email: user?.email,
        });
        if (result && result.length > 0) {
          setUserDetail(result[0]);
          console.log(`User logged in: ${result[0].email}, Token balance: ${result[0].token}`);
        }
      }
    }
  };

  return (
    <div>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}
      >
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <MessagesContext.Provider value={{ messages, setMessages }}>
            <ActionContext.Provider value={{action , setAction}}> 
            <NextThemesProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <SidebarProvider defaultOpen={false}>
                <AppSideBar />
                <SidebarInset>
                  {children}
                </SidebarInset>
              </SidebarProvider>
            </NextThemesProvider>
            </ActionContext.Provider>
          </MessagesContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </div>
  );
};

export default provider;
