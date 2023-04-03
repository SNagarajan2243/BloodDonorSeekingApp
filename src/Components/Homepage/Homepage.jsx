import React,{Fragment} from 'react'
import { Link } from 'react-router-dom'
import Blooddetailstable from './Blooddetailstable/Blooddetailstable'
import Tips from './Tips/Tips'
import Footer from '../Footer/Footer'
// import Navigation from '../Navigation/Navigation'
import styles from './Homepage.module.css'
const Homepage = () => {
    return (
        <Fragment>
            <nav className={styles.navbar}>
                <img src='../../src/assets/lifesaver.png' alt='Blood donor Logo' className={styles.logo}/>
                <div className={styles.btns}>
                    <div>
                        <Link to="/login" className={styles.loginbtn}>Login</Link>
                    </div>
                    <div>
                        <Link to='/admin' className={styles.adminbtn}>Admin</Link>
                    </div>
                </div>
            </nav>
            <div className={styles.registerandbtncontainer}>
                <div className={styles.quotes}>
                    <h1 className={styles.firstquotes}>Give the gift of lives to others</h1>
                    <h1>LET'S UNITE</h1>
                    <h2 style={{color: '#d01d33'}}>TO SAVE LIVES </h2>
                    <p>We are inviting 135 Core Indians to Become Life Savers. Join us in this mission.</p>
                </div>
                <div className={styles.btnscontainer}>
                    <Link to="/signuppage" className={styles.Registerbtn}>Register as Donor</Link>
                    <Link to="/searchdonor" className={styles.searchbtn}>Find a Donor</Link>
                </div>
            </div>
            <Blooddetailstable />
            <Tips />
            <Footer />
        </Fragment>
    )
}
export default Homepage