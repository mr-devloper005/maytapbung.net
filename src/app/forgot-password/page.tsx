"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavbarShell } from "@/components/shared/navbar-shell"
import { Footer } from "@/components/shared/footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <NavbarShell />
      <main className="mx-auto max-w-lg px-4 py-16 sm:px-6 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm sm:p-10"
        >
          <Link
            href="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-[#ff8c00]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          {!isSubmitted ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff8c00]">Account recovery</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900">Reset your password</h1>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                Enter the email you use for listings. We will send a secure link so you can choose a new password and get back to managing your directory presence.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-neutral-800">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 border-neutral-200 bg-neutral-50 pl-10 text-neutral-900 placeholder:text-neutral-400"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="h-12 w-full rounded-full bg-[#ff8c00] font-semibold text-white hover:bg-[#e67e00]" disabled={isLoading}>
                  {isLoading ? "Sending…" : "Send reset link"}
                </Button>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#ff8c00]/15">
                <CheckCircle className="h-8 w-8 text-[#ff8c00]" />
              </div>
              <h1 className="text-2xl font-bold text-neutral-900">Check your email</h1>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                If <strong className="text-neutral-900">{email}</strong> matches an account, you will receive reset instructions shortly.
              </p>
              <Button asChild variant="outline" className="mt-8 w-full rounded-full border-neutral-200">
                <Link href="/login">Back to login</Link>
              </Button>
              <p className="mt-6 text-sm text-neutral-500">
                Didn&apos;t receive anything?{" "}
                <button type="button" onClick={() => setIsSubmitted(false)} className="font-semibold text-[#ff8c00] hover:underline">
                  Try again
                </button>
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
