import React,{useContext,useEffect,useState} from 'react'

import { useNavigate } from 'react-router'

import { AuthContext } from '../Store/auth-context'

import Updateprofile from './Updateprofile/Updateprofile'

import {auth,onAuthStateChanged} from '../firebase.config'

const Dashboard = () => {

    const navigate = useNavigate()

    const id = useContext(AuthContext).id

    const token = useContext(AuthContext).token

    const store = useContext(AuthContext)

    const [isloading,setIsloading] = useState(true)

    const [name,setName] = useState('')
    const [district,setDistrict] = useState('')
    const [phone,setPhone] = useState('')
    const [age,setAge] = useState('')
    const [gender,setGender] = useState('')
    const [bloodgroup,setBloodgroup] = useState('')
    const [email,setEmail] = useState('')
    const [address,setAddress] = useState('')
    const detail = {
        name: name,
        district: district,
        phone: phone,
        age: age,
        gender: gender,
        bloodgroup: bloodgroup,
        email: email,
        address: address
    }
    let userId = ''

    // const [donordata,setDonordata] = useState(null) 

    // console.log(id)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user)
            if(!user || user.providerData[0].providerId === 'phone'){
                navigate('/login')
            }
            else{
                    userId = user.uid
                    const url = 'http://localhost:3000/fetchdonordetail'
                    fetch(url,{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({id: userId})
                    }).then(res=>res.json())
                    .then(data=>{
                        // setDonordata(data)
                        if(data.detail!==null){
                            setName(data.detail.name)   
                            setDistrict(data.detail.district)
                            setPhone(data.detail.phone)
                            setAge(data.detail.age)
                            setGender(data.detail.gender)
                            setBloodgroup(data.detail.bloodGroup)
                            setEmail(data.detail.email)
                            setAddress(data.detail.address)
                            setIsloading(false)
                        }
                    })
            }
        })
    },[])
    // console.log(donordata)

    // const onLogoutHandler = () => {
    //     store.logoutHandler()
    //     navigate('/login')
    // }

    const detailDiv = isloading ? <div>Loading...</div> : <Updateprofile detail={detail}/>

    return (
        <>
            {detailDiv}
        </>
        
    )

}

export default Dashboard