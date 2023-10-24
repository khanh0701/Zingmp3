/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../apis";
import icons from "../untils/icons";
import * as actions from "../store/actions";

const {
  AiFillHeart,
  AiOutlineHeart,
  BsThreeDots,
  CiRepeat,
  BsPlayCircle,
  BiSkipNext,
  BiSkipPrevious,
  PiShuffleLight,
  BsPauseCircle,
} = icons;

const Player = () => {
  const audioEl = useRef(new Audio());

  const { curSongId, isPlaying } = useSelector((state) => state.music);
  const [songInFo, setSongInFo] = useState(null);
  const [source, setSource] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);

      if (res1.data.err === 0) {
        setSongInFo(res1.data.data);
      }
      if (res2.data.err === 0) {
        setSource(res2.data.data["128"]);
      }
    };
    fetchSong();
  }, [curSongId]);

  useEffect(() => {
    audioEl.current.pause();
    audioEl.current.src = source;
    audioEl.current.load();
    if (isPlaying) audioEl.current.play();
  }, [curSongId, source]);

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audioEl.current.pause();
      dispatch(actions.play(false));
    } else {
      audioEl.current.play();
      dispatch(actions.play(true));
    }
  };

  return (
    <div className="bg-main-400 px-5 h-full flex py-2">
      <div className="w-[30%] flex-auto flex items-center gap-3 ">
        <img
          src={songInFo?.thumbnail}
          alt="thumbnail"
          className="w-16 h-16 object-cover rounded-md "
        />
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-gray-700">
            {songInFo?.title}
          </span>
          <span className=" text-xs text-gray-500">
            {songInFo?.artistsNames}
          </span>
        </div>
        <div className="flex gap-4 pl-2">
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <BsThreeDots />
          </span>
        </div>
      </div>
      <div className="w-[40%] flex-auto flex flex-col items-center  justify-center gap-4 ">
        <div className="flex gap-8 justify-center items-center text-gray-700 ">
          <span title="bật phát ngẫu nhiên" className="cursor-pointer">
            <PiShuffleLight size={20} />
          </span>
          <span className="cursor-pointer">
            <BiSkipPrevious size={30} />
          </span>
          <span
            onClick={() => handleTogglePlayMusic()}
            className="hover:text-main-500 cursor-pointer"
          >
            {isPlaying ? (
              <BsPauseCircle size={36} />
            ) : (
              <BsPlayCircle size={36} />
            )}
          </span>
          <span className="cursor-pointer">
            <BiSkipNext size={30} />
          </span>
          <span title="bật phát lại tất cả" className="cursor-pointer">
            <CiRepeat size={20} />
          </span>
        </div>
        <div>chay</div>
      </div>
      <div className="w-[30%] flex-auto">3</div>
    </div>
  );
};

export default Player;
