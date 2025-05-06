'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as React from "react";
import { useState } from "react"

export function SignUpForm({
  className,
  onSignup,
  ...props
}: React.ComponentProps<"div"> &
    {onSignup?: (data: { username: string; password: string }) => void;
})
{
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const sendCredentials = () => {
        if(onSignup){
            onSignup({username, password})
        }

    }
  
    return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Signup a new account</CardTitle>
          <CardDescription>
            Enter a username and password below to signup a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  type="email"
                  placeholder="user-01"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" 
                onChange={(e) => setPassword(e.target.value)}
                required />
              </div>
              <div className="flex flex-col gap-3">
                <Button className="w-full" onClick={sendCredentials}>
                  Signup
                </Button>
                <Button variant="outline" className="w-full">
                  Continue with Google
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
