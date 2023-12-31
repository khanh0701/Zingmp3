import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment/moment";
import icons from "../../untils/icons";
import { Lists } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";

const { BsFillPlayFill, BsThreeDots, CiHeart } = icons;

const PlayList = () => {
  const { title, pid } = useParams();
  const [playListData, setPlayListData] = useState({});

  useEffect(() => {
    const fetchDetailPlayList = async () => {
      const response = await apis.apiGetDetailPlayList(pid);
      if (response?.data.err === 0) {
        setPlayListData(response?.data?.data);
      }
    };
    fetchDetailPlayList();
  }, [pid]);

  return (
    <div className="flex px-[59px] gap-[30px] w-full h-full">
      <div className="flex-none w-1/4 flex flex-col items-center">
        <img
          src={playListData?.thumbnailM}
          alt="thumbnailM"
          className="w-full object-contain rounded-lg"
        />
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
            songs={playListData?.song?.items}
            totalDuration={playListData?.song?.totalDuration}
          />
        </div>
      </Scrollbars>
    </div>
  );
};

export default PlayList;
