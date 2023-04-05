import React from 'react'
import Modal from '../Modal/Modal'
import styles from './Notification.module.css'

const Notification = ({onClose,content}) => {
  return (
    <Modal>
        <div className={styles.notificationContainer}>
            <div className={styles.headingContainer}>
                <h1 className={styles.heading}>Notification</h1>
            </div>
            <hr />
            <div className={styles.notificationBody}>
                <span>  
                    {content}
                </span>
                <span>
                    <button onClick={onClose} className={styles.notificationbtn}>
                        Okay
                    </button>
                </span>
            </div>
        </div>
    </Modal>
  )
}

export default Notification
