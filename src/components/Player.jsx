/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../apis";
import icons from "../untils/icons";
import * as actions from "../store/actions";
import moment from "moment";
import { toast } from "react-toastify";

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
var intervalId;
const Player = () => {
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
  const [songInFo, setSongInFo] = useState(null);
  const [audio, setAudio] = useState(new Audio());
  const dispatch = useDispatch();
  const thumbRef = useRef();
  const trackRef = useRef();
  const [curSeconds, setCurSeconds] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);

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
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
      } else {
        audio.pause();
        setAudio(new Audio());
        dispatch(actions.play(false));
        toast.warn(res2.data.msg);
        setCurSeconds(0);
        thumbRef.current.style.cssText = `right: 100%`;
      }
    };
    fetchSong();
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    if (isPlaying) {
      audio.play();
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInFo?.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurSeconds(Math.round(audio.currentTime));
      }, 200);
    }
  }, [audio]);

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
  };

  const handleClickProgressbar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;
    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = (percent * songInFo.duration) / 100;
    setCurSeconds(Math.round((percent * songInFo.duration) / 100));
  };

  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) {
          currentSongIndex = index;
        }
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(actions.play(true));
    }
  };
  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) {
          currentSongIndex = index;
        }
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId));
      dispatch(actions.play(true));
    }
  };
  const handleShuffle = () => {};

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
          <span
            onClick={() => setIsShuffle((prev) => !prev)}
            title="bật phát ngẫu nhiên"
            className={`cursor-pointer ${isShuffle && "text-main-500"}`}
          >
            <PiShuffleLight size={20} />
          </span>
          <span
            onClick={handlePrevSong}
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
          >
            <BiSkipPrevious size={30} />
          </span>
          <span
            onClick={handleTogglePlayMusic}
            className="hover:text-main-500 cursor-pointer"
          >
            {isPlaying ? (
              <BsPauseCircle size={36} />
            ) : (
              <BsPlayCircle size={36} />
            )}
          </span>
          <span
            onClick={handleNextSong}
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
          >
            <BiSkipNext size={30} />
          </span>
          <span title="bật phát lại tất cả" className="cursor-pointer">
            <CiRepeat size={20} />
          </span>
        </div>
        <div className="w-full flex items-center justify-center gap-3 text-xs">
          <span>{moment.utc(curSeconds * 1000).format("mm:ss")}</span>
          <div
            onClick={handleClickProgressbar}
            ref={trackRef}
            className="relative w-3/5 h-[3px] bg-[rgba(0,0,0,0.1)] rounded-l-full rounded-r-full hover:h-[8px] cursor-pointer "
          >
            <div
              ref={thumbRef}
              className="absolute top-0 left-0 bottom-0 bg-main-500 rounded-l-full rounded-r-full "
            ></div>
          </div>
          <span> {moment.utc(songInFo?.duration * 1000).format("mm:ss")}</span>
        </div>
      </div>
      <div className="w-[30%] flex-auto">3</div>
    </div>
  );
};

export default Player;
