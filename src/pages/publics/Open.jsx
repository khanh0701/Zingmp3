import React from "react";
import { Header, SidebarLeft } from "../../components/";
import { Outlet } from "react-router-dom";
import Player from "../../components/Player";

const Open = () => {
  return (
    <div className="relative flex flex-col w-full min-h-screen bg-main-300 ">
      <div className="flex flex-auto w-full h-full">
        <div className="w-[240px] h-full  flex-none">
          <SidebarLeft />
        </div>
        <div className="flex-auto overflow-hidden">
          <div className="h-[70px] px-[59px]   flex items-center mb-[55px]">
            <Header></Header>
          </div>
          <Outlet />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex-none h-[90px] ">
        <Player />
      </div>
    </div>
  );
};

export default Open;
