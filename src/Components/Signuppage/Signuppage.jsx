import React,{useRef, useState} from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import styles from './Signuppage.module.css'
const Signuppage = () => {

    const Navigate = useNavigate()

    let gender,tattoo
    
    const api_key = 'AIzaSyDo9QbzXklaHQi1_UL6A3DN-aUu_MqRdHA'

    const name = useRef('')

    const age = useRef('')

    const bloodGroup = useRef('')

    const stateName = useRef('')
    
    const district = useRef('')
    
    const city = useRef('')

    const address = useRef('')
    
    const phone = useRef(0)
    
    const email = useRef('')

    const password = useRef('')

    const confirmPassword = useRef('')

    const bloodcondition = useRef('')

    let url

    const onSaveData = () => {
        url = 'https://blooddonorseekingwebapp-default-rtdb.firebaseio.com/donordetails.json'
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id: localStorage.getItem('id'),
                name:name.current.value,
                age:age.current.value,
                gender: gender,
                bloodGroup:bloodGroup.current.value,
                state:stateName.current.value,
                district:district.current.value,
                city:city.current.value,
                address:address.current.value,
                phone:phone.current.value,
                email:email.current.value
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                throw new Error(data.error.message);
            }
            localStorage.removeItem('id')
            alert('Donor Details Added Successfully')
            Navigate('/login')
        })
        .catch(err => {
            alert(err.message)
        }
        )
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        if(tattoo==='Yes' || bloodcondition.current.value!=='none'){
            return alert('Sorry, You are not eligible to donate blood')
        }
        if(password.current.value !== confirmPassword.current.value){
            return alert('Password and Confirm Password should be same')
        }
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_key}`
        fetch(url,{
            method:'POST',
            body:JSON.stringify({
              email:email.current.value,
              password:password.current.value,
              returnSecureToken:true
            }),
            headers:{
              'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) {
              throw new Error(data.error.message);
            }
            localStorage.setItem('id',data.localId)
            alert('Account Created Successfully')
            onSaveData()
        })
        .catch(err => {
            alert(err.message)
            return
        })
    }

    const onGenderHandler = (e) => {
        gender = e.target.value
    }

    const onTattooHandler = (e) => {
        tattoo = e.target.value
    }

    return (
        <div className={styles['signup-container']}>
            <form className={styles['form-container']} onSubmit={onSubmitHandler}>
                <div className={styles.logoContainer}>
                    <img src="../../src/assets/lifesaver.png" alt="blood donor logo" className={styles.logo}/>
                </div>
                <h1 className={styles.heading}>Sign up</h1>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" ref={name} required />
                <label htmlFor="age">Age</label>
                <input type="number" id="age" name="age" ref={age} required/>
                <label htmlFor="gender">Gender</label>
                <div style={{margin: '20px 0 20px'}}>
                    <input type="radio" id="male" name="gender" value="Male" onChange={onGenderHandler} required/>
                    <label htmlFor='male' style={{fontWeight: 'lighter',display: 'inline'}}>Male</label> 
                    <input type="radio" id="female" name="gender" value="Female" onChange={onGenderHandler} required/>
                    <label htmlFor='female' style={{fontWeight: 'lighter',display: 'inline'}}>Female</label> 
                </div>
                <label htmlFor="bloodGroup">Blood Group</label>
                <select name="bloodGroup" id="bloodGroup" ref={bloodGroup} required>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
                <label htmlFor="state">State</label>
                <input type="text" id="state" name="state" ref={stateName} required/>
                <label htmlFor="district">District</label>
                <input type="text" id="district" name="district" ref={district} required/>
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" ref={city} required/>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" ref={address} required/>
                <label htmlFor="phone">Phone</label>
                <input type="number" id="phone" name="phone" ref={phone} required/>
                <label htmlFor="email" style={{display: 'inline'}}>Email </label>(This Email is used for login)
                <input type="email" id="email" name="email" ref={email} required/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" ref={password} required/>
                <label htmlFor="reenterpassword">Re-enter Password</label>
                <input type="password" id="reenterpassword" name="reenterpassword" ref={confirmPassword} required/>
                <label htmlFor="tattoo">Did you get tattooed in past 6 months?</label>
                <div style={{margin: '20px 0 20px'}}>
                    <input type="radio" id="yes" name="tattoo" onChange={onTattooHandler} value="Yes" required/>
                    <label htmlFor='yes' style={{fontWeight: 'lighter',display: 'inline'}}>Yes</label>
                    <input type="radio" id="no" name="tattoo" onChange={onTattooHandler} value="No" required/>
                    <label htmlFor='no' style={{fontWeight: 'lighter',display: 'inline'}}>No</label>
                </div>
                <label for="blood-conditions">Have you experienced any of the following conditions within the past three months? 
                {/* If yes, please select the appropriate condition(s): */}
                </label>
                <select name="blood-conditions" id="blood-conditions" ref={bloodcondition}>
                    <option value="none">None of the below</option>
                    <option value="HIV">HIV/AIDS</option>
                    <option value="hepatitis-b-c">Hepatitis B or C</option>
                    <option value="syphilis">Syphilis</option>
                    <option value="malaria">Malaria</option>
                    <option value="cjd">Creutzfeldt-Jakob Disease (CJD)</option>
                    <option value="vcjd">Variant Creutzfeldt-Jakob Disease (vCJD)</option>
                    <option value="chagas">Chagas disease</option>
                    <option value="ebola">Ebola virus disease (EVD)</option>
                    <option value="zika">Zika virus infection</option>
                </select>
                <div className={styles['formbtnandlink']} style={{}}>
                    <button type='submit' className={styles.btn}>Register as Donor</button>
                    <Link to='/login' className={styles.infotext} >Use an Existing Account</Link>
                </div>
            </form>
        </div>
    )
}

export default Signuppage;