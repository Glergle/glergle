import React, {useContext, useState} from 'react';
import { AuthContext } from '../AuthContext';

const Login = () => {
  const [state, setState] = useContext(AuthContext);
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const handleChange = (event, func) => {
    func(e.target.value)
  }
  const submitForm = (e) => {
    const data = {
      username: user,
      password: pass
    }
    e.preventDefault()
    fetch(`http://localhost:3000/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(body => {
      if (body.cookie) {
        setState({isAuthenticated: true})
      }
    })
  }
  return(
    <div>
      <h1>Login</h1>
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="username"
          value={user}
          onChange={e => setUser(e.target.value)}></input>
        <input
        type="password"
        name="password"
        value={pass}
        onChange={e => setPass(e.target.value)}></input>
        <button type="submit">
          {state.isAuthenticated ? 'Logout' : 'Login'} here
        </button>

      </form>
      <a href={`${process.env.BASE_PATH}/login`}>Login</a>
    </div>
  )
}

export default Login;