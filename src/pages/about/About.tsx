import styles from '@/styles/About.module.css'
import Background from './background/Background';
import gitLogo from '../../images/github-icon.png'
import Image from 'next/image';
import Link from 'next/link';

const AboutMePage = () => {
    return (
        <>
            <div className={styles.hero}>
                <Background />
                <div className={styles.content}>
                    <div className={styles.text}>
                        <p>&lt;I&apos;m Lachlan&gt;</p>
                        <p>check out my projects</p>
                        <p>below and/or on my Github</p>
                    </div>
                    <Link href="https://github.com/lachlancroll">
                        <Image src={gitLogo.src} alt="Github logo" width="100" height="100"/>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default AboutMePage;