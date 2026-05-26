import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { TimelineCard } from "@/components/TimelineCard";
import experience from "@/data/experience.json";

export default function ExperiencePage() {
  return (
    <PageShell>
      <SectionHeading title="Work" highlight="Experience" subtitle="A journey through the roles that shaped my craft." />
      <div className="relative">
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/60 to-primary/0" />
        <div className="space-y-16">
          {experience.map((item, i) => (
            <TimelineCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
