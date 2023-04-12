import styles from '@/styles/About.module.css'
import React, { useState, useEffect, useCallback } from 'react';

interface RowProps {
    index: number;
    space: number;
    codeDropSize: number;
}

const Row = ({ index, space, codeDropSize }: RowProps) => {
    const rowLength = 33;

    const initialisePotentialDigits = useCallback((): (number | string)[] => {
        const array: (number | string)[] = [];
        for (let i = 0; i < space + codeDropSize; i++) {
            if (i < space) {
                array.push(' ');     
            } else {
                array.push(i % 9);
            }
        }
        return array;
    }, [codeDropSize, space]);

    const initialiseRows = (num: number): JSX.Element[] => {
        const potentialDigits = initialisePotentialDigits();
        const array: JSX.Element[] = [];
        for (let i = 0; i < rowLength; i++) {
            const potentialDigitsIndex = (num + i) % potentialDigits.length;
            array.push(<li key={i}>{potentialDigits[potentialDigitsIndex]}</li>);
        }
        return array;
    };

    const [digit, setDigit] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDigit((prevDigit) =>
                prevDigit === 0 ? initialisePotentialDigits().length - 1 : prevDigit - 1
            );
        }, 150);
        return () => clearInterval(intervalId);
    }, [initialisePotentialDigits]);

    return (
        <ul className={styles.rain} style={{ marginLeft: `${index * 2}vw` }}>
            {initialiseRows(digit)}
        </ul>
    );
};

export default Row;