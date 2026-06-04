import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import AIGeneratePage from "./pages/AIGenerate";
import CreateCVPage from "./pages/CreateCV";
import EditCVPage from "./pages/EditCV";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";
import PreviewPage from "./pages/Preview";
import SendStaticPage from "./pages/SendStatic";
import SettingsPage from "./pages/Settings";

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;

    const nonScriptElement = document.getElementById("nonscript");

    if (nonScriptElement) {
      nonScriptElement.textContent = t("YouNeedToEnableJavascriptToRunThisApp");
    }
  }, [i18n.language, t]);

  return (
    <BrowserRouter>
      <ToastContainer autoClose={3500} />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ai-generate" element={<AIGeneratePage />} />
        <Route path="/create" element={<CreateCVPage />} />
        <Route path="/edit/:id" element={<EditCVPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/send-static" element={<SendStaticPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
