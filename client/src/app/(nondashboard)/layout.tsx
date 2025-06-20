"use client"

import Navbar from "@/components/Navbar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { useGetAuthUserQuery } from "@/state/api";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {

  const { data : authUser } = useGetAuthUserQuery();
  console.log('authUser : ' , authUser)
  
  return (
    <div>
      <Navbar />
      <main
        className={` flex flex-col h-full w-full `}
        style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
