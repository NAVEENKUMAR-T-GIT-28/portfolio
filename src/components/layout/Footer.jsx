import personal from "@/data/personal.json";

export function Footer() {
  return (
    <footer className="relative border-t border-border mt-20 py-8 text-center text-sm text-muted-foreground">
      <p className="inline-flex items-center gap-1.5">
        © {new Date().getFullYear()} {personal.name}
      </p>
    </footer>
  );
}
