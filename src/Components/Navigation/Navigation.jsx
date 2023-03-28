import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Store/auth-context'
import styles from './Navigation.module.css'
const Navigation = () => {

    const navigate = useNavigate()
    
    const store = useContext(AuthContext)

    const token = store.token

    const loginFunction = () => {
        navigate('/login')
    }

    const logoutFunction = () => {
        store.logoutHandler()
        navigate('/')
    }

    return (
        <button onClick={token ? logoutFunction : loginFunction}>
            {token ? 'Logout' : 'Login'}
        </button>
    )
}
export default Navigation