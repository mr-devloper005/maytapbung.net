'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { loadFromStorage, saveToStorage, storageKeys } from '@/lib/local-storage'
import type { BookmarkCollection } from '@/types'

export default function NewCollectionPage() {
  const [isPrivate, setIsPrivate] = useState(false)
  const [saved, setSaved] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { toast } = useToast()

  return (
    <PageShell
      title="New collection"
      description="Name the lane, describe what belongs inside, and choose visibility—perfect for client research packs or internal onboarding."
      actions={
        <Button variant="outline" className="rounded-full border-neutral-200" asChild>
          <Link href="/sbm/collections">Back to collections</Link>
        </Button>
      }
    >
      <Card className="border-neutral-200 bg-white shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-900">Collection name</label>
            <Input
              className="mt-2"
              placeholder="Design Systems"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-900">Description</label>
            <Textarea
              className="mt-2"
              placeholder="What belongs in this folder?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900">Private collection</p>
              <p className="text-xs text-neutral-600">Hidden from public lists—only you can open it.</p>
            </div>
            <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
          </div>
          <Button
            className="rounded-full bg-[#ff8c00] text-white hover:bg-[#e67e00]"
            onClick={() => {
              if (!name.trim()) {
                toast({ title: 'Name required', description: 'Give your collection a name.' })
                return
              }
              const newCollection: BookmarkCollection = {
                id: `user-collection-${Date.now()}`,
                name: name.trim(),
                description: description.trim() || 'Personal collection',
                updatedAt: new Date().toISOString(),
                isPrivate,
                bookmarks: [],
                coverImages: ['/placeholder.svg?height=240&width=240'],
              }
              const stored = loadFromStorage<BookmarkCollection[]>(storageKeys.bookmarkCollections, [])
              saveToStorage(storageKeys.bookmarkCollections, [newCollection, ...stored])
              setSaved(true)
              toast({ title: 'Collection created', description: 'Your collection is ready.' })
            }}
          >
            Create collection
          </Button>
          {saved && <p className="text-sm text-neutral-600">Collection created and synced to this device.</p>}
        </CardContent>
      </Card>
    </PageShell>
  )
}
