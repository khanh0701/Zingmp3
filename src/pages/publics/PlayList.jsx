import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment/moment";
import icons from "../../untils/icons";
import { Lists, AudioLoading } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";

const { BsFillPlayFill, BsThreeDots, CiHeart } = icons;

const PlayList = () => {
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);

  const { title, pid } = useParams();
  const [playListData, setPlayListData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetailPlayList = async () => {
      const response = await apis.apiGetDetailPlayList(pid);
      if (response?.data.err === 0) {
        setPlayListData(response?.data?.data);
        dispatch(actions.setPlayList(response.data?.data?.song?.items));
      }
    };
    fetchDetailPlayList();
  }, [pid]);

  return (
    <div className="flex px-[59px] gap-[30px] w-full h-full">
      <div className="flex-none w-1/4 flex flex-col items-center">
        <div className="w-full relative overflow-hidden">
          <img
            src={playListData?.thumbnailM}
            alt="thumbnailM"
            className="w-full object-contain rounded-lg"
          />
          <div className="absolute top-0 bottom-0 left-0 right-0 hover:bg-overlay-30 flex items-center justify-center text-white">
            <span className="p-3 border border-white rounded-full">
              {isPlaying ? <AudioLoading /> : <BsFillPlayFill size={30} />}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center text-xs text-gray-600 gap-1">
          <h3 className="pt-[12px] text-xl text-gray-700 font-bold">
            {playListData?.title}
          </h3>
          <span>
            Cập nhật:{" "}
            {moment.unix(playListData?.contentLastUpdate).format("DD/MM/YYYY")}
          </span>
          <div>
            {playListData?.artists?.map((item, index) => (
              <>
                <span key={item.id}>{item.name}</span>
                <span>
                  {index !== playListData.artists.length - 1 ? ", " : ""}
                </span>
              </>
            ))}
          </div>
          <span>{`${Math.floor(
            playListData?.like / 1000
          )}K người yêu thích`}</span>
        </div>
        <span className="w-[199px] h-[36px] text-white bg-main-500 rounded-full mt-4 flex items-center justify-center">
          <span>
            <BsFillPlayFill size={24} />
          </span>
          <h3>PHÁT NGẪU NHIÊN</h3>
        </span>
        <div className="flex gap-4 mt-4 text-gray-600">
          <span
            title="thêm vào thư viện"
            className="bg-[#dde4e4] rounded-full p-2"
          >
            <CiHeart size={20} />
          </span>
          <span title="Khác" className="bg-[#dde4e4] rounded-full p-2">
            <BsThreeDots size={20} />
          </span>
        </div>
      </div>
      <Scrollbars style={{ width: "100%", height: "80%" }}>
        <div className="flex-auto mb-40 mr-4">
          <span className="text-sm">
            <span className="text-gray-500">Lời tựa </span>
            <span className="text-gray-800">
              {playListData?.sortDescription}
            </span>
          </span>

          <Lists
            // songs={playListData?.song?.items}
            totalDuration={playListData?.song?.totalDuration}
          />
        </div>
      </Scrollbars>
    </div>
  );
};

export default PlayList;
