import React from 'react';

import styles from './Blooddetailstable.module.css';

const Blooddetailstable = () => {

    return (
        <div className={styles.learnaboutdonation}>
                <h2>LEARN ABOUT DONATION</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th colSpan='3' style={{color: '#fff',background: '#c40404'}}>Compatible Blood Type Donors</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <b>Blood Type</b>    
                            </td>
                            <td>
                                <b>Donate Blood To</b>
                            </td>
                            <td>
                                <b>Receive Blood From</b>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span style={{color: '#770303'}}>
                                    <b>A+</b>
                                </span>   
                            </td>
                            <td>
                                <span>
                                    A+ AB+
                                </span>
                            </td>
                            <td>
                                <span>
                                    A+ A- O+ O-
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span style={{color: '#770303'}}>
                                    <b>O+</b>
                                </span>   
                            </td>
                            <td>
                                <span>
                                    O+ A+ B+ AB+
                                </span>
                            </td>
                            <td>
                                <span>
                                    O+ O-
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span style={{color: '#770303'}}>
                                    <b>B+</b>
                                </span>   
                            </td>
                            <td>
                                <span>
                                    B+ AB+
                                </span>
                            </td>
                            <td>
                                <span>
                                    B+ B- O+ O-
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span style={{color: '#770303'}}>
                                    <b>AB+</b>
                                </span>   
                            </td>
                            <td>
                                <span>
                                    AB+
                                </span>
                            </td>
                            <td>
                                <span>
                                    Everyone
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span style={{color: '#770303'}}>
                                    <b>A-</b>
                                </span>   
                            </td>
                            <td>
                                <span>
                                    A+ A- AB+ AB-
                                </span>
                            </td>
                            <td>
                                <span>
                                    A- O-
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span style={{color: '#770303'}}>
                                    <b>O-</b>
                                </span>   
                            </td>
                            <td>
                                <span>
                                    Everyone
                                </span>
                            </td>
                            <td>
                                <span>
                                    O-
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span style={{color: '#770303'}}>
                                    <b>B-</b>
                                </span>   
                            </td>
                            <td>
                                <span>
                                    B+ B- AB+ AB-
                                </span>
                            </td>
                            <td>
                                <span>
                                    B- O-
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span style={{color: '#770303'}}>
                                    <b>AB-</b>
                                </span>   
                            </td>
                            <td>
                                <span>
                                    AB+ AB-
                                </span>
                            </td>
                            <td>
                                <span>
                                    AB- A- B- O-
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
    )
    
}

export default Blooddetailstable;