import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site-config";

const sections = [
  { title: "Account Usage", body: "Keep your account secure and follow community guidelines." },
  {
    title: "Content Ownership",
    body: "You own the content you publish and grant the platform a license to display it.",
  },
  { title: "Acceptable Use", body: "No spam, harassment, or illegal content." },
];

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description={`The rules and guidelines for using ${SITE_CONFIG.name}.`}
    >
      <Card className="border-neutral-200 bg-white shadow-sm">
        <CardContent className="space-y-4 p-6">
          <p className="text-xs text-muted-foreground">Last updated: March 16, 2026</p>
          {sections.map((section) => (
            <div key={section.title} className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
}
