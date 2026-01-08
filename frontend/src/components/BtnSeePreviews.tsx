import { useTranslation } from "react-i18next";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router";

export default function BtnSeePreviews() {
  const { t } = useTranslation();

  return (
    <Link
      to="/preview"
      className="inline-flex items-center gap-2 rounded-md bg-yellow-500 px-5 py-2 text-sm font-medium text-yellow-900 transition hover:bg-yellow-400"
    >
      <FiEye />
      {t("SeePreviews")}
    </Link>
  );
}
