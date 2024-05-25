import React from "react";
import IconFont from "react-native-vector-icons/FontAwesome";

const Icon = ({ name, onPress }) => {
  return (
    <IconFont
      name={name}
      size={30}
      color="#6c5ce7"
      style={{ margin: 10 }}
      onPress={onPress}
    />
  );
};

export default Icon;
