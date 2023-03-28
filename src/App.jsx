import React,{useState} from 'react'
import Homepage from './Components/Homepage/Homepage'
import Login from './Components/Login/Login'
import ErrorPage from './Components/ErrorPage/ErrorPage'
import AuthContextProvider from './Components/Store/auth-context'
import NewRequest from './Components/NewRequest/NewRequest'
import Dashboard from './Components/Dashboard/Dashboard'
import Signuppage from './Components/Signuppage/Signuppage'
import SearchDonor from './Components/SearchDonor/SearchDonor'
import Admin from './Components/Admin/Admin'
import AdminDetail from './Components/Admin/AdminDetail/AdminDetail'
import {createBrowserRouter,RouterProvider,Navigate} from 'react-router-dom'
const App = () => {

  const Token = localStorage.getItem('token') 
  const [token,setToken] = useState(Token)
  // const changeToken = (token) =>{
  //   setToken(token)
  // }
  // const paths = !!token ? ({
  //   path:'/blooddonorhomepage',
  //   element: <Homepage />
  // }) : ''
  // const paths = token?.path && token?.element ? {
  //   path: token.path,
  //   element: token.element
  // } : {
  //   path: 'blooddonorDashboardpage',
  //   element: <Dashboard />
  // };
  
  // const router = createBrowserRouter([
  //   {
  //     path:'/',
  //     element: <Navigate to='/homepage' />,
  //     errorElement: <ErrorPage />
  //   },
  //   {
  //     path:'/homepage',
  //     element: <Homepage />
  //   },
  //   {
  //     path:'/login',
  //     element: <Login />,
  //     errorElement: <ErrorPage />
  //   },
  //   {
  //     path:'/signup',
  //     element: <Signup />,
  //     errorElement: <ErrorPage />
  //   },
  //   {
  //     path:'/donorform',
  //     element: <DonorForm />
  //   },
  //   paths
  // ])
  const router = createBrowserRouter([
    {path: '/',children: [
      {
        index: true,element: <Navigate to='/homepage' />,errorElement: <ErrorPage />
      },
      {
        path:'homepage',
        element: <Homepage />
      },
      {
        path:'login',
        element: <Login />
      },
      // {
      //   path:'signup',
      //   element: <Signup />
      // },
      {
        path:'signuppage',
        element: <Signuppage />
      },
      // {
      //   path:'donorform',
      //   element: <DonorForm />
      // },
      {
        path: 'searchdonor',
        element: <SearchDonor />
      },
      {
        path: 'newrequest',
        element: <NewRequest />
      },
      {
        path: 'admin',
        children: [
          {
            index: true,element: <Admin />,errorElement: <ErrorPage />
          },
          {
            path: 'adminDashboardpage',
            element: <AdminDetail />
          }
        ]
      },
      {
        path: 'blooddonorDashboardpage',
        element: <Dashboard />
      }
    ]}
  ])
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  )
}
export default App