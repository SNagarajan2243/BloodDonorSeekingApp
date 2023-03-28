import React from 'react'

import { Link } from 'react-router-dom'

import styles from './SearchDonorNavbar.module.css'

const SearchDonorNavbar = () => {
    return (
        <nav className={styles.nav}>
                <div className={styles.navbar}>
                    <img src='../../../src/assets/lifesaver.png' alt='Blood donor Logo' className={styles.logo}/>
                    <div>
                        <Link to="/newrequest" className={styles.requestbtn}>New Request</Link>
                    </div>
                </div>
                <div className={styles.navtext}>
                    <h1 className={styles.navsearchdonorheading}>Search Donor</h1>
                    <h1 className={styles.navsearchdonorsecondheading}>Your droplets of blood may create an ocean of happiness.</h1>
                    <p>Excuses never save a life, Blood donation does.</p>
                </div>
        </nav>
    )
}

export default SearchDonorNavbar