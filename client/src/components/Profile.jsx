import { Button } from '@mui/material'
import React from 'react'

export default function Profile() {
    const handleBuySubscription = () => {
        
    }
  return (
    <div>
        <Button variant='contained' onClick={()=>handleBuySubscription}>
            Buy subscription
        </Button>
    </div>
  )
}
