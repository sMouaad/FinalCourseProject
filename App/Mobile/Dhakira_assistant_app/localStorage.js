import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

const getData = async (key) => {
  try {
    const userData = await AsyncStorage.getItem(key);
    return userData;
  } catch (e) {
    // saving error
    console.log(e);
    return "error";
  }
};

export { storeData, getData };
