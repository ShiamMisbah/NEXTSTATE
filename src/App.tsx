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
import AdminRoute from "./pages/Admin/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminBlogs from "./pages/Admin/Blogs/AdminBlogs";
import CreateBlog from "./pages/Admin/Blogs/CreateBlog";
import EditBlog from "./pages/Admin/Blogs/EditBlog";
import AdminNews from "./pages/Admin/News/AdminNews";
import CreateNews from "./pages/Admin/News/CreateNews";
import EditNews from "./pages/Admin/News/EditNews";
import Categories from "./pages/Admin/Categories";

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
            {/* <Route path="/signup" element={<Signup />} /> */}

            <Route path="/" element={<Home />} />
            <Route path="/technology" element={<TechnologySolutions />} />
            <Route path="/advisory" element={<Advisory />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsPage />} />

            {/* Protected routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />

              <Route path="/admin/blog" element={<AdminBlogs />} />
              <Route path="/admin/blog/create" element={<CreateBlog />} />
              <Route path="/admin/blog/:blogId/edit" element={<CreateBlog />} />

              <Route path="/admin/news" element={<AdminNews />} />
              <Route path="/admin/news/create" element={<CreateNews />} />
              <Route path="/admin/news/:newsId/edit" element={<EditNews />} />

              <Route path="/admin/categories" element={<Categories />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

