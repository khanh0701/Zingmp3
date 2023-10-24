import React from "react";
import icons from "../untils/icons";
import Search from "./Search";
import avatar from "../assets/avatar.jpg";

const { BsArrowRight, BsArrowLeft, CiSettings } = icons;
const Header = () => {
  return (
    <div className="flex justify-between w-full">
      <div className="flex gap-5  items-center w-full ">
        <div className="flex gap-6 mr-[10px]  text-gray-400 ">
          <span>
            <BsArrowLeft size={22} />
          </span>
          <span>
            <BsArrowRight size={22} />
          </span>
        </div>
        <div className="w-[440px] ">
          <Search />
        </div>
      </div>
      <div className="flex items-center gap-3 ">
        <span
          title="cài đặt"
          className="flex  items-center bg-[#dde4e4] p-2 rounded-full"
        >
          <CiSettings size={22} />
        </span>
        <img
          src={avatar}
          alt="avatar"
          className="w-[38px] h-[38px] rounded-full"
        />
      </div>
    </div>
  );
};

export default Header;
