import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext'

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [glerks, setGlerks] = useState([])
  const [state, setState] = useContext(AuthContext);
  useEffect(() => {
    fetch(`${process.env.BASE_PATH}/${state.user.id}/glerks`)
      .then(res => res.json())
      .then(body => {
        console.log(body)
        setGlerks(body)
        setLoading(false)
      })
  }, [])
  return(
    <div>
      <h1>Profile</h1>
      <p>{loading ? 'loading...' : ''}</p>
      {glerks.map(glerk => {
        return(
          <p>{glerk.content}</p>
        )
      })}
    </div>
  )
}

export default Profile;