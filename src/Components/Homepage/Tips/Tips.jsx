import React from 'react'

import styles from './Tips.module.css'

import TipsCard from './TipsCard/TipsCard'

const Tips = () => {

    const headings = {
        heading1: "The day before",
        heading2: "On the Donation day",
        heading3: "After the Donation"
    }

    const pointsone = {
        first: "Have an iron-rich diet such as beans, spinach or meat, poultry.",
        second: "Do carry your identify identification forms e.g. driver's license",
        third: "Reward yourself with a snack as refreshment immediately."
    }

    const pointstwo = {
        first: "Have a proper sleep of at least 8 hours.",
        second: "Drink 2 cups of water before donating blood",
        third: "Drink more liquids over a period of 24 hours"
    }

    const pointsthree = {
        first: "Include more liquids in your diet",
        second: "Wear a half sleeve shirt so that you can easily roll it up avoid fast food before donation",
        third: "Remove the bandage after few hours"
    }

    return (
        <div className={styles.tipscontainer}>
            <h1 style={{color: '#c40404'}}>Tips</h1>
            <p>Here are some tips to put your mind at ease during the blood donation process</p>
            <div className={styles.tipscards}>
                <TipsCard heading={headings.heading1} pointone={pointsone.first} pointtwo={pointstwo.first} pointthree={pointsthree.first}/>
                <TipsCard heading={headings.heading2} pointone={pointsone.second} pointtwo={pointstwo.second} pointthree={pointsthree.second}/>
                <TipsCard heading={headings.heading3} pointone={pointsone.third} pointtwo={pointstwo.third} pointthree={pointsthree.third}/>
            </div>
        </div>
    )

}

export default Tips