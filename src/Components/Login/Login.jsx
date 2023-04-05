import React,{useState,useRef,useContext, useEffect} from 'react'
import { AuthContext } from '../Store/auth-context'
import { Link,useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import {auth,signInWithEmailAndPassword,onAuthStateChanged} from '../firebase.config'
const Login = () => {
  const navigate = useNavigate()

  const store = useContext(AuthContext)
  
  useEffect(
    () => {
      onAuthStateChanged(auth, (user) => {
        if(user && user.providerData[0].providerId==='password'){
          navigate('/blooddonorDashboardpage')
        }
      })
    },[]
  )

  // console.log(store)
  const email = useRef('')
  const password = useRef('')
  const [isDisabled,setIsDisabled] = useState(true)
  const [isLoading,setIsLoading] = useState(false)

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
    event.preventDefault();
    setIsLoading(true);
    setIsDisabled(true);
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    
    signInWithEmailAndPassword(auth,emailValue, passwordValue)
      .then((userCredential) => {
        const { user } = userCredential;
        store.tokenHandler(user.accessToken);
        store.idHandler(user.uid);
        navigate('/blooddonorDashboardpage');
        if (passwordValue !== '' && emailValue !== '') {
          setIsDisabled(false);
        } else {
          setIsDisabled(true);
        }
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setIsLoading(false);
        setIsDisabled(false)
      })
  }
  
  //old method of login is below:

  // const onSubmitHandler = (event) => {
  //   event.preventDefault()
  //   const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`
  //   const emailValue = email.current.value
  //   const passwordValue = password.current.value
  //   fetch(url,{
  //     method:'POST',
  //     body:JSON.stringify({
  //       email:emailValue,
  //       password:passwordValue,
  //       returnSecureToken:true
  //     }),
  //     headers:{
  //       'Content-Type':'application/json'
  //     }
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     if(data.error) {
  //       throw new Error(data.error.message);
  //     }
  //     store.tokenHandler(data.idToken)
  //     store.idHandler(data.localId)
  //     // localStorage.setItem('token',data.idToken)
  //     // localStorage.setItem('id',data.localId)
  //     // changeToken(data.idToken)
  //     navigate('/blooddonorDashboardpage')
  //   })
  //   .catch(err => {
  //     alert(err.message)
  //   })
  //   if(password.current.value!=='' && email.current.value!==''){
  //     setIsDisabled(false)
  //   }else{
  //     setIsDisabled(true)
  //   }
  // }

  return (
    <div className={styles.totalContainer}>
      <div className={styles.loginContainer}>
          <img src="../../src/assets/lifesaver.png" alt="blood donor logo" className={styles.logo}/>
          <h1>Login</h1>
          <form className={styles.formContainer} onSubmit={onSubmitHandler}>
            <label htmlFor="email" >Email</label>
            <input type="email" id="email" name="email" onChange={changeEmail} ref={email}/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={changePassword} ref={password}/>
            {/* <Link to="/forgotpassword">Forgot Password?</Link> */}
            <button type="submit" className={isDisabled ? styles.disabled : undefined} disabled={isDisabled ? true : false}>{!isLoading ? 'Login' : 'Loading...' }</button>
            <Link to='/signuppage' className={styles.infotext} >Create a New Account</Link>
          </form>
      </div>
    </div>
  )
}
export default Login