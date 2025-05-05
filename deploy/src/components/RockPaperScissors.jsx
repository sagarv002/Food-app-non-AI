import React, { useState } from "react";

const choices = ["1", "2", "3", "4", "5", "6"];

export default function DiceRollGame() {
  const [userChoice, setUserChoice] = useState("");
  const [diceRoll, setDiceRoll] = useState("");
  const [result, setResult] = useState("");

  const playGame = (choice) => {
    const roll = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setDiceRoll(roll);
    determineWinner(choice, roll);
  };

  const determineWinner = (user, roll) => {
    if (user === roll) {
      setResult("You guessed right!");
    } else {
      setResult("Better luck next time!");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Dice Roll Game</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "60px 0", flexWrap: "wrap" }}>
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => playGame(choice)}
            style={{ padding: "10px 20px", fontSize: "1.5rem", borderRadius: "60px", cursor: "pointer" }}
          >
            {choice}
          </button>
        ))}
      </div>
      {userChoice && (
        <div>
          <h2>You guessed: {userChoice}</h2>
          <h2>Dice rolled: {diceRoll}</h2>
          <h2>{result}</h2>
        </div>
      )}
    </div>
  );
}
