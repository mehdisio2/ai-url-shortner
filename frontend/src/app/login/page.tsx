'use client'

import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/login-form"

export default function Page() {
  const router = useRouter()

  const sendCredentials = async (data : {username: string , password: string}) => {
    try {
      const response = await fetch('https://ai-url-shortner.onrender.com/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      })      
      
      if(response.ok){
        router.push('/dashboard/links')
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
