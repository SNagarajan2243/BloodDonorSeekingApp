import { Fragment, useEffect,useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styles from './AdminDetail.module.css'
import Footer from '../../Footer/Footer'
import {auth,onAuthStateChanged,signOut} from '../../firebase.config'
const AdminDetail = () => {
    const navigate = useNavigate()
    const [donordetail,setDonorDetail] = useState([])
    const [count,setCount] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    let countDiv = null
    const [requestDetail,setRequestDetail] = useState([])
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (!user || user.providerData[0].providerId !== 'phone') {
                navigate("/admin");
            }
        });
        setIsLoading(true)
        fetch('http://localhost:3000/fetchdonordetails')
        .then(res=>res.json())
        .then(data=>{
            console.log(data.details)
            console.log(data.bloodCount)
            setCount(data.bloodCount[0])
            setDonorDetail(data.details)
            countDiv = count && Object.keys(count).map((item,index)=>{
                return (
                    <div className={styles.countDiv} key={index}>
                        <h1>{item.bloodGroup}</h1>
                        <h1>{item.count}</h1>
                    </div>
                )   
            })
        })
        .catch(err=>console.log(err))
        fetch('http://localhost:3000/requestdetails')
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setRequestDetail(data.details)
        })
        .catch(err=>console.log(err))
        .finally(()=>{
            setIsLoading(false)
        }
        )
    },[])
    const logoutHandler = () => {
        signOut(auth)
        .then(() => {
            navigate("/admin");
        })
        .catch((error) => {
            console.log(error)
        });
    }
    return (
        <Fragment>
            <nav className={styles.navbar}>
                <img src='../../src/assets/lifesaver.png' alt='Blood donor Logo' className={styles.logo}/>
                <h1 className={styles.navbartitle}>Admin Dashboard</h1>
                <div>
                    <Link className={styles.logoutbtn} onClick={logoutHandler}>Logout</Link>
                </div>
            </nav>
            <div className={styles.dashboardMainContainer}>
                <div className={styles.dashboardMainSubContainer}>
                    <h1 className={styles.heading}>Blood Count Details</h1>
                    <div className={styles.countDiv}>
                        <table className={styles.table}>
                            <thead>
                                    <tr>
                                        <th>Blood Group</th>
                                        <th>Count</th>
                                    </tr>
                            </thead>
                            <tbody>
                                {isLoading && 
                                <tr>
                                    <td colSpan="4">
                                        <div className={styles.svg}>
                                            <svg viewBox="25 25 50 50">
                                                <circle r="20" cy="50" cx="50"></circle>
                                            </svg>
                                        </div>
                                    </td>
                                </tr>}
                                {!isLoading && count && Object.keys(count).map((item,index)=>{
                                    return (
                                        <tr key={index}>
                                            <td>{item}</td>
                                            <td>{count[item]}</td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={styles.dashboardMainSubContainer}>
                    <h1 className={styles.heading}>Blood Donor Details</h1>
                    <div className={styles.donorDiv}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Blood Group</th>
                                    <th>Phone Number</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading && 
                                <tr>
                                    <td colSpan="4">
                                        <div className={styles.svg}>
                                            <svg viewBox="25 25 50 50">
                                                <circle r="20" cy="50" cx="50"></circle>
                                            </svg>
                                        </div>
                                    </td>
                                </tr>}
                                {!isLoading && donordetail && donordetail.map((item,index)=>{
                                    return (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.bloodGroup}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.address}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={styles.dashboardMainSubContainer}>
                    <h1 className={styles.heading}>Request Details</h1>
                    <div className={styles.donorDiv}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Blood Group</th>
                                    <th>Attendee No</th>
                                    <th>Hospital Address</th>
                                    <th>Quantity</th>
                                    <th>Required Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading && 
                                <tr>
                                    <td colSpan="5">
                                        <div className={styles.svg}>
                                            <svg viewBox="25 25 50 50">
                                                <circle r="20" cy="50" cx="50"></circle>
                                            </svg>
                                        </div>
                                    </td>
                                </tr>}
                                {console.log(requestDetail)}
                                {!isLoading && requestDetail && requestDetail.map((item,index)=>{
                                    return (
                                        <tr key={index}>
                                            <td>{item.bloodgroup}</td>
                                            <td>{item.attendeeNo}</td>
                                            <td>{item.hospitalAddress}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.requiredDate}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default AdminDetail