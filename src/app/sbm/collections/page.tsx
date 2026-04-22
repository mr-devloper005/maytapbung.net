'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FolderPlus } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BookmarkCollectionCard } from '@/components/sbm/bookmark-collection-card'
import { mockBookmarkCollections } from '@/data/mock-data'
import type { BookmarkCollection } from '@/types'
import { loadFromStorage, storageKeys } from '@/lib/local-storage'

export default function BookmarkCollectionsPage() {
  const [storedCollections, setStoredCollections] = useState<BookmarkCollection[]>([])
  const collections = useMemo(() => {
    const map = new Map<string, BookmarkCollection>()
    storedCollections.forEach((collection) => map.set(collection.id, collection))
    mockBookmarkCollections.forEach((collection) => {
      if (!map.has(collection.id)) {
        map.set(collection.id, collection)
      }
    })
    return Array.from(map.values())
  }, [storedCollections])

  useEffect(() => {
    setStoredCollections(loadFromStorage<BookmarkCollection[]>(storageKeys.bookmarkCollections, []))
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50">
      <NavbarShell />

      <main>
        <section className="border-b border-neutral-200 bg-white [background-image:radial-gradient(circle_at_15%_0%,rgba(255,140,0,0.08),transparent_50%)]">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-[#ff8c00]">Collections</p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-900">Curate links like a lightweight CMS.</h1>
                <p className="mt-2 max-w-2xl text-neutral-600">
                  Bundle research, vendor shortlists, and launch checklists—share read-only links with clients or keep
                  folders private for your crew.
                </p>
              </div>
              <Button className="gap-2 rounded-full bg-[#ff8c00] px-5 text-white hover:bg-[#e67e00]" asChild>
                <Link href="/sbm/collections/new">
                  <FolderPlus className="h-4 w-4" />
                  New collection
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {collections.map((collection) => (
              <BookmarkCollectionCard key={collection.id} collection={collection} />
            ))}
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
