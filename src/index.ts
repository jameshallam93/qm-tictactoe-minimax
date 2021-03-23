//list of possible winning states
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const hasWon = (board:Array<string>, symbol:string):boolean => {
    let winner = false

    winningCombos.map(combo => {
        if (board[combo[0]] === symbol && board[combo[1]] === symbol && board[combo[2]] === symbol) {
            winner = true
        }
    })
    return winner
}

const hasDrawn = (board:Array<string>):boolean => {
    let nonEmptySquares = board.filter(x => x)

    if (nonEmptySquares.length === board.length) {
        return true
    }
    return false

}

export const evaluateBoard = (board:Array<string>):number => {

    const cpuSymbol = "X"
    const playersSymbol = "O"

    if (hasWon(board, playersSymbol)) {
        return -10
    }

    if (hasWon(board, cpuSymbol)) {
        return 10
    }
    return 0

}
const returnEmptyIndexes = (board:Array<string>):Array<number> => {

    let emptyIndexes:Array<number> = []

    board.forEach((square, index) => {
        if (square === "") {
            emptyIndexes.push(index)
        }
    })

    return emptyIndexes
}

export const bestMove = (board:Array<string>, currentSymbol:string):number => {

    let newBoard = board.slice()
    const emptyIndexes = returnEmptyIndexes(board)


    let bestValue = -1000

    const bestMove = emptyIndexes.reduce((currentBest, emptyIndex) => {
        newBoard[emptyIndex] = currentSymbol
        const newValue = minimax(newBoard, 0, true)

        newBoard[emptyIndex] = ""

        if (newValue > bestValue) {
            bestValue = newValue
            return emptyIndex
        }
        return currentBest
    }, -1)

    return bestMove;
}

export const minimax = (board:Array<string>, depth:number, playersTurn:boolean):number => {

    let score = evaluateBoard(board)

    if (score === -10) {
        return score
    }
    if (score === 10) {
        return score - depth
    }
    if (hasDrawn(board)) {
        return 0;
    }

    if (!playersTurn) {
        const bestMaximValue = board.reduce((currentBest:number, square:string, index:number):number => {
            let newBoard = board.slice()

            if (square === "") {
                newBoard[index] = "X"
                const newDepth = depth + 1
                const newValue = minimax(newBoard, newDepth, true)

                if (newValue > currentBest) {
                    return newValue
                }
            }
            return currentBest
        }, -1000)
        return bestMaximValue
    }

    const bestMinimValue = board.reduce((currentBest:number, square:string, index:number):number => {
        let newBoard = board.slice()

        if (square === "") {
            newBoard[index] = "O"
            const newDepth = depth + 1
            const newValue = minimax(newBoard, newDepth, false)

            if (newValue < currentBest) {
                return newValue
            }
        }
        return currentBest
    }, 1000)
    return bestMinimValue
}

module.exports = { bestMove, evaluateBoard, minimax }