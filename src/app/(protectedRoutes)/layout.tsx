import { onAuthenticateUser } from "@/actions/auth";
import Header from "@/ReusableComponents/LayoutComponents/Header";
import Sidebar from "@/ReusableComponents/LayoutComponents/Sidebar";
import { redirect } from "next/navigation";
import React from "react"; //layout files/pages doesnt refresh everytime, it just caches the data.

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const userExist = await onAuthenticateUser();
  if (!userExist.user) {
    redirect("/sign-in");
  }

  return (
    <div className="w-full min-h-screen flex">
      <Sidebar />

      <div className="flex flex-col w-full h-screen overflow-auto px-4 scrollbar-hide container mx-auto">
       <Header user={userExist.user}/>
      {children}
      </div>
    </div>
  );
};

export default Layout;
