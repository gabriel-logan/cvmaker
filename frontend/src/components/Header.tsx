import { Link } from "react-router";

const navLinks = [
  { to: "/send-static", label: "Send Static" },
  { to: "/create", label: "Create CV" },
];

export function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-lg font-semibold text-zinc-100 transition hover:text-indigo-400"
        >
          CV Maker
        </Link>

        <nav className="flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-zinc-300 transition hover:text-indigo-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
