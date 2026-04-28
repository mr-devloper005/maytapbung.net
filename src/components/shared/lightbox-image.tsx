'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'

export function LightboxImage({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="h-full w-full text-left">
        <ContentImage src={src} alt={alt} fill className={className || 'object-cover'} />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
          <button
            type="button"
            aria-label="Close image popup"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white p-2 text-neutral-900 hover:bg-neutral-200"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative h-[75vh] w-full max-w-5xl overflow-hidden rounded-lg bg-black">
            <ContentImage src={src} alt={alt} fill className="object-contain" />
          </div>
        </div>
      ) : null}
    </>
  )
}
