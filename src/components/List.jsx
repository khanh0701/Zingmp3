/* eslint-disable react/prop-types */
import React, { memo } from "react";
import icons from "../untils/icons";
import moment from "moment";
import * as actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AudioLoading, LoadingSong } from "../components";

const { PiMusicNotesSimpleThin, BsFillPlayFill } = icons;

const List = ({ songData }) => {
  const dispatch = useDispatch();
  const { isPlaying } = useSelector((state) => state.music);

  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId));
        dispatch(actions.play(true));
        dispatch(actions.playAlbum(true));
      }}
      className="flex justify-between items-center p-2 border-t border-[rgba(0,0,0,0.05)] hover:bg-main-200 cursor-pointer  group "
    >
      <div className="flex items-center gap-3 w-2/4 ">
        <span>
          <PiMusicNotesSimpleThin />
        </span>
        <div className="relative overflow-hidden">
          <img
            src={songData?.thumbnail}
            alt="thumbnail"
            className="w-10 h-10 object-cover rounded-md"
          />

          <div className="absolute top-0 bottom-0 left-0 right-0 ">
            <div className="w-10 h-10  hidden group-hover:flex items-center justify-center text-white group-hover:bg-overlay-70 group-hover:rounded-md">
              <BsFillPlayFill size={30} />
            </div>
          </div>
        </div>
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
