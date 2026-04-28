import Link from 'next/link'
import { Globe, Mail, MapPin, Phone, ShieldCheck, Tag, UserRound } from 'lucide-react'
import { LightboxImage } from '@/components/shared/lightbox-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const descriptionHtml = formatRichHtml(description, 'Details coming soon.')
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-[#ff8c00]">
          Back to {taskLabel}
        </Link>

        <section className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="bg-[#666d80] px-6 py-7 sm:px-10 sm:py-9">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <div className="relative h-24 w-24 overflow-hidden rounded-md border border-white/50 bg-white/10">
                  {images[0] ? (
                    <LightboxImage src={images[0]} alt={`${post.title} logo`} className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-white/85">
                      <UserRound className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">{category || taskLabel}</p>
                  <h1 className="mt-1 text-2xl font-semibold text-white sm:text-[2rem]">{post.title}</h1>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1.45fr_0.85fr]">
          <article className="overflow-hidden border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 px-6 py-5">
              <h2 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#424f73]">
                <UserRound className="h-4 w-4" /> Profile
              </h2>
            </div>
            <div className="px-6 py-7">
              <RichContent html={descriptionHtml} className="text-[1.02rem] leading-9 text-[#5f6f8e] [&_*]:text-inherit" />
              {highlights.length ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {highlights.slice(0, 4).map((item) => (
                    <div key={item} className="rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-[#4d5d7c]">
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </article>

          <aside className="overflow-hidden border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 px-6 py-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#424f73]">Intro</h2>
            </div>
            <div className="space-y-3 px-5 py-6">
              {location ? (
                <div className="flex items-start gap-3 rounded-full bg-neutral-100 px-3 py-2.5 text-sm text-[#5f6f8e]">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#6d7894]" />
                  <span>{location}</span>
                </div>
              ) : null}
              {website ? (
                <div className="flex items-start gap-3 rounded-full bg-neutral-100 px-3 py-2.5 text-sm text-[#5f6f8e]">
                  <Globe className="mt-0.5 h-4 w-4 shrink-0 text-[#6d7894]" />
                  <a href={website} target="_blank" rel="noreferrer" className="break-all hover:underline">
                    {website}
                  </a>
                </div>
              ) : null}
              {phone ? (
                <div className="flex items-start gap-3 rounded-full bg-neutral-100 px-3 py-2.5 text-sm text-[#5f6f8e]">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#6d7894]" />
                  <span>{phone}</span>
                </div>
              ) : null}
              {email ? (
                <div className="flex items-start gap-3 rounded-full bg-neutral-100 px-3 py-2.5 text-sm text-[#5f6f8e]">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#6d7894]" />
                  <a href={`mailto:${email}`} className="break-all hover:underline">
                    {email}
                  </a>
                </div>
              ) : null}
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#ff8c00] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified
                </span>
              </div>
            </div>

            {mapEmbedUrl ? (
              <div className="border-t border-neutral-200 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#424f73]">Location map</p>
                <div className="overflow-hidden rounded-md border border-neutral-200">
                  <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-56 w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
              </div>
            ) : null}
          </aside>
        </section>

        {images.length > 1 ? (
          <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {images.slice(1, 5).map((image) => (
                <div key={image} className="relative h-28 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
                  <LightboxImage src={image} alt={post.title} className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {related.length ? (
          <section className="mt-10">
            <div className="flex items-end justify-between gap-4 border-b border-neutral-200 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff8c00]">Related</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-neutral-900">More in this category</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-neutral-900">Related links</p>
          <ul className="mt-2 space-y-2 text-sm">
            {related.map((item) => (
              <li key={`link-${item.id}`}>
                <Link href={`${taskRoute}/${item.slug}`} className="font-medium text-[#ff8c00] underline-offset-4 hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href={taskRoute} className="font-medium text-[#ff8c00] underline-offset-4 hover:underline">
                Browse all {taskLabel}
              </Link>
            </li>
            {category ? (
              <li>
                <Link href={`/search?q=${encodeURIComponent(category)}`} className="font-medium text-[#ff8c00] underline-offset-4 hover:underline">
                  Search more in {category}
                </Link>
              </li>
            ) : null}
          </ul>
        </section>
      </main>
    </div>
  )
}
