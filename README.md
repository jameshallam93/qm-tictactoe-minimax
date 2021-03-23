# minimaxnpm

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Updated Badge](https://badges.pufler.dev/updated/jameshallam93/minimaxnpm)](https://badges.pufler.dev)

Remote repository for minimax algorithm npm package

## Description
A basic best move function for a cpu player of tic tac toe, based on a minimax algorithm - given a board as an array of strings ("", "X" or "O"), evaluates all possible board states and returns the move that gives the highest score
A score of 10 is given for a winning terminal state, -10 for a losing state, and 0 for a draw. If a winning state is found, the algorithm will subtract the depth of this winning state (i.e. how many moves are required to reach it), and favour winning states that arise in the least moves possible.

## Installation / Usage
<code> npm install qm-tictactoe-minimax </code>

<code> const bestMove = require("qm-tictactoe-minimax").bestMove </code>

<code> const cpuMove:number = bestMove(board:Array<string>, symbol:string)</code>

## Dependencies
Typescript

## License
MIT

## Contact
qualitymellows+minim@gmail.com

## Usage and rules
Currently the function relies on the CPU playing as X and the human playing as O - if these are switched, the cpu ai will deliberately aim to lose
bestMove function takes an array of strings (board) plus the current symbol (X/O) as parameters, and returns the index of the square that it considers to be the best move.

## Other functions
bestMove function relies on a number of other private functions, listed below:
- hasWon: returns true if board is in winning terminal state
- hasDrawn: returns true if there are no more free square on the board
- evaluateBoard (importable): returns +10 if the board is in a winning terminal state for THE CPU, -10 for the human player, and 0 in all other cases
- returnEmptyIndexes: returns all indexes that are currently empty
- minimax (importable): recursive function that scans all possible board states. If it finds a terminal state (winning, losing or drawing) it will return an appropriate score to bestMove - bestMove keeps track of the highest score and returns the matching index.
