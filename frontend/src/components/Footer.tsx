import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 flex flex-col">
      <div className="mx-auto max-w-4xl px-6 py-4 text-xs text-zinc-500">
        © {new Date().getFullYear()} CV Maker. All rights reserved.
      </div>
      <div className="mx-auto max-w-4xl px-6 pb-4 text-xs text-zinc-500">
        Project source code available on{" "}
        <Link
          to="https://github.com/gabriel-logan/cvmaker"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-zinc-300"
        >
          GitHub
        </Link>
        .
      </div>
    </footer>
  );
}
