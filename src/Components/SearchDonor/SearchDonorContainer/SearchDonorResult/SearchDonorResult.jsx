import React from "react"

import styles from './SearchDonorResult.module.css'

const SearchDonorResult = ({donordetails,isLoadingStatus}) => {
    console.log(isLoadingStatus)
    return (
        <table  className={styles.donorresulttable}>
            <thead  className={styles.donorresulttableheading}>
                <tr>
                    <th>Name</th>
                    <th>Blood Group</th>
                    <th>State</th>
                    <th>District</th>
                    <th>City</th>
                    <th>Phone Number</th>
                </tr>
            </thead>
            <tbody className={styles.donorresulttablebody}>
                {isLoadingStatus && <tr>
                    <td colSpan="6">
                        <div className={styles.svg}>
                            <svg viewBox="25 25 50 50">
                                <circle r="20" cy="50" cx="50"></circle>
                            </svg>
                        </div>
                    </td>
                </tr>}
                {!isLoadingStatus && typeof(donordetails) === 'string' && <tr><td colSpan="6" className={styles.noinfo}>{donordetails}</td></tr>}
                {!isLoadingStatus && typeof(donordetails) === 'object' && 
                donordetails.map((donor, index) => {
                    return (
                        <tr key={index} className={styles.donorresulttablebodyrow}>
                            <td>{donor.name}</td>
                            <td>{donor.bloodGroup}</td>
                            <td>{donor.state}</td>
                            <td>{donor.district}</td>
                            <td>{donor.city}</td>
                            <td>{donor.phone}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default SearchDonorResult