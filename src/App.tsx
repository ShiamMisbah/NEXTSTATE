/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import GlobalAnimations from "./components/layout/GlobalAnimations";
import Home from "./pages/Home";
import TechnologySolutions from "./pages/TechnologySolutions";
import Advisory from "./pages/Advisory";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import News from "./pages/News";
import BlogPage from "./pages/BlogPage";
import NewsPage from "./pages/NewsPage";
import Signup from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import AdminRoute from "./pages/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans relative bg-[#020202]">
        <GlobalAnimations />
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/technology" element={<TechnologySolutions />} />
            <Route path="/advisory" element={<Advisory />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:blogId" element={<BlogPage />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:newsId" element={<NewsPage />} />

            {/* Protected routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

