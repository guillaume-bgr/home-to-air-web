import Home from './pages/Home'
import Sensors from './pages/Sensors/Sensors'
import Template from './pages/Template'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ShowSensor from './pages/Sensors/ShowSensor'
import SensorForm from './components/forms/SensorForm'
import Parks from './pages/Parks/Parks'
import ShowPark from './pages/Parks/ShowPark'
import ParkForm from './components/forms/ParkForm'
import Profile from './pages/Profile/Profile'
import { AuthContext } from './context/AuthContext'
import { useState } from 'react'
import Companies from './pages/Companies/Companies'
import ShowUsersCompanies from './pages/Companies/ShowUsersCopanies'
import CompaniesForm from './components/forms/CompaniesForm'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Template />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/sensors',
        children: [
          {
            index: true,
            element: <Sensors />
          },
          {
            path: '/sensors/add',
            element: <SensorForm />
          },
          { 
            path: '/sensors/:id',
            element: <ShowSensor />
          },
          {
            path: '/sensors/edit/:id',
            element: <SensorForm action="edit" />
          },
        ]
      },
      {
        path: '/parks',
        children: [
          {
            index: true,
            element: <Parks />
          },
          {
            path: '/parks/:id',
            element: <ShowPark />
          },
          {
            path: '/parks/add',
            element: <ParkForm />
          },
          {
            path: '/parks/edit/:id',
            element: <ParkForm action="edit" />
          },
        ]
      },
      {
        path: '/profile',
        children: [
          {
            index: true,
            element: <Profile />
          }
        ]
      },
      {
        path: '/companies',
        children: [
          {
            index: true,
            element: <Companies />
          },
          {
            path: '/companies/:id',
            element: <ShowUsersCompanies />
          },
          {
            path: '/companies/edit/:id',
            element: <CompaniesForm action="edit"/>
          },
          {
            path: '/companies/add',
            element: <CompaniesForm/>
          },
        ]
      }
    ]
  },
])

function App() {
  const [token, setToken] = useState('');
  const [refresh, setRefresh] = useState('');
  const [userId, setUserId] = useState('');
  return (
    <>
      <AuthContext.Provider value={{
        token: token,
        setToken: setToken,
        refresh: refresh,
        setRefresh: setRefresh,
        userId: userId,
        setUserId: setUserId,
      }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </>
  )
}

export default App
