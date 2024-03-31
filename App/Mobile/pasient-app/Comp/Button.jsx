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
      style={({ pressed }) => [style, pressed && { opacity: 0.8 }]}
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
