import React, { useState } from 'react'

export const AuthContext = React.createContext({
    token: null,
    id: null,
    tokenHandler: (token) => {},
    idHandler: (id) => {},
    logoutHandler: () => {}
})

const AuthContextProvider = (props) => {

    const [token,setToken] = useState(localStorage.getItem('token'))
    const [id,setId] = useState(localStorage.getItem('id'))

    const changeToken = (token) => {
        setToken(token)
        localStorage.setItem('token',token)
    }

    const changeId = (id) => {
        setId(id)
        localStorage.setItem('id',id)
    }

    const logoutFunction = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        setToken(null)
        setId(null)
    }

    return (
        <AuthContext.Provider value={{
            token: token,
            id: id,
            tokenHandler: changeToken,
            idHandler: changeId,
            logoutHandler: logoutFunction
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider