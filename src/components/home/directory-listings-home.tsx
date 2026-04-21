import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Clock, LineChart, Package, Shield } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { DirectoryHeroSearch } from '@/components/home/directory-hero-search'
import { StatsSection } from '@/components/home/stats-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'

const HERO_BG =
  'https://images.unsplash.com/photo-1586528116311-ad8dd3a6088?auto=format&fit=crop&w=2400&q=80'
const WAREHOUSE_BG =
  'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=2400&q=80'
const CTA_BG =
  'https://images.unsplash.com/photo-1494412519320-aa613dfb1098?auto=format&fit=crop&w=2400&q=80'

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' && post?.content && Array.isArray((post.content as { images?: string[] }).images)
      ? (post.content as { images: string[] }).images.find((url: unknown) => typeof url === 'string' && url)
      : null
  const logo =
    typeof post?.content === 'object' && post?.content && typeof (post.content as { logo?: string }).logo === 'string'
      ? (post.content as { logo: string }).logo
      : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getPostMeta(post?: SitePost | null) {
  if (!post || typeof post.content !== 'object' || !post.content) return { location: '', category: '' }
  const content = post.content as Record<string, unknown>
  return {
    location:
      typeof content.address === 'string'
        ? content.address
        : typeof content.location === 'string'
          ? content.location
          : '',
    category: typeof content.category === 'string' ? content.category : typeof post.tags?.[0] === 'string' ? post.tags[0] : '',
  }
}

export function DirectoryListingsHome({ listingPosts }: { listingPosts: SitePost[] }) {
  const moreListings = listingPosts.slice(3, 7)
  const slots: (SitePost | null)[] = [0, 1, 2].map((i) => listingPosts[i] ?? null)

  return (
    <main className="bg-white text-neutral-900">
      {/* Hero */}
      <section className="relative min-h-[560px] overflow-hidden border-b border-neutral-200 lg:min-h-[620px]">
        <div className="absolute inset-0">
          <ContentImage src={HERO_BG} alt="Freight trucks at a logistics hub" fill className="object-cover" priority sizes="100vw" intrinsicWidth={2400} intrinsicHeight={1400} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/25" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div className="max-w-xl flex-1 text-white lg:max-w-lg">
            <span className="inline-flex rounded-full bg-[#ff8c00]/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">Listings</span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Reliable discovery,
              <span className="block text-white/95">seamless local listings</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/85 sm:text-lg">
              Compare verified businesses, filter by category and location, and reach the right provider without wading through unrelated content types.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full border-2 border-white bg-transparent px-6 text-sm font-semibold text-white hover:bg-white hover:text-neutral-900"
              >
                <Link href="/register">Get started now</Link>
              </Button>
              <Button asChild className="h-12 rounded-full border-0 bg-[#ff8c00] px-6 text-sm font-semibold text-white hover:bg-[#e67e00]">
                <Link href="/listings">
                  Browse listings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="w-full max-w-md flex-1 lg:ml-auto lg:max-w-lg">
            <DirectoryHeroSearch />
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-neutral-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff8c00]">Featured</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">End-to-end listing solutions</h2>
            <p className="mt-2 max-w-2xl text-neutral-600">Curated entries with imagery, location context, and clear next steps—styled for quick scanning.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-500" aria-hidden>
              <ChevronLeft className="h-5 w-5" />
            </span>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-500" aria-hidden>
              <ChevronRight className="h-5 w-5" />
            </span>
            <Link href="/listings" className="ml-2 text-sm font-semibold text-[#ff8c00] hover:underline">
              View all
            </Link>
          </div>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {slots.map((post, index) =>
            post ? (
              <TaskPostCard key={post.id} post={post} href={getTaskHref('listing', post.slug)} taskKey="listing" />
            ) : (
              <div
                key={`placeholder-${index}`}
                className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-8 text-center text-neutral-500"
              >
                <p className="text-sm font-medium">More listings arriving soon</p>
                <Link href="/dashboard/listings/new" className="mt-4 text-sm font-semibold text-[#ff8c00] hover:underline">
                  Add yours
                </Link>
              </div>
            ),
          )}
        </div>
      </section>

      {/* Why choose us */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff8c00]">Why choose us</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">Smart listings: clarity from search to shortlist</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Operational excellence',
                body: 'Structured data and consistent cards so teams and visitors see the same story.',
                icon: Package,
                highlight: true,
              },
              {
                title: 'Faster decisions',
                body: 'Location, category, and budget cues appear up front on every listing card.',
                icon: Clock,
                highlight: false,
              },
              {
                title: 'Trust-forward layout',
                body: 'Verification and contact paths are easy to find without extra clutter.',
                icon: Shield,
                highlight: false,
              },
              {
                title: 'Growth-ready',
                body: 'Scale from a handful of entries to a full directory without redesigning the core.',
                icon: LineChart,
                highlight: false,
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-2xl p-6 ${item.highlight ? 'bg-[#ff8c00] text-white shadow-lg' : 'border border-neutral-200 bg-white text-neutral-800'}`}
              >
                <item.icon className={`h-8 w-8 ${item.highlight ? 'text-white' : 'text-[#ff8c00]'}`} />
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${item.highlight ? 'text-white/90' : 'text-neutral-600'}`}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto mt-12 max-w-7xl overflow-hidden rounded-2xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[21/9] min-h-[200px] w-full overflow-hidden rounded-2xl">
            <ContentImage src={WAREHOUSE_BG} alt="Warehouse operations" fill className="object-cover" sizes="(max-width:1024px) 100vw, 1200px" intrinsicWidth={2400} intrinsicHeight={1000} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* Two-column insight */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <ContentImage src={HERO_BG} alt="Logistics fleet" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" intrinsicWidth={1200} intrinsicHeight={900} />
            </div>
            <h3 className="mt-6 text-2xl font-bold">Built for operators and seekers</h3>
            <p className="mt-3 text-neutral-600">
              Operators get a calm publishing rhythm; seekers get predictable filters and imagery that mirror how they already evaluate vendors in the real world.
            </p>
          </div>
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <ContentImage src={WAREHOUSE_BG} alt="Distribution center" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" intrinsicWidth={1200} intrinsicHeight={900} />
            </div>
            <h3 className="mt-6 text-2xl font-bold">One lane: listings only</h3>
            <p className="mt-3 text-neutral-600">
              We removed the noise of unrelated formats so every pixel reinforces directory behavior—search, compare, and contact without detours.
            </p>
            <Button asChild className="mt-6 rounded-full bg-[#ff8c00] px-6 font-semibold text-white hover:bg-[#e67e00]">
              <Link href="/about">Learn more</Link>
            </Button>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* More listings grid — listings only */}
      {moreListings.length > 0 ? (
        <section className="border-t border-neutral-200 bg-neutral-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">More places to explore</h2>
            <p className="mt-2 text-neutral-600">Fresh listings across categories, all on the same card system.</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {moreListings.map((post) => {
                const meta = getPostMeta(post)
                return (
                  <Link key={post.id} href={getTaskHref('listing', post.slug)} className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="relative h-44 overflow-hidden">
                      <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 25vw" />
                    </div>
                    <div className="p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff8c00]">{meta.category || 'Listing'}</p>
                      <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{post.summary || meta.location || 'Explore this listing.'}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      <TestimonialsSection />

      {/* Final CTA */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <ContentImage src={CTA_BG} alt="Shipping containers at port" fill className="object-cover" sizes="100vw" intrinsicWidth={2400} intrinsicHeight={1200} />
        </div>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto max-w-3xl px-4 text-center text-white sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to list your business the modern way?</h2>
          <p className="mt-4 text-white/85">Join {SITE_CONFIG.name} and put structured listings in front of people who are ready to act.</p>
          <Button asChild className="mt-8 h-12 rounded-full bg-white px-8 text-sm font-semibold text-neutral-900 hover:bg-neutral-100">
            <Link href="/contact">Request a walkthrough</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
