import React from "react";
import { Button } from "react-native";

export default function Comp() {
  const [one, setOne] = useState(0);
  const [two, setTwo] = useState(0);
  function handelOne() {
    setOne(one + 1);
  }
  function handelTwo() {
    setTwo(two + 1);
  }
  return (
    <>
      <Button onPress={handelOne}></Button>
      <Button onPress={handelTwo}></Button>
    </>
  );
}
