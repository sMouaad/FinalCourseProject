import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
  ImageBackground,
  Image,
} from "react-native";
import Background from "../../assets/natureBg.jpg";
import DhakiraNice from "../../assets/dhakiraNice.png";

const ROWS = 6;
const COLS = 7;

const App = () => {
  const [board, setBoard] = useState(
    Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  );

  const image = {
    uri: Background,
  };
  const [player, setPlayer] = useState("red");
  const [winner, setWinner] = useState(null);
  const [isComputerTurn, setIsComputerTurn] = useState(false);

  useEffect(() => {
    if (player === "#006BD1" && isComputerTurn) {
      const col = findBestMove();
      dropToken(col);
    }
  }, [player]);

  const checkWinner = (row, col) => {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [-1, 1],
    ];

    for (const [dx, dy] of directions) {
      let count = 1;
      for (let i = 1; i < 4; i++) {
        const newRow = row + dx * i;
        const newCol = col + dy * i;
        if (
          newRow >= 0 &&
          newRow < ROWS &&
          newCol >= 0 &&
          newCol < COLS &&
          board[newRow][newCol] === player
        ) {
          count++;
        } else {
          break;
        }
      }
      for (let i = 1; i < 4; i++) {
        const newRow = row - dx * i;
        const newCol = col - dy * i;
        if (
          newRow >= 0 &&
          newRow < ROWS &&
          newCol >= 0 &&
          newCol < COLS &&
          board[newRow][newCol] === player
        ) {
          count++;
        } else {
          break;
        }
      }
      if (count >= 4) {
        setWinner(player);
        return;
      }
    }
    if (!board.flat().includes(null)) {
      setWinner("Tie");
    }
  };

  const dropToken = (col) => {
    if (winner || board[0][col] !== null) return;

    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][col] === null) {
        const newBoard = [...board];
        newBoard[row][col] = player;
        setBoard(newBoard);
        checkWinner(row, col);
        setPlayer(player === "red" ? "#006BD1" : "red");
        setIsComputerTurn(!isComputerTurn);
        return;
      }
    }
  };

  const resetGame = () => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
    setWinner(null);
    setPlayer("red");
  };

  const findBestMove = () => {
    for (let col = 0; col < COLS; col++) {
      const row = getAvailableRow(col);
      if (row !== null) {
        if (checkWinningMove(row, col, "#006BD1")) {
          return col;
        }
        if (checkWinningMove(row, col, "red")) {
          return col;
        }
      }
    }
    return Math.floor(Math.random() * COLS);
  };

  const checkWinningMove = (row, col, checkPlayer) => {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [-1, 1],
    ];

    for (const [dx, dy] of directions) {
      let count = 1;
      for (let i = 1; i < 4; i++) {
        const newRow = row + dx * i;
        const newCol = col + dy * i;
        if (
          newRow >= 0 &&
          newRow < ROWS &&
          newCol >= 0 &&
          newCol < COLS &&
          board[newRow][newCol] === checkPlayer
        ) {
          count++;
        } else {
          break;
        }
      }
      for (let i = 1; i < 4; i++) {
        const newRow = row - dx * i;
        const newCol = col - dy * i;
        if (
          newRow >= 0 &&
          newRow < ROWS &&
          newCol >= 0 &&
          newCol < COLS &&
          board[newRow][newCol] === checkPlayer
        ) {
          count++;
        } else {
          break;
        }
      }
      if (count >= 4) {
        return true;
      }
    }
    return false;
  };

  const getAvailableRow = (col) => {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][col] === null) {
        return row;
      }
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Background}
        className="flex-1  w-full items-center bg-cover "
      >
        {winner && (
          <View style={[styles.winnerContainer, styles.shadow]}>
            <Text style={styles.winnerText}>
              Winner: {winner === "#006BD1" ? "Dhakira" : "You"}
            </Text>
            <TouchableOpacity onPress={resetGame} style={styles.button}>
              <Text style={[styles.buttonText, styles.shadow]}>Restart</Text>
            </TouchableOpacity>
          </View>
        )}
        <View className="p-10">
          <View className="flex-1 justify-center items-center ">
            <View
              className="bg-Primary p-2 rounded-[20px] mt-[100px]"
              style={styles.shadow}
            >
              {board.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map((cell, colIndex) => (
                    <Pressable
                      key={colIndex}
                      style={[styles.cell, { backgroundColor: cell || "#fff" }]}
                      onPress={() => dropToken(colIndex)}
                    >
                      <View style={styles.token} />
                    </Pressable>
                  ))}
                </View>
              ))}
            </View>
          </View>
          <View className=" justify-center ">
            <View className="justify-center mx-  rounded-3xl items-center  bg-white">
              <Text className="text-lg font-bold">
                Hey, I'm here and ready to play
              </Text>
            </View>
            <Image
              source={DhakiraNice}
              className="self-end"
              style={{ width: 130, height: 130 }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    padding: 2,
  },
  cell: {
    width: 43,
    height: 43,
    borderWidth: 3,
    borderColor: "#00E5BD",
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderRadius: 100,
  },
  token: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  winnerContainer: {
    position: "absolute",
    top: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  winnerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#00E5BD",
    padding: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
});

export default App;
