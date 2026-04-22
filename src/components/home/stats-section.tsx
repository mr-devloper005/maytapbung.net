'use client'

import { motion } from 'framer-motion'
import { Building2, MapPin, Search, ShieldCheck, Users } from 'lucide-react'

const stats = [
  {
    icon: Building2,
    value: '10+',
    label: 'Years experience',
    description: 'Operating trusted listing surfaces for local teams',
  },
  {
    icon: Search,
    value: '2M+',
    label: 'Searches guided',
    description: 'Visitors finding the right category faster',
  },
  {
    icon: MapPin,
    value: '120+',
    label: 'Cities covered',
    description: 'Location-aware cards and filters',
  },
  {
    icon: ShieldCheck,
    value: '98%',
    label: 'Verified lanes',
    description: 'Listings with structured trust metadata',
  },
  {
    icon: Users,
    value: '50K+',
    label: 'Happy seekers',
    description: 'Teams and individuals who found a match',
  },
]

export function StatsSection() {
  return (
    <section className="border-y border-neutral-200 bg-neutral-100 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff8c00]">By the numbers</p>
          <h2 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">Proof that the directory keeps moving</h2>
          <p className="mt-2 text-neutral-600">Signals that matter to operators and seekers alike.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#ff8c00]/12">
                <stat.icon className="h-7 w-7 text-[#ff8c00]" />
              </div>
              <div className="text-3xl font-bold text-neutral-900">{stat.value}</div>
              <div className="mt-1 font-medium text-neutral-900">{stat.label}</div>
              <div className="mt-1 text-sm text-neutral-600">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
