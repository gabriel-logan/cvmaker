import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import CreateCVPage from "./pages/CreateCV";
import EditCVPage from "./pages/EditCV";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3500} />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateCVPage />} />
        <Route path="/edit/:id" element={<EditCVPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
