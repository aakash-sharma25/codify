import { Toolbar } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'

function EmployeeDetails() {
    const {userId} = useParams();
    
  return (
    <p> {userId} </p>
  )
}

export default EmployeeDetails