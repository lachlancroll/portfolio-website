import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import styles from '@/styles/Home.module.css'
import AboutMePage from './about/About'
import Projects from './projects/projects'
import Footer from '../components/Footer'

// &lt; = <
// &gt; = >
// &apos; = '

const Home = () => {
  return (
    <>
      <Head>
        <title>Lachlan Croll</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <Navbar/>
        <AboutMePage/>
        <Projects/>
        <Footer/>
      </div>
    </>
  )
}

export default Home;