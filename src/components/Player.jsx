/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../apis";
import icons from "../untils/icons";
import * as actions from "../store/actions";
import moment from "moment";
import { toast } from "react-toastify";
import { LoadingSong } from "../components";

const {
  AiOutlineHeart,
  BsThreeDots,
  CiRepeat,
  BiSkipNext,
  BiSkipPrevious,
  PiShuffleLight,
  BsFillPlayFill,
  BsPauseFill,
  PiRepeatOnceLight,
  SlVolume2,
  BsMusicNoteList,
  VscChromeRestore,
  PiMicrophoneStage,
  PiVideo,
  SlVolumeOff,
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
  const [RepeatMode, setRepeatMode] = useState(0);
  const [isLoadedSrc, setIsLoadedSrc] = useState(true);
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    const fetchSong = async () => {
      setIsLoadedSrc(false);
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      setIsLoadedSrc(true);

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
    if (isPlaying && thumbRef.current) {
      audio.play();
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInFo?.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurSeconds(Math.round(audio.currentTime));
      }, 200);
    }
  }, [audio]);

  useEffect(() => {
    const handleEnded = () => {
      if (isShuffle) {
        handleShuffle();
      } else if (RepeatMode) {
        RepeatMode === 1 ? handleRepeatOne() : handleNextSong();
      } else {
        audio.pause();
        dispatch(actions.play(false));
      }
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, isShuffle, RepeatMode]);

  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume]);

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
  const handleShuffle = () => {
    const randomIndex = Math.round(Math.random() * (songs?.length - 1));
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
    dispatch(actions.play(true));
  };

  const handleRepeatOne = () => {
    audio.play();
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
          <span
            onClick={() => setIsShuffle((prev) => !prev)}
            title={`${
              isShuffle === false
                ? "bật phát ngẫu nhiên"
                : "tắt phát ngẫu nhiên"
            }`}
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
            className=" cursor-pointer p-1 border border-gray-700 rounded-full hover:text-main-500 hover:border-main-500"
          >
            {!isLoadedSrc ? (
              <LoadingSong />
            ) : isPlaying ? (
              <BsPauseFill size={30} />
            ) : (
              <BsFillPlayFill size={30} />
            )}
          </span>
          <span
            onClick={handleNextSong}
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
          >
            <BiSkipNext size={30} />
          </span>
          <span
            title={`${
              RepeatMode === 0
                ? "bật phát lại một bài"
                : RepeatMode === 1
                ? "bật phát lại tất cả"
                : "tắt phát lại"
            } `}
            onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
            className={`cursor-pointer ${RepeatMode && "text-main-500"}`}
          >
            {RepeatMode === 1 ? (
              <PiRepeatOnceLight size={20} />
            ) : (
              <CiRepeat size={20} />
            )}
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
      <div className="w-[30%] flex-auto flex items-center justify-end gap-4">
        <div className="flex justify-end gap-4 pr-4 border-r-2 border-gray-500 ">
          <span>
            <PiVideo size={18} />
          </span>
          <span>
            <PiMicrophoneStage />
          </span>
          <span>
            <VscChromeRestore />
          </span>
          <span
            title="volume"
            onClick={() => setVolume((prev) => (+prev === 0 ? 70 : 0))}
          >
            {+volume !== 0 ? <SlVolume2 /> : <SlVolumeOff />}
          </span>
          <input
            type="range"
            step={1}
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>

        <span
          title="danh sách phát"
          className=" p-1 hover:bg-main-500 hover:rounded-sm hover:text-white"
        >
          <BsMusicNoteList s />
        </span>
      </div>
    </div>
  );
};

export default Player;
