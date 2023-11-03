/* eslint-disable react/prop-types */
import React, { memo } from "react";
import icons from "../untils/icons";

import { useNavigate } from "react-router-dom";

const { BsChevronRight } = icons;
const Section = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className=" mt-12 ">
      <div className=" flex items-center justify-between ">
        <h3 className="text-xl font-bold capitalize text-[#32323d]">
          {data?.title}
        </h3>
        <div className="flex items-center text-gray-500 font-medium hover:text-main-500">
          <span className="text-xs pr-1">TẤT CẢ</span>
          <BsChevronRight size={18} />
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-[24px] ">
        {data?.items
          ?.filter((item, index) => index <= 4)
          ?.map((item) => (
            <div
              key={item.encodeId}
              onClick={() => {
                navigate(item?.link?.split(".")[0]);
              }}
              className="flex flex-col gap-2 flex-1 "
            >
              <img
                src={item.thumbnailM}
                alt="thumbnail"
                className="w-full h-auto rounded-md"
              />

              <span className="text-sm text-gray-500">
                {item?.sortDescription?.length >= 54
                  ? `${item.sortDescription.slice(0, 54)}...`
                  : item.sortDescription}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(Section);
