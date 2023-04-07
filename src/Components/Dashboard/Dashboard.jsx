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

    const [iD,setID] = useState('')
    const [name,setName] = useState('')
    const [district,setDistrict] = useState('')
    const [phone,setPhone] = useState('')
    const [age,setAge] = useState('')
    const [gender,setGender] = useState('')
    const [bloodgroup,setBloodgroup] = useState('')
    const [email,setEmail] = useState('')
    const [address,setAddress] = useState('')
    const [state,setState] = useState('')
    const [city,setCity] = useState('')
    const [count,setCount] = useState(0)
    const [requestDetail,setRequestDetail] = useState([])
    const detail = {
        id: iD,
        name: name,
        district: district,
        phone: phone,
        age: age,
        gender: gender,
        bloodGroup: bloodgroup,
        email: email,
        address: address,
        state: state,
        city: city,
    }
    const request = {
        count: count,
        requestDetail: requestDetail
    }
    let userId = ''

    // const [donordata,setDonordata] = useState(null) 

    const updateRequestDetail = (attendeeName,quantity,bloodGroup) =>{
        let newRequestDetail = []
        console.log(attendeeName,quantity,bloodGroup)
        console.log(requestDetail)
        requestDetail.map((item)=>{
            if(!(item.attendeeName === attendeeName && item.quantity === quantity && item.bloodgroup === bloodGroup)){
                newRequestDetail.push(item)
            }
            // console.log(newRequestDetail)
            setRequestDetail(newRequestDetail)
        })
    }

    // console.log(id)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user)
            if(!user || user.providerData[0].providerId === 'phone'){
                navigate('/login')
            }
            else{
                    userId = user.uid
                    setID(userId)
                    const url = 'http://localhost:3000/fetchdonordetail'
                    fetch(url,{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({id: userId})
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        console.log(data)
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
                            setState(data.detail.state) 
                            setDistrict(data.detail.district)
                            setCity(data.detail.city)
                            setIsloading(false)
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    }
                    )

                    fetch('http://localhost:3000/notification',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({id: userId})
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        // console.log(data.count)
                        // console.log(data.requestDetail)
                        setCount(data.count)
                        setRequestDetail(data.requestDetail)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            }
        })
    },[])
    // console.log(donordata)

    // const onLogoutHandler = () => {
    //     store.logoutHandler()
    //     navigate('/login')
    // }

    const reduceCount = () => {
        setCount(cur => cur-1)
    }

    console.log(userId)
    const detailDiv = isloading ? <div>Loading...</div> : <Updateprofile detail={detail} request={request} reduceCount={reduceCount} updateRequestDetail={updateRequestDetail}/>

    return (
        <>
            {detailDiv}
        </>
        
    )

}

export default Dashboard