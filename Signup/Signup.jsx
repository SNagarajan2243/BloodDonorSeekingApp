import React,{useState,useRef} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import styles from './Signup.module.css'
const Login = () => {
  const navigate = useNavigate()
  const api_key = 'AIzaSyDo9QbzXklaHQi1_UL6A3DN-aUu_MqRdHA'
  const email = useRef('')
  const password = useRef('')
  const [isDisabled,setIsDisabled] = useState(true)

  const changeEmail = () => {
    if(email.current.value!=='' && password.current.value!==''){
      setIsDisabled(false)
    }else{
      setIsDisabled(true)
    }
  }
  const changePassword = () => {
    if(password.current.value!=='' && email.current.value!==''){
      setIsDisabled(false)
    }else{
      setIsDisabled(true)
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_key}`
    const emailValue = email.current.value
    const passwordValue = password.current.value
    fetch(url,{
      method:'POST',
      body:JSON.stringify({
        email:emailValue,
        password:passwordValue,
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
      alert('Account Created Successfully')
      localStorage.setItem('id',data.localId)
      navigate('/donorForm')
    })
    .catch(err => {
      alert(err.message)
    })
    if(password.current.value!=='' && email.current.value!==''){
      setIsDisabled(false)
    }else{
      setIsDisabled(true)
    }
  }

  return (
    <div className={styles.totalContainer}>
      <div className={styles.loginContainer}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqw34-bvureNh-FN-L43aXa2dQU_5bVC2h3A&usqp=CAU" alt="blood donor logo" className={styles.logo}/>
        <h1>Sign Up</h1>
        <form className={styles.formContainer} onSubmit={onSubmitHandler}>
          <label htmlFor="email" >Email</label>
          <input type="email" id="email" name="email" onChange={changeEmail} ref={email}/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={changePassword} ref={password}/>
          {/* <Link to="/forgotpassword">Forgot Password?</Link> */}
          <button type="submit" className={isDisabled ? styles.disabled : undefined} disabled={isDisabled ? true : false}>Sign Up</button>
          <Link to='/login' className={styles.infotext} >Use an Existing Account</Link>
        </form>
      </div>
    </div>
  )
}

export default Login