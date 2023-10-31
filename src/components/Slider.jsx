import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArrSlider } from "../untils/fn";

import img from "../assets/avatar.jpg";
import actionTypes from "../store/actions/actionTypes";
import * as actions from "../store/actions";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const { banner } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // animation banner
  useEffect(() => {
    const SliderEls = document.getElementsByClassName("slider-item");
    let min = 0;
    let max = 2;

    const intervalId = setInterval(() => {
      const list = getArrSlider(min, max, SliderEls.length - 1);

      for (let i = 0; i < SliderEls.length; i++) {
        //delete classname add ago
        SliderEls[i]?.classList?.remove(
          "animate-slide-right",
          "order-last",
          "z-20"
        );
        SliderEls[i]?.classList?.remove(
          "animate-slide-left",
          "order-first",
          "z-10"
        );
        SliderEls[i]?.classList?.remove(
          "animate-slide-left2",
          "order-2",
          "z-10"
        );

        if (list.some((item) => item === i)) {
          SliderEls[i].style.cssText = `display: block`;
        } else {
          SliderEls[i].style.cssText = `display: none`;
        }
      }

      list.forEach((item) => {
        if (item === max) {
          SliderEls[item]?.classList?.add(
            "animate-slide-right",
            "order-last",
            "z-20"
          );
        } else if (item === min) {
          SliderEls[item]?.classList?.add(
            "animate-slide-left",
            "order-first",
            "z-10"
          );
        } else {
          SliderEls[item]?.classList?.add(
            "animate-slide-left2",
            "order-2",
            "z-10"
          );
        }
      });

      if (min === SliderEls.length - 1) {
        min = 0;
      } else {
        min += 1;
      }
      if (max === SliderEls.length - 1) {
        max = 0;
      } else {
        max += 1;
      }
    }, 3000);
    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, []);

  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      dispatch(actions.setCurSongId(item.encodeId));
      dispatch(actions.play(true));
      dispatch(actions.setPlayList(null));
    } else if (item?.type === 4) {
      const albumPath = item?.link?.split(".")[0];
      navigate(albumPath);
    } else {
      dispatch(actions.setPlayList(null));
    }
  };

  return (
    <div className="flex gap-[30px] w-full overflow-hidden">
      {banner?.map((item, index) => (
        <img
          key={item.encodeId}
          src={item.banner}
          alt="banner"
          onClick={() => handleClickBanner(item)}
          className={`slider-item flex-1 rounded-lg  w-[30%]  ${
            index <= 2 ? "block" : "none"
          }`}
        />
      ))}
    </div>
  );
};

export default Slider;
