import React from "react";
import logo from "../assets/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { sidebarMenu } from "../untils/menu";
import path from "../untils/path";

const activeStyle =
  "py-2 px-[25px] font-semibold text-[#0f7070] text-[15px] flex items-center gap-[12px]";

const notActiveStyle =
  "py-2 px-[25px] font-semibold text-[#32323d] text-[15px] flex items-center gap-[12px]";

const SidebarLeft = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-main-200">
      <div
        onClick={() => navigate(path.HOME)}
        className="w-full h-[70px] py-[15px] px-[25px] flex items-center "
      >
        <img src={logo} alt="logo" className="w-[120px] h-[40px]" />
      </div>

      <div className="flex flex-col w-full ">
        {sidebarMenu.map((item, index) => (
          <div key={index} className="h-[48px]">
            <NavLink
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
            >
              {item.icon}
              <span>{item.text}</span>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;
