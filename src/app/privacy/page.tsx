import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'

const sections = [
  {
    title: 'What we collect',
    body: 'Account details, workspace activity, device signals needed for fraud prevention, and any listings, ads, or media you publish.',
  },
  {
    title: 'How we use it',
    body: 'To run search and maps, personalize feeds, send transactional notices, measure reliability, and keep buyers and sellers safer.',
  },
  {
    title: 'Your controls',
    body: 'Export what you have stored, adjust marketing email preferences, and request deletion when you are ready to leave the workspace.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="A plain-language overview of how directory data moves through the product—and the knobs you can turn."
    >
      <Card className="border-neutral-200 bg-white shadow-sm">
        <CardContent className="p-6 space-y-4">
          <p className="text-xs text-neutral-500">Last updated: April 21, 2026</p>
          {sections.map((section) => (
            <div key={section.title} className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <h3 className="text-sm font-semibold text-neutral-900">{section.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{section.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  )
}
