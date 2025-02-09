import React, { useState } from 'react';

// Square 컴포넌트: 각 사각형을 나타냅니다.
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Board 컴포넌트: 게임 보드를 나타냅니다.
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // 승자가 있거나 사각형이 이미 채워져 있으면 클릭 무시
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice(); // 현재 사각형 복사
    nextSquares[i] = xIsNext ? 'X' : 'O'; // 현재 플레이어의 기호 추가
    onPlay(nextSquares); // 업데이트된 사각형 배열을 부모에게 전달
  }

  const winner = calculateWinner(squares); // 승자 계산
  let status;
  if (winner) {
    status = 'Winner: ' + winner; // 승자 표시
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O'); // 다음 플레이어 표시
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Game 컴포넌트: 전체 게임을 관리합니다.
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); // 게임 히스토리
  const [currentMove, setCurrentMove] = useState(0); // 현재 이동
  const xIsNext = currentMove % 2 === 0; // 다음 플레이어 결정
  const currentSquares = history[currentMove]; // 현재 사각형 배열

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // 새로운 히스토리 추가
    setHistory(nextHistory); // 히스토리 업데이트
    setCurrentMove(nextHistory.length - 1); // 현재 이동 업데이트
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]); // 게임 초기화
    setCurrentMove(0); // 현재 이동 초기화
  }

  const winner = calculateWinner(currentSquares); // 승자 계산
  let status;
  if (winner) {
    status = 'Winner: ' + winner; // 승자 표시
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O'); // 다음 플레이어 표시
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
      <button className="reset-button" onClick={handleReset}>다시하기</button>
    </div>
  );
}

// 승자 계산 함수
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // 승자 반환
    }
  }
  return null; // 승자가 없으면 null 반환
}