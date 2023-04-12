import React, { CSSProperties } from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from '@/styles/ChessBoard.module.css'

interface DroppableProps {
    children: React.ReactNode;
    id: number;
    isHighlighted: boolean;
}

const Droppable: React.FC<DroppableProps> = ({ id, children, isHighlighted }: DroppableProps) => {
    const { setNodeRef } = useDroppable({
        id
    });

    const isDarkSquare = (Math.floor(id / 8) + (id % 8)) % 2 !== 0;
    const baseClassName = isDarkSquare ? styles.darkSquare : styles.lightSquare;
    const highlightedClassName = isDarkSquare ? styles.darkSquareHighlighted : styles.lightSquareHighlighted;
    const className = isHighlighted ?  highlightedClassName : baseClassName;

    return (
        <div ref={setNodeRef} className={className}>
            {children}
        </div>
    );
};
export default Droppable;