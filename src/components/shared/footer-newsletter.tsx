'use client'

import { FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

export function FooterNewsletter() {
  const { toast } = useToast()
  const [email, setEmail] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    toast({
      title: 'Thanks for subscribing',
      description: 'We will share curated listing updates and platform news.',
    })
    setEmail('')
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:items-center">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="h-11 flex-1 rounded-lg border-neutral-200 bg-white"
      />
      <Button type="submit" className="h-11 shrink-0 rounded-lg bg-[#ff8c00] px-5 font-semibold text-white hover:bg-[#e67e00]">
        Subscribe now
      </Button>
    </form>
  )
}
