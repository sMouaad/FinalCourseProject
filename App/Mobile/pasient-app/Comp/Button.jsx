import { Text, Pressable } from "react-native";

const Button = ({
  children,
  onPress,
  style,
  btnClassName,
  textClassName,
  text,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        style,
        pressed && { opacity: 0.5, elevation: 2 },
        {
          shadowColor: "black",
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
          elevation: 4,
        },
      ]}
      className={btnClassName}
    >
      {text && (
        <Text className={" text-base text-white font-bold "}>{text}</Text>
      )}
      {children}
    </Pressable>
  );
};

export default Button;
