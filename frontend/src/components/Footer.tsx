import { useTranslation } from "react-i18next";
import { Link } from "react-router";

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
    </footer>
  );
}
