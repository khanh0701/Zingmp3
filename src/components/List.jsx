/* eslint-disable react/prop-types */
import React, { memo } from "react";
import icons from "../untils/icons";
import moment from "moment";
import * as actions from "../store/actions";
import { useDispatch } from "react-redux";

const { PiMusicNotesSimpleThin } = icons;

const List = ({ songData }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId));
        dispatch(actions.play(true));
      }}
      className="flex justify-between items-center p-2 border-t border-[rgba(0,0,0,0.05)] hover:bg-main-200 cursor-pointer"
    >
      <div className="flex items-center gap-3 w-2/4">
        <span>
          <PiMusicNotesSimpleThin />
        </span>
        <img
          src={songData?.thumbnail}
          alt="thumbnail"
          className="w-10 h-10 object-cover rounded-md"
        />
        <div className="flex flex-col">
          <span className="font-medium text-sm">{songData?.title}</span>
          <span className=" text-xs">{songData?.artistsNames}</span>
        </div>
      </div>
      <div className="flex-1 flex w-1/5 ">{songData?.album?.title}</div>
      <div className="flex-1 flex justify-end w-1/5">
        {moment.utc(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(List);
