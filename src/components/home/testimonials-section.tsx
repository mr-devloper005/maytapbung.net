'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { mockTestimonials } from '@/data/mock-data'

export function TestimonialsSection() {
  return (
    <section className="border-b border-neutral-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff8c00]">Testimonial</p>
          <h2 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">Voices of success</h2>
          <p className="mt-2 text-neutral-600">Teams that rely on structured listings every week.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {mockTestimonials.map((testimonial, index) => {
            const author = testimonial.author
            const name = author?.name?.trim() || 'Customer'
            const avatar = author?.avatar?.trim() || undefined
            const initial = name.charAt(0).toUpperCase() || '?'

            const roleLine = [testimonial.role, testimonial.company].filter(Boolean).join(' · ')

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-neutral-200 bg-neutral-50 shadow-sm">
                  <CardContent className="flex h-full flex-col p-6">
                    <Quote className="mb-4 h-8 w-8 text-[#ff8c00]/60" />
                    <p className="mb-6 flex-1 text-neutral-600">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          {avatar ? <AvatarImage src={avatar} alt={name} /> : null}
                          <AvatarFallback>{initial}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-neutral-900">{name}</div>
                          {roleLine ? <div className="text-sm text-neutral-600">{roleLine}</div> : null}
                        </div>
                      </div>
                      <div className="flex">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
