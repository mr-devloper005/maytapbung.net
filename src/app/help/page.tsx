import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'

const topics = [
  {
    title: 'Launch a listing',
    description:
      'Pick a category, add photos and hours, then publish so nearby customers can find you in search and on the map.',
  },
  {
    title: 'Trust & verification',
    description:
      'Learn how badges, reviews, and reporting work so buyers and sellers can transact with more confidence.',
  },
  {
    title: 'Bookmarks & collections',
    description:
      'Save places you love, group them into shareable lists, and revisit them from your workspace anytime.',
  },
  {
    title: 'Billing & promotions',
    description:
      'Understand boosts, featured slots, and renewal windows so your ads stay visible without surprises.',
  },
]

export default function HelpPage() {
  return (
    <PageShell
      title="Help Center"
      description="Guides for listings, ads, collections, and account safety—written for teams who ship fast."
      actions={
        <Button asChild className="rounded-full bg-[#ff8c00] px-5 text-white hover:bg-[#e67e00]">
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6 sm:grid-cols-2">
          {topics.map((topic) => (
            <Card key={topic.title} className="border-neutral-200 bg-white shadow-sm transition-transform hover:-translate-y-1">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-neutral-900">{topic.title}</h2>
                <p className="mt-2 text-sm text-neutral-600">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-neutral-200 bg-white shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900">FAQ</h3>
            <Accordion type="single" collapsible className="mt-4">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
