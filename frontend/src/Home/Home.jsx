import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <Button onClick={()=>{navigate("/dashboard")}}>
            Dashboard
        </Button>
    </div>
  )
}

export default Home