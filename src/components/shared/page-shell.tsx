'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-neutral-200 bg-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              background:
                'radial-gradient(ellipse 85% 55% at 50% -25%, rgba(255, 140, 0, 0.14), transparent 55%), linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 py-11 sm:px-6 lg:px-8 lg:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff8c00]">Explore</p>
            <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-[2.5rem] lg:leading-tight">{title}</h1>
                {description ? <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">{description}</p> : null}
              </div>
              {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
