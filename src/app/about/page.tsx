import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "Active listings", value: "8.6k+" },
  { label: "Cities with coverage", value: "120+" },
  { label: "Monthly searches guided", value: "2M+" },
];

const values = [
  {
    title: "Listings-first mindset",
    description: "Every layout decision reinforces directory behavior—search, compare, shortlist, and contact without detours.",
  },
  {
    title: "Trust you can see",
    description: "Verification badges, maps, and structured metadata appear consistently so seekers know what is real before they reach out.",
  },
  {
    title: "Operators in control",
    description: "Teams get a calm workspace to refresh imagery, copy, and categories while the public site stays on-brand with the orange accent system.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a modern listings platform built for operators who want clarity, speed, and a premium first impression—without maintaining a dozen disconnected tools.`}
      actions={
        <>
          <Button variant="outline" className="rounded-full border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50" asChild>
            <Link href="/team">Meet the team</Link>
          </Button>
          <Button className="rounded-full bg-[#ff8c00] font-semibold text-white shadow-sm hover:bg-[#e67e00]" asChild>
            <Link href="/contact">Contact us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden border-neutral-200 bg-white shadow-sm">
          <CardContent className="space-y-5 p-8">
            <Badge className="border-0 bg-[#ff8c00]/12 text-xs font-semibold uppercase tracking-wide text-[#cc7000]">Our story</Badge>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">Built for the moment someone is ready to choose a vendor.</h2>
            <p className="text-sm leading-relaxed text-neutral-600 sm:text-base">
              We stripped away noisy formats so the homepage, search, and detail pages all speak the same visual language—white space, neutral type, and confident orange calls-to-action that mirror how logistics and marketplace brands signal urgency without shouting.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-center sm:text-left">
                  <div className="text-2xl font-bold text-neutral-900">{item.value}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-neutral-500">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-neutral-200 bg-neutral-50 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff8c00]">Leadership</p>
        <h2 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">People behind the platform</h2>
        <p className="mt-2 max-w-2xl text-neutral-600">Product, community, and partnerships—focused on keeping listings accurate and delightful.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {mockTeamMembers.map((member) => (
            <Card key={member.id} className="border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-neutral-200">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{member.name}</p>
                    <p className="text-xs text-neutral-500">{member.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{member.bio}</p>
                <p className="mt-3 text-xs font-medium text-[#ff8c00]">{member.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
