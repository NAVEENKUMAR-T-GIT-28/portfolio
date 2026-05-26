import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import projects from "@/data/projects.json";

export default function ProjectsPage() {
  return (
    <PageShell>
      <SectionHeading
        title="Featured"
        highlight="Projects"
        subtitle="A showcase of recent work and side projects demonstrating various technical skills and creative solutions"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </PageShell>
  );
}
