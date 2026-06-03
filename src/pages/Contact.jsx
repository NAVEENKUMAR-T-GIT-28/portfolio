import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import * as Icons from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import contact from "@/data/contact.json";
import socialLinks from "@/data/socialLinks.json";

const infoItems = [
  { label: "Email", value: contact.email, icon: Mail },
  { label: "Phone", value: contact.phone, icon: Phone },
  { label: "Location", value: contact.location, icon: MapPin },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  function onSubmit(e) {
    e.preventDefault();

    const name = nameRef.current?.value ?? "";
    const senderEmail = emailRef.current?.value ?? "";
    const subject = subjectRef.current?.value ?? "";
    const message = messageRef.current?.value ?? "";

    const mailtoSubject = encodeURIComponent(subject || `Message from ${name}`);
    const mailtoBody = encodeURIComponent(
      `Hi Naveenkumar,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${senderEmail}`
    );

    const mailtoUrl = `mailto:${contact.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    const anchor = document.createElement("a");
    anchor.href = mailtoUrl;
    anchor.click();

    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <PageShell>
      <SectionHeading
        title={contact.heading.split(" ")[0]}
        highlight={contact.heading.split(" ").slice(1).join(" ")}
        subtitle={contact.subheading}
      />

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field ref={nameRef} label="Name" placeholder="Your name" />
            <Field ref={emailRef} label="Email" type="email" placeholder="your@email.com" />
          </div>
          <Field ref={subjectRef} label="Subject" placeholder="What's this about?" />
          <div>
            <label className="text-sm font-semibold mb-2 block">Message *</label>
            <textarea
              ref={messageRef}
              required
              rows={6}
              placeholder="Tell me more about your project..."
              className="w-full bg-input/40 border border-border rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all resize-none"
            />
          </div>
          <AnimatedButton type="submit" variant="primary" icon={<Send size={16} />} className="w-full">
            {sent ? "Opening Mail App..." : "Send Message"}
          </AnimatedButton>
        </motion.form>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-7"
          >
            <h3 className="text-xl font-bold mb-5">Contact Information</h3>
            <div className="space-y-5">
              {infoItems.map((it) => (
                <div key={it.label} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl grid place-items-center bg-linear-to-br from-primary to-blue-500 text-primary-foreground shrink-0">
                    <it.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{it.label}</p>
                    <p className="text-sm font-medium">{it.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-3xl p-7"
          >
            <h3 className="text-xl font-bold mb-5">Connect With Me</h3>
            <div className="space-y-2">
              {socialLinks.map((s) => {
                const Icon =
                  Icons[s.icon] ?? Icons.Link;
                return (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/40 border border-border hover:border-primary/60 hover:text-primary transition-all"
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{s.name}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

const Field = React.forwardRef(({ label, type = "text", placeholder }, ref) => {
  return (
    <div>
      <label className="text-sm font-semibold mb-2 block">{label} *</label>
      <input
        ref={ref}
        required
        type={type}
        placeholder={placeholder}
        className="w-full bg-input/40 border border-border rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
      />
    </div>
  );
});
Field.displayName = "Field";
