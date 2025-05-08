'use client'

import { SignUpForm } from "@/components/signup-form"
import { useRouter } from "next/navigation"

export default function Page() {
  
  const router = useRouter();
  const sendCredentials = async (data : {username: string , password: string}) => {
    try {
     const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })    
      if(response.ok){
        router.push('/login')
      }else {
        console.log('unable to create user')
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm onSignup={sendCredentials}/>
     </div>
    </div>
  )
}
