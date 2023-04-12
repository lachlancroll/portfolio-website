import React, { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import Droppable from './Droppable';
import Piece, { ChessPieces } from './Piece';
import styles from '@/styles/ChessBoard.module.css'

interface Square {
    id: number;
    piece: ChessPieces;
    isHighlighted: boolean;
}

const ChessBoard: React.FC = () => {
    const [board, setBoard] = useState<Square[][]>([]);
    const [isFirstMove, setIsFirstMove] = useState<boolean>(true);

    const findRow = (index: number) => {
        return Math.floor(index / 8);
    }

    const findCol = (index: number) => {
        return index % 8;
    }

    async function move(numbers: string, prevPos: number, newPos: number) {
        try {
            const response = await fetch(
                `http://chessbackend-env-1.eba-fgpqpn4v.ap-southeast-2.elasticbeanstalk.com/api/m1?numbers=${numbers}`
            );
            const rT = await response.text();
            const arr = rT.split(" ").map(Number);
            setBoard(prevBoard => {
                const newRow = findRow(newPos);
                const newCol = findCol(newPos);
                const prevRow = findRow(prevPos);
                const prevCol = findCol(prevPos);

                const newBoard = prevBoard.map(row =>
                    row.map(square => ({ ...square, isHighlighted: false }))
                );
                if (arr[1] === 99) {
                    return newBoard;
                }

                newBoard[newRow][newCol] = { ...newBoard[newRow][newCol], piece: newBoard[prevRow][prevCol].piece };
                newBoard[prevRow][prevCol] = { ...newBoard[prevRow][prevCol], piece: ChessPieces.Empty };

                const opponentNewRow = findRow(arr[2]);
                const opponentNewCol = findCol(arr[2]);
                const oppenentPrevRow = findRow(arr[1]);
                const oppenentPrevCol = findCol(arr[1]);

                console.log(arr);

                newBoard[opponentNewRow][opponentNewCol] = { ...newBoard[opponentNewRow][opponentNewCol], piece: newBoard[oppenentPrevRow][oppenentPrevCol].piece };
                newBoard[oppenentPrevRow][oppenentPrevCol] = { ...newBoard[oppenentPrevRow][oppenentPrevCol], piece: ChessPieces.Empty };

                return newBoard;
            })
        } catch (error) {
            console.error(error);
        }
    }


    const showLegalMoves = async (prevPositionString: string) => {
        try {
            const response = await fetch(`http://chessbackend-env-1.eba-fgpqpn4v.ap-southeast-2.elasticbeanstalk.com/api/m2?number=${prevPositionString}`);
            const legalMoves = (await response.text()).slice(0, -1).split(" ").map(Number);
            setBoard(prevBoard => {
                const newBoard = [...prevBoard];
                legalMoves.forEach(num => {
                    const newRow = findRow(num);
                    const newCol = findCol(num);
                    newBoard[newRow][newCol] = { ...newBoard[newRow][newCol], isHighlighted: true };
                });
                return newBoard;
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDragStart = (event: DragStartEvent) => {
        const prevPosition = event.active.id;
        let prevPositionString = prevPosition.toString();
        showLegalMoves(prevPositionString);
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        const { id: newId } = over || {};
        const { id: prevId } = active || {};

        if (typeof newId === "number" && typeof prevId === "number") {
            let firstMoveNumber = isFirstMove ? 1 : 0;
            const nums = (prevId + " " + newId + " " + firstMoveNumber);
            isFirstMove && setIsFirstMove(false);
            move(nums, prevId, newId);
        }
    };

    useEffect(() => {
        const squares: Square[][] = [];
        for (let row = 0; row < 8; row++) {
            const newRow: Square[] = [];
            for (let col = 0; col < 8; col++) {
                let piece: ChessPieces = ChessPieces.Empty;
                if (row === 6) {
                    piece = ChessPieces.WhitePawn;
                }
                if (row === 1) {
                    piece = ChessPieces.BlackPawn;
                }
                if (row === 0) {
                    if (col === 0 || col === 7) {
                        piece = ChessPieces.BlackRook;
                    } else if (col === 1 || col === 6) {
                        piece = ChessPieces.BlackKnight;
                    } else if (col === 2 || col === 5) {
                        piece = ChessPieces.BlackBishop;
                    } else if (col === 3) {
                        piece = ChessPieces.BlackQueen;
                    } else if (col === 4) {
                        piece = ChessPieces.BlackKing;
                    }
                }
                if (row === 7) {
                    if (col === 0 || col === 7) {
                        piece = ChessPieces.WhiteRook;
                    } else if (col === 1 || col === 6) {
                        piece = ChessPieces.WhiteKnight;
                    } else if (col === 2 || col === 5) {
                        piece = ChessPieces.WhiteBishop;
                    } else if (col === 3) {
                        piece = ChessPieces.WhiteQueen;
                    } else if (col === 4) {
                        piece = ChessPieces.WhiteKing;
                    }
                }
                newRow.push({ id: (row * 8) + col, piece, isHighlighted: false });
            }
            squares.push(newRow);
        }
        setBoard(squares);
    }, []);

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <div className={styles.board}>
                {board.map((row, x) => (
                    <div className={styles['board-row']} key={x}>
                        {board[x].map(({ id, piece, isHighlighted }) => (
                            <Droppable id={id} isHighlighted={isHighlighted} key={id}>
                                {piece === ChessPieces.Empty ? null : <Piece id={id} type={piece} />}
                            </Droppable>
                        ))}
                    </div>
                ))}
            </div>
        </DndContext>
    );
};

export default ChessBoard;