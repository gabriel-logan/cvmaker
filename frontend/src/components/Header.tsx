import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiFileText, FiMenu, FiSend, FiSettings, FiX } from "react-icons/fi";
import { Link } from "react-router";

import logo from "/vite.svg"; // nosonar

export function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { to: "/send-static", label: t("SendStatic"), icon: <FiSend /> },
    { to: "/create", label: t("CreateCV"), icon: <FiFileText /> },
    { to: "/settings", label: t("Settings"), icon: <FiSettings /> },
  ];

  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-6 w-6" />
          <span className="text-xl font-semibold text-zinc-200">CV Maker</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-2 text-zinc-300 transition hover:text-indigo-400"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="text-zinc-200 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-zinc-800 bg-zinc-950 md:hidden">
          <nav className="flex flex-col px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-zinc-300 transition hover:bg-zinc-900 hover:text-indigo-400"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
