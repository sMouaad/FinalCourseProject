import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const ROWS = 6;
const COLS = 7;

const App = () => {
  const [board, setBoard] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
  const [player, setPlayer] = useState('red');
  const [winner, setWinner] = useState(null);
  const [isComputerTurn, setIsComputerTurn] = useState(false);

  useEffect(() => {
    if (player === 'yellow' && isComputerTurn) {
      // Computer's turn
      const col = findBestMove();
      dropToken(col);
    }
  }, [player]);

  const checkWinner = (row, col) => {
    const directions = [
      [0, 1], [1, 0], [1, 1], [-1, 1]
    ];

    for (const [dx, dy] of directions) {
      let count = 1;
      for (let i = 1; i < 4; i++) {
        const newRow = row + dx * i;
        const newCol = col + dy * i;
        if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && board[newRow][newCol] === player) {
          count++;
        } else {
          break;
        }
      }
      for (let i = 1; i < 4; i++) {
        const newRow = row - dx * i;
        const newCol = col - dy * i;
        if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && board[newRow][newCol] === player) {
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
      setWinner('Tie');
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
        setPlayer(player === 'red' ? 'yellow' : 'red');
        setIsComputerTurn(!isComputerTurn);
        return;
      }
    }
  };

  const resetGame = () => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
    setWinner(null);
    setPlayer('red');
  };

  const findBestMove = () => {
    for (let col = 0; col < COLS; col++) {
      const row = getAvailableRow(col);
      if (row !== null) {
        if (checkWinningMove(row, col, 'yellow')) {
          return col;
        }
        if (checkWinningMove(row, col, 'red')) {
          return col;
        }
      }
    }
    return Math.floor(Math.random() * COLS);
  };

  const checkWinningMove = (row, col, checkPlayer) => {
    const directions = [
      [0, 1], [1, 0], [1, 1], [-1, 1]
    ];

    for (const [dx, dy] of directions) {
      let count = 1;
      for (let i = 1; i < 4; i++) {
        const newRow = row + dx * i;
        const newCol = col + dy * i;
        if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && board[newRow][newCol] === checkPlayer) {
          count++;
        } else {
          break;
        }
      }
      for (let i = 1; i < 4; i++) {
        const newRow = row - dx * i;
        const newCol = col - dy * i;
        if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && board[newRow][newCol] === checkPlayer) {
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
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <TouchableOpacity
              key={colIndex}
              style={[styles.cell, { backgroundColor: cell || '#fff' }]}
              onPress={() => dropToken(colIndex)}>
              <View style={styles.token} />
            </TouchableOpacity>
          ))}
        </View>
      ))}
      {winner && (
        <View style={styles.winnerContainer}>
          <Text style={styles.winnerText}>Winner: {winner === 'yellow' ? 'Dhakira' : 'Computer'}</Text>
          <TouchableOpacity onPress={resetGame} style={styles.button}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  token: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  winnerContainer: {
    position: 'absolute',
    top: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  winnerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
