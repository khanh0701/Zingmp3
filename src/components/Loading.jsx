import React, { memo } from "react";
import { Oval } from "react-loader-spinner";

const Loading = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="#0E8080"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#0E8080"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default memo(Loading);
