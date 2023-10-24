/* eslint-disable react/prop-types */
import React, { memo } from "react";
import List from "./List";
import moment from "moment/moment";
import icons from "../untils/icons";

const { PiDotOutlineFill } = icons;

const Lists = ({ songs, totalDuration }) => {
  return (
    <div className="w-full flex flex-col text-xs text-gray-600">
      <div className="uppercase flex  items-center  text-sm font-semibold p-3 ">
        <span className="w-2/4">Bài Hát</span>
        <span className="w-1/5">Album</span>
        <span className=" flex-1 flex justify-end w-1/5 ">Thời gian</span>
      </div>
      <div className="flex flex-col">
        {songs?.map((item) => (
          <List key={item.encodeId} songData={item} />
        ))}
      </div>
      <div className="flex gap-2 items-center text-[13px] pt-4 border-t border-[rgba(0,0,0,0.05)]">
        <span>{`${songs?.length} bài hát`}</span>
        <PiDotOutlineFill />
        <span>{moment.utc(totalDuration * 1000).format("HH:mm:ss")}</span>
      </div>
    </div>
  );
};

export default memo(Lists);
