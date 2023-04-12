import React, { CSSProperties, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import styles from '@/styles/ChessBoard.module.css'
import Image from 'next/image';

import whitePawn from '../../../images/pieces/white-pawn.png';
import whiteKnight from '../../../images/pieces/white-knight.png';
import whiteBishop from '../../../images/pieces/white-bishop.png';
import whiteRook from '../../../images/pieces/white-rook.png';
import whiteQueen from '../../../images/pieces/white-queen.png';
import whiteKing from '../../../images/pieces/white-king.png';

import blackPawn from '../../../images/pieces/black-pawn.png';
import blackKnight from '../../../images/pieces/black-knight.png';
import blackBishop from '../../../images/pieces/black-bishop.png';
import blackRook from '../../../images/pieces/black-rook.png';
import blackQueen from '../../../images/pieces/black-queen.png';
import blackKing from '../../../images/pieces/black-king.png';


export enum ChessPieces {
    Empty,
    WhitePawn,
    WhiteKnight,
    WhiteBishop,
    WhiteRook,
    WhiteQueen,
    WhiteKing,
    BlackPawn,
    BlackKnight,
    BlackBishop,
    BlackRook,
    BlackQueen,
    BlackKing,
}

interface PieceProps {
    type: ChessPieces;
    id: number;
}

const Piece: React.FC<PieceProps> = ({ id, type }: PieceProps) => {

    const [image, setImage] = useState<string>(() => {
        switch (type) {
            case ChessPieces.WhitePawn:
                return whitePawn.src;
            case ChessPieces.WhiteKnight:
                return whiteKnight.src;
            case ChessPieces.WhiteBishop:
                return whiteBishop.src;
            case ChessPieces.WhiteRook:
                return whiteRook.src;
            case ChessPieces.WhiteQueen:
                return whiteQueen.src;
            case ChessPieces.WhiteKing:
                return whiteKing.src;
            case ChessPieces.BlackPawn:
                return blackPawn.src;
            case ChessPieces.BlackKnight:
                return blackKnight.src;
            case ChessPieces.BlackBishop:
                return blackBishop.src;
            case ChessPieces.BlackRook:
                return blackRook.src;
            case ChessPieces.BlackQueen:
                return blackQueen.src;
            case ChessPieces.BlackKing:
                return blackKing.src;
            default:
                return '';
        }
    });

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id
    });
    
    const style: CSSProperties | undefined = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Image src={image} alt="White Pawn" className={styles['piece-image']} width='100' height='100'/>
        </div>
    );
};
export default Piece;