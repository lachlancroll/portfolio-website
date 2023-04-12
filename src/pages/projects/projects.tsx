import styles from '@/styles/Projects.module.css';
import ChessBoard from './chess/Chess';
import {useState} from 'react';

const Projects = () => {    
    return (
        <div className={styles.projects} id='about'>
            <h1>&lt;Projects&gt;</h1>
            <h2>Chess</h2>
            <div className={styles.chess}>
                <p className={styles.content}>this doesn&apos;t currently work on my website, but it does on my github so check it out here: <a href='https://github.com/lachlancroll/Chess'>https://github.com/lachlancroll/Chess</a></p>
                <ChessBoard/>
                <div className={styles.content}>
                    <p>This project uses Javascript (with the p5 library), and Java.
                    it uses AWS Elastic Beanstalk to host the RESTful web service
                    which was made using Spring Boot. The AI uses a minimax algorithm
                    with alpha beta pruning.</p>
                </div>
            </div>
        </div>
    )
}

export default Projects;