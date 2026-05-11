import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import AIReadinessPage from "./pages/AIReadinessPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import TraditionalWebsitesPage from "./pages/TraditionalWebsitesPage.jsx";
import ManagedHostingServicesPage from "./pages/ManagedHostingServicesPage.jsx";
import CareersPage from "./pages/CareersPage.jsx";
import ContactUsPage from "./pages/ContactUsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import FreeAICallToAction from "./components/FreeAICallToAction.jsx";
import CustomCursor from "./components/CustomCursor.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <CustomCursor />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: "12px",
              fontFamily: "Inter, sans-serif",
            },
          }}
        />
        <FreeAICallToAction />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ai-readiness" element={<AIReadinessPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/traditional-websites" element={<TraditionalWebsitesPage />} />
          <Route path="/managed-hosting" element={<ManagedHostingServicesPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
