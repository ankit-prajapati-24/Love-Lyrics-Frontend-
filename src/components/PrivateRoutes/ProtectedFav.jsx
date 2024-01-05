import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedFav = () => {
const token = useSelector((state) => state.User.token);
  return (
    <div>

      
      
    </div>
  )
}

export default ProtectedFav
