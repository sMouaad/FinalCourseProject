import { View, Text, TextInput } from "react-native";
import Button from "../Button";
import { Image } from "expo-image";
import welcomToDhakira from "../../assets/images/welcomToDhakira.png";

const Key = () => {
  return (
    <View className="h-screen py-[20] gap-20">
      <View className="items-center justify-start flex-col ">
        <Text className="font-bold text-[32px] text-[#00A588] mb-[10px]">
          Welcome to Dhakira...
        </Text>
        <Image
          source={welcomToDhakira}
          className="rounded-2xl w-[171] h-[173] "
          transition={130}
        />
      </View>
      <View>
        <TextInput
          placeholder="Enter the keyword"
          className="border-2 items-center border-Primary px-[20] py-[15] m-[10] rounded-[20px]"
        ></TextInput>
        <Button btnClassName="items-center bg-Primary p-[12] m-[10] rounded-[20px]">
          <View className="bg-[#00A588] w-full items-center py-1 rounded-[20px]">
            <Text className="text-white font-bold text-3xl ">Start</Text>
          </View>
        </Button>
      </View>
    </View>
  );
};

export default Key;
