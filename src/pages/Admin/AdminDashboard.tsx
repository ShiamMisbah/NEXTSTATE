import AdminDashboardHeader from "../../components/layout/AdminDashboard/AdminDashboardHeader";
import ADStatCollection from "../../components/layout/AdminDashboard/ADStat/ADStatCollection";
import RecentBlogCollection from "../../components/layout/AdminDashboard/ContentManagement/RecentContentCollection";
import ADQuickActions from "../../components/layout/AdminDashboard/ADQuickActions";
import { RecentContent } from "../../components/layout/AdminDashboard/ContentManagement/RecentContentCard";
import GetToken from "../GetToken";

const AdminDashboard = () => {

  const recentBlogs: RecentContent []= [
    {
      title: "The Future of AI in Modern Business",
      category: "Technology",
      status: "Published",
      date: "Sep 3, 2026",
    },
    {
      title: "How Digital Transformation Drives Growth",
      category: "Business",
      status: "Published",
      date: "Sep 1, 2026",
    },
    {
      title: "Building Scalable Software Solutions",
      category: "Technology",
      status: "Draft",
      date: "Aug 29, 2026",
    },
    {
      title: "Why Businesses Need Better Data Strategy",
      category: "Strategy",
      status: "Published",
      date: "Aug 26, 2026",
    },
  ];

  const recentNews: RecentContent[] = [
    {
      title: "SoftCo Announces New Technology Partnership",
      category: "Company News",
      status: "Published",
      date: "Sep 2, 2026",
    },
    {
      title: "SoftCo Expands Its Digital Solutions Team",
      category: "Company News",
      status: "Published",
      date: "Aug 30, 2026",
    },
    {
      title: "New AI Services Coming Soon",
      category: "Announcements",
      status: "Draft",
      date: "Aug 27, 2026",
    },
  ];

  return (
    <div className="bg-ivory text-charcoal min-h-screen pt-32 pb-24 overflow-hidden selection:bg-emerald/10 selection:text-emerald relative">
      {/* <CustomCursor theme="light" /> */}

      <div className="container px-6 md:px-12 mx-auto max-w-6xl space-y-8 relative z-10">
        {/* Decorative Grid Accents */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#15241d08_1px,transparent_1px),linear-gradient(to_bottom,#15241d08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 pointer-events-none" />

        {/* Header */}
        <AdminDashboardHeader />

        {/* Stats */}
        <ADStatCollection />

        {/* Content management */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Blogs */}
          <RecentBlogCollection
            cardTitle="Recent Blogs"
            cardSubtitle="Latest Blog Activity"
            contentType="blog"
            targetLink="blog"
            key="recent-blogs"
            recentContent={recentBlogs}
          />

          {/* Recent News */}
          <RecentBlogCollection
            cardTitle="Recent News"
            cardSubtitle="Latest News Activity"
            contentType="news"
            targetLink="news"
            key="recent-news"
            recentContent={recentNews}
          />
        </div>

        {/* Quick Actions */}
        <ADQuickActions />
      </div>
    </div>
  );
};

export default AdminDashboard;
