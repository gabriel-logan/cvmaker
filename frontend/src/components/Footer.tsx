export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 py-4 text-sm text-zinc-500">
        © {new Date().getFullYear()} CV Maker. All rights reserved.
      </div>
    </footer>
  );
}
