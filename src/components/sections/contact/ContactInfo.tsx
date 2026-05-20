import { Mail, Phone, MapPin } from "lucide-react";

const cards = [
  {
    title: "Email",
    value: "hello@caliper.com",
    icon: Mail,
    href: "mailto:hello@caliper.com",
  },
  {
    title: "Phone",
    value: "+91 22 4000 0000",
    icon: Phone,
    href: "tel:+912240000000",
  },
  {
    title: "Office",
    value: "Bandra Kurla Complex, Mumbai 400051, India",
    icon: MapPin,
    href: "https://maps.google.com",
  },
];

export function ContactInfo() {
  return (
    <div className="grid gap-4">
      {cards.map((c) => (
        <a
          key={c.title}
          href={c.href}
          className="bento-card flex gap-4 border bg-white p-5 no-underline transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-brutal-md)]"
        >
          <c.icon className="h-6 w-6 shrink-0 text-[var(--color-accent)]" />
          <div>
            <p className="text-mono-sm font-bold uppercase">{c.title}</p>
            <p className="mt-1 text-body-md text-[var(--color-void)]">{c.value}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
