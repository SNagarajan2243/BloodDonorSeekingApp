import React,{Fragment,useContext} from 'react'

import { useNavigate } from 'react-router'

import styles from './Updateprofile.module.css'

import { AuthContext } from '../../Store/auth-context'

import {auth,signOut} from '../../firebase.config'

const Updateprofile = ({detail}) => {

    const store = useContext(AuthContext)

    const navigate = useNavigate()

    const onLogoutHandler = () => {
        store.logoutHandler()
        signOut(auth)
        .then(() => {
            navigate('/login')
        }
        )
        .catch((error) => {
            alert(error.message)
        }
        )
    }

    return (
        <Fragment>
            <nav className={styles.navbar}>
                <img src='../../../src/assets/lifesaver.png' alt='Blood donor Logo' className={styles.logo}/>
                <div>
                    <button className={styles.logoutbtn} onClick={onLogoutHandler}>Logout</button>
                </div>
            </nav>
            <div>
                <h1>Donor Details</h1>
                <br/>
                <h2>Name: {detail.name}</h2>
                <h2>Age: {detail.age}</h2>
                <h2>Gender: {detail.gender}</h2>
                <h2>Blood Group: {detail.bloodgroup}</h2>
                <h2>Phone: {detail.phone}</h2>
                <h2>Email: {detail.email}</h2>
                <h2>District: {detail.district}</h2>
                <h2>Address: {detail.address}</h2>
                <button className={styles.updatebtn}>Update</button>
            </div>
        </Fragment>
    )
}

export default Updateprofile