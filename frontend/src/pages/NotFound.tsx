import { useTranslation } from "react-i18next";
import { Link } from "react-router";

interface NotFoundPageProps {
  title?: string;
  subtitle?: string;
  description?: string;
  redirectTo?: string;
  redirectLabel?: string;
}

export default function NotFoundPage({
  title,
  subtitle,
  description,
  redirectLabel,
  redirectTo = "/",
}: NotFoundPageProps) {
  const { t } = useTranslation();

  const localTitle = title ? title : t("PageNotFound");
  const localSubtitle = subtitle ? subtitle : t("ThisPageDoesNotExist");
  const localDescription = description
    ? description
    : t("TheURLYouTriedToAccessDoesNotExist");
  const localRedirectLabel = redirectLabel ? redirectLabel : t("GoBackHome");

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-100">
      <title>404 - {localTitle} - CV Maker</title>

      <div className="mx-auto max-w-2xl space-y-8">
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
          404 - {localTitle}
        </div>

        <div className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-zinc-100">
              {localSubtitle}
            </h1>
            <p className="text-sm text-zinc-400">{localDescription}</p>
          </div>

          <div className="flex justify-end">
            <Link
              to={redirectTo}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              {localRedirectLabel}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
