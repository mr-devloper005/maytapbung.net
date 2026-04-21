'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { Search } from 'lucide-react'

export function DirectoryHeroSearch() {
  const router = useRouter()
  const [tab, setTab] = useState('search')
  const [keywords, setKeywords] = useState('')
  const [city, setCity] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [minBudget, setMinBudget] = useState('')
  const [maxBudget, setMaxBudget] = useState('')

  const runSearch = () => {
    const parts = [keywords, city, neighborhood].map((s) => s.trim()).filter(Boolean)
    const query = parts.join(' ').trim()
    const href = query ? `/search?q=${encodeURIComponent(query)}&task=listing&master=1` : '/listings'
    router.push(href)
  }

  const runBudgetSearch = () => {
    const q = ['listing budget', minBudget && `from ${minBudget}`, maxBudget && `to ${maxBudget}`].filter(Boolean).join(' ')
    router.push(`/search?q=${encodeURIComponent(q)}&task=listing&master=1`)
  }

  return (
    <div className="rounded-2xl border border-white/20 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.18)] sm:p-6">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-xl bg-neutral-100 p-1">
          <TabsTrigger value="search" className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm sm:text-sm">
            Search
          </TabsTrigger>
          <TabsTrigger value="category" className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm sm:text-sm">
            Category
          </TabsTrigger>
          <TabsTrigger value="budget" className="rounded-lg text-xs font-semibold data-[state=active]:bg-white data-[state=active]:shadow-sm sm:text-sm">
            Budget
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="mt-5 space-y-4 outline-none">
          <div className="space-y-2">
            <Label htmlFor="hero-q" className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
              Keywords
            </Label>
            <Input
              id="hero-q"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Business name, service, or keyword"
              className="h-11 rounded-xl border-neutral-200 bg-neutral-50"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="hero-loc" className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
                City or area
              </Label>
              <Input
                id="hero-loc"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Ho Chi Minh City"
                className="h-11 rounded-xl border-neutral-200 bg-neutral-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-neighborhood" className="text-xs font-semibold uppercase tracking-wide text-neutral-600">
                Neighborhood (optional)
              </Label>
              <Input
                id="hero-neighborhood"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="District or ward"
                className="h-11 rounded-xl border-neutral-200 bg-neutral-50"
              />
            </div>
          </div>
          <Button type="button" className="h-12 w-full rounded-xl bg-[#ff8c00] text-base font-semibold text-white hover:bg-[#e67e00]" onClick={runSearch}>
            <Search className="mr-2 h-4 w-4" />
            Search listings
          </Button>
        </TabsContent>

        <TabsContent value="category" className="mt-5 space-y-4 outline-none">
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wide text-neutral-600">Browse by category</Label>
            <Select onValueChange={(slug) => router.push(slug === 'all' ? '/listings' : `/listings?category=${encodeURIComponent(slug)}`)}>
              <SelectTrigger className="h-11 rounded-xl border-neutral-200 bg-neutral-50">
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {CATEGORY_OPTIONS.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-neutral-600">Jump straight into listings that match your industry or need.</p>
          <Button type="button" variant="outline" className="h-11 w-full rounded-xl border-neutral-200" onClick={() => router.push('/listings')}>
            View all listings
          </Button>
        </TabsContent>

        <TabsContent value="budget" className="mt-5 space-y-4 outline-none">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wide text-neutral-600">Min budget</Label>
              <Input
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
                placeholder="e.g. 500"
                className="h-11 rounded-xl border-neutral-200 bg-neutral-50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wide text-neutral-600">Max budget</Label>
              <Input
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                placeholder="e.g. 5000"
                className="h-11 rounded-xl border-neutral-200 bg-neutral-50"
              />
            </div>
          </div>
          <Button type="button" className="h-12 w-full rounded-xl bg-[#ff8c00] text-base font-semibold text-white hover:bg-[#e67e00]" onClick={runBudgetSearch}>
            Match listings
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
