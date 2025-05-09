import React from "react";
import Lottie from "lottie-react";
import loading from "../assets/animations/loading.json";

export default function Spinner() {
  return (
    <div className="h-screen flex flex-col gap-2 items-center justify-center w-full">
      <div className="animate-pulse text-blue">
        <div className="w-[200px] lg:w-[200px] h-[200px] lg:h-[50px] flex items-center justify-center">
          <Lottie animationData={loading} loop={true} />
        </div>
      </div>
    </div>
  );
}
