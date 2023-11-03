import React from "react";
import { Header, Loading, SidebarLeft } from "../../components/";
import { Outlet } from "react-router-dom";
import Player from "../../components/Player";
import { useSelector } from "react-redux";
// import { Scrollbars } from "react-custom-scrollbars-2";

const Open = () => {
  const { isLoading } = useSelector((state) => state.app);

  return (
    <div className="relative flex flex-col w-full min-h-screen bg-main-300 ">
      <div className="flex flex-auto w-full h-full">
        <div className="w-[240px] h-full  flex-none">
          <SidebarLeft />
        </div>
        <div className="relative flex-auto flex flex-col overflow-hidden">
          {isLoading && (
            <div className="absolute top-0 bottom-0 left-0 right-0 z-20 bg-main-300 flex items-center justify-center">
              <Loading />
            </div>
          )}
          <div className="h-[70px] flex-none  px-[59px]   flex items-center ">
            <Header></Header>
          </div>
          <div className="flex-auto w-full">
            {/* <Scrollbars style={{ width: "100%", height: "100%" }}></Scrollbars> */}
            <Outlet />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex-none h-[90px] z-50 ">
        <Player />
      </div>
    </div>
  );
};

export default Open;
