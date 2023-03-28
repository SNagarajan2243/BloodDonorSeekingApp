import React,{useRef, useState} from 'react'
import { useNavigate } from 'react-router'
import styles from './DonorForm.module.css'
const DonorForm = () => {

    // const [idToken,setIdToken] = useState(state.idToken)

    // console.log(idToken)

    const Navigate = useNavigate()

    const signUpToken = localStorage.getItem('id')

    const name = useRef('')

    const age = useRef('')

    const bloodGroup = useRef('')

    const stateName = useRef('')
    
    const district = useRef('')
    
    const city = useRef('')
    
    const phone = useRef(0)
    
    const email = useRef('')

    const onSubmitHandler = (event) => {
        event.preventDefault()
        console.log(name.current.value)
        console.log(age.current.value)
        console.log(bloodGroup.current.value)
        console.log(stateName.current.value)
        console.log(district.current.value)
        console.log(city.current.value)
        console.log(phone.current.value)
        console.log(email.current.value)
        const url = 'https://blooddonorseekingwebapp-default-rtdb.firebaseio.com/donordetails.json'
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                key: signUpToken,
                id: signUpToken,
                name:name.current.value,
                age:age.current.value,
                bloodGroup:bloodGroup.current.value,
                state:stateName.current.value,
                district:district.current.value,
                city:city.current.value,
                phone:phone.current.value,
                email:email.current.value
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                throw new Error(data.error.message);
            }
            alert('Donor Details Added Successfully')
            Navigate('/login')
        })
        .catch(err => {
            alert(err.message)
        }
        )
    }

    return (
        <div>
            <h1 className={styles.heading}>Donor Form</h1>
            <form className={styles['form-container']} onSubmit={onSubmitHandler}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" ref={name} required />
                <label htmlFor="age">Age</label>
                <input type="number" id="age" name="age" ref={age} required/>
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
                <label htmlFor="phone">Phone</label>
                <input type="number" id="phone" name="phone" ref={phone} required/>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" ref={email} required/>
                <button type='submit' className={styles.btn}>Submit</button>
            </form>
        </div>
    )
}

export default DonorForm;