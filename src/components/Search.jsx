import React from "react";
import icons from "../untils/icons";

const { TfiSearch } = icons;
const Search = () => {
  return (
    <div className="w-full flex items-center  ">
      <span className="h-10 pl-4 flex items-center bg-[#dde4e4] rounded-l-[20px] text-gray-500 ">
        <TfiSearch size={20} />
      </span>
      <input
        type="text"
        placeholder="Tìm kiếm bài hát , nghệ sĩ, lời bài hát..."
        className=" w-full outline-none bg-[#dde4e4] px-4 py-2 h-10 rounded-r-[20px] text-gray-500"
      />
    </div>
  );
};

export default Search;
