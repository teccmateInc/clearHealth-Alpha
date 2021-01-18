import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './components/Forms/Login'
import SignUp from './components/Forms/SignUp'
import ForgetPassword from './components/Forms/ForgetPassword'
import RecordsTimeLine from './components/Records/RecordTimeLine'
import Facilities from './components/Facilities/Facilities'
import Requests from './components/Requests'
import Share from './components/Share'
import MenuAppBar from './components/MenuAppBar'
import NotFound from './components/404'
import './style.css'
import UserContext from './context/UserContext'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import Loader from './components/Loading'

export default function App() {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    token: null,
    user: null,
  })

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token')
      if (token === null) {
        localStorage.removeItem('auth-token')
        history.push('/')
      } else {
        setLoading(true)
        const tokenRes = await Axios.post(
          'http://localhost:5000/users/tokenIsValid',
          null,
          { headers: { 'x-auth-token': token } }
        )
        if (tokenRes.data || userData.token) {
          const userRes = await Axios.get('http://localhost:5000/users/', {
            headers: { 'x-auth-token': token },
          })
          setUserData({
            token,
            user: userRes.data,
          })
          history.push('/Timeline')
        } else {
          setLoading(false)
          history.push('/')
        }
      }
    }

    checkLoggedIn()
    return () => setLoading(false)
  }, [setUserData])

  return (
    <div className='App'>
      {!userData.token && loading ? (
        <Loader />
      ) : (
        <UserContext.Provider value={{ userData, setUserData }}>
          <Switch>
            <Route path='/' component={Login} exact />
            <Route path='/Timeline' exact>
              <MenuAppBar />
              <RecordsTimeLine />
            </Route>
            <Route path='/Facilities' exact>
              <MenuAppBar />
              <Facilities />
            </Route>
            <Route path='/Requests' exact>
              <MenuAppBar />
              <div style={{ marginBottom: 150 }}></div>
              <Requests />
            </Route>
            <Route path='/Share' exact>
              <MenuAppBar />
              <Share />
            </Route>
            <Route path='/SignUp' exact>
              <SignUp />
            </Route>
            <Route path='/ForgetPassword' exact>
              <ForgetPassword />
            </Route>
            <Route component={NotFound} exact></Route>
          </Switch>
        </UserContext.Provider>
      )}
    </div>
  )
}
