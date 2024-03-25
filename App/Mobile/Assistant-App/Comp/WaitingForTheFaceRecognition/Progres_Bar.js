import { View } from "react-native";
import React, { useEffect, useState } from "react";


function Progress_Bar({ width }) {
  return (
    <View className=" mt-[60] mb-4  bg-Secondry relative rounded-[22px] flex-row">
      <View
        style={{ width: width + "%" }}
        className="duration-500 min-w-[10%] max-w-[100%]  bg-Primary relative rounded-[22px] flex flex-row items-center justify-center"
      >
        <View className="mx-[10px] max-w-[80%] flex-1  mt-[5] mb-[11] py-[3px] bg-DeepthProgresBar relative rounded-[22px]" />
      </View>
    </View>
  );
}
export default Progress_Bar;
