import React from 'react'

import styles from './TipsCard.module.css'

const TipsCard = ({heading,pointone,pointtwo,pointthree}) => {

    return (
        <div className={styles.tipscard}>
            <div>
                <h2 style={{textAlign: 'center',padding: '10px',fontFamily:'ubuntu,sans-serif'}}>{heading}</h2>
            </div>
            <hr></hr>
            <div className={styles.tipscardlistcontainer}>
                <ul>
                    <li className={styles.tipscardlist}>{pointone}</li>
                    <li className={styles.tipscardlist}>{pointtwo}</li>
                    <li className={styles.tipscardlist}>{pointthree}</li>
                </ul>
            </div>
        </div>
    )

}

export default TipsCard