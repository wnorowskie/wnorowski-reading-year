import { NavLink } from "./NavLink";

const navLinks = [
  { href: "/", label: "Family" },
  { href: "/grace", label: "Grace" },
  { href: "/alexa", label: "Alexa" },
  { href: "/mom", label: "Mom" },
  { href: "/dad", label: "Dad" },
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-600">Wnorowski Family</p>
          <p className="font-serif text-lg text-stone-900">Reading Year 2025</p>
        </div>
        <nav aria-label="Primary" className="flex flex-wrap gap-2">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
      </div>
    </header>
  );
}
