import styles from '@/styles/Navbar.module.css'
import React, { useState } from 'react'
import Link from 'next/link';

const Navbar = () => {
    const [click, setClick] = useState(false);

    const closeMenu = () => {
        console.log("hello there bitch");
    }
    
    const handleClick = () => {
        setClick(true);
    }

    return (
        <div className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles['nav-start']}>Lachlan Croll | lachlancroll@gmail.com | 0490 184 661</div>
                <ul className={click ? styles['nav-menu'] : styles['nav-menu']}>
                    <li className={styles['nav-item']}>
                        <Link href='/' onClick={closeMenu}>About</Link>
                    </li>
                    <li className={styles['nav-item']}>
                        <Link href='#about' onClick={closeMenu}>Projects</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default Navbar;