'use client'

import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/login-form"

export default function Page() {
  const router = useRouter()

  const sendCredentials = async (data : {username: string , password: string}) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials: 'include'
      })      
      
      if(response.ok){
        router.push('/dashboard/links')
        console.log(response)
      } else {
        console.log('invalid credentials')
      }
      
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onLogin={sendCredentials}/>
      </div>
    </div>
  )
}
