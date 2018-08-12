import React from 'react';

export function Rules(props) {
  return (
    <div>
      <h2>Rules</h2>
      <p>
        In Game of Drones there are two players trying to conquer each other.
      </p>
      <p>
        Players take turns to make their move, choosing Paper, Rock or Scissors.
        Each move beats another, just like the game "Paper, rock, scissors".
      </p>
      <p>Like so:</p>
      <ul>
        <li>Paper beats Rock</li>
        <li>Rock beats scissors</li>
        <li>Scissors beat Paper</li>
      </ul>
      <p>The first player to beat the other player 3 times wins the battle.</p>
    </div>
  );
}
