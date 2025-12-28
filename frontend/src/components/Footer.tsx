import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import ReactLogo from "../assets/react.svg";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="flex flex-col border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-4xl px-6 py-4 text-xs text-zinc-500">
        © {new Date().getFullYear()} CV Maker. {t("AllRightsReserved")}
      </div>
      <div className="mx-auto max-w-4xl px-6 pb-4 text-xs text-zinc-500">
        {t("ProjectSourceCodeAvailableOnColonSpace")}
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

      <div className="mx-auto flex max-w-4xl items-center px-6 pb-4 text-xs text-zinc-500">
        <span className="mr-2">Built with </span>
        <img
          src={ReactLogo}
          alt="React Logo"
          className="h-4 w-4 animate-spin"
          id="react-logo"
        />
      </div>
    </footer>
  );
}
