'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/auth-context'

type LoginFormProps = {
  primaryButtonClass: string
}

export function LoginForm({ primaryButtonClass }: LoginFormProps) {
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [error, setError] = useState('')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    const form = event.currentTarget
    const email = String(new FormData(form).get('email') || '').trim()
    const password = String(new FormData(form).get('password') || '')

    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }

    await login(email, password)
    toast({
      title: 'Signed in successfully',
      description: 'Your session is saved on this device.',
    })
    router.push('/')
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">Welcome back</p>
      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input id="login-email" name="email" type="email" autoComplete="email" required className="h-12 rounded-xl border-neutral-200 bg-white" placeholder="you@company.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <Input id="login-password" name="password" type="password" autoComplete="current-password" required className="h-12 rounded-xl border-neutral-200 bg-white" placeholder="••••••••" />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" disabled={isLoading} className={`h-12 rounded-full text-sm font-semibold ${primaryButtonClass}`}>
          {isLoading ? 'Signing in…' : 'Login'}
        </Button>
      </form>
      <div className="mt-6 flex flex-col gap-3 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/forgot-password" className="hover:underline">
          Forgot password?
        </Link>
        <Link href="/register" className="inline-flex items-center gap-2 font-semibold text-neutral-900 hover:underline">
          <Sparkles className="h-4 w-4 text-[#ff8c00]" />
          Create account
        </Link>
      </div>
    </div>
  )
}
