import { signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import classes from './auth.module.css'
import { login, register } from '../../redux/authSlice'

const Auth = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`http://localhost:5000/auth/register`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ username, email, password })
      })
      const data = await res.json()
      dispatch(register(data))
      navigate('/')
    } catch (error) {
      setError(prev => true)
      setTimeout(() => {
        setError(prev => false)
      }, 2500)
      console.error(error)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`http://localhost:5000/auth/login`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      dispatch(login(data))
      navigate('/')
    } catch (error) {
      setError(prev => true)
      setTimeout(() => {
        setError(prev => false)
      }, 2500)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Sign up</h2>
        <form onSubmit={handleRegister}>
          <input type="username" onChange={(e) => setUsername(e.target.value)} />
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Sign up</button>
        </form>
        {error &&
          <div className={classes.errorMessage}>
            Wrong credentials! Try different ones.
          </div>
        }
        <hr />
        <p>Or</p>
        <h2>Sign in</h2>
        <form onSubmit={handleLogin}>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Sign in</button>
        </form>
        {error &&
          <div className={classes.errorMessage}>
            Wrong credentials! Try different ones.
          </div>
        }
      </div>
    </div>
  )
}

export default Auth