import DesktopBlogListTable from '@/src/components/layout/AdminDashboard/blog/AdminBlogList/DesktopBlogListTable';
import MobileBlogCard from '@/src/components/layout/AdminDashboard/shared/MobileContentCard';
import ContentListHeader from '@/src/components/layout/AdminDashboard/shared/ContentListHeader';
import ContentListStat from '@/src/components/layout/AdminDashboard/shared/ContentListStat';
import Empty from '@/src/components/ui/Empty';
import Loading from '@/src/components/ui/Loading';
import Pagination from '@/src/components/ui/Pagination';
import { useNews } from '@/src/hooks/useNews';
import { News, NewsStats } from '@/src/lib/NewsTypes';
import React, { useEffect, useState } from 'react'
import MobileContentCard from '@/src/components/layout/AdminDashboard/shared/MobileContentCard';
import NewsListFilter from '@/src/components/layout/AdminDashboard/news/AdminNewsList/NewsListFilter';
import DesktopNewsListTable from '@/src/components/layout/AdminDashboard/news/AdminNewsList/DesktopNewsListTable';

type Props = {}

const dummyContentStat : NewsStats = {
  totalNews: 0,
  totalPublished: 0,
  totalDrafts: 0,
  totalViews: 0,
};

const AdminNews = (props: Props) => {

  const  {news, pagination, loading, error, nextPage, previousPage} = useNews()

    const [readableNews, setReadableNews] = useState<News[]>([]);
  
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");


    useEffect(() => {
      setReadableNews(news);
    }, [news]);

    const filteredNews = readableNews.filter((news) => {
      const matchesSearch =
        news.title.toLowerCase().includes(search.toLowerCase()) ||
        news.summary.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" ||
        (status === "Published" && news.published) ||
        (status === "Draft" && !news.published);

      return matchesSearch && matchesStatus;
    });

  return (
    <div className="bg-ivory text-charcoal min-h-screen pt-32 pb-24 overflow-hidden selection:bg-emerald/10 selection:text-emerald relative">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        {/* Decorative Grid Accents */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#15241d08_1px,transparent_1px),linear-gradient(to_bottom,#15241d08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 pointer-events-none" />

        {/* Header */}
        <ContentListHeader
          heading="News"
          subheading="Manage your news articles."
          actionButton="Create News"
          actionButtonTarget="news"
        />

        {/* Stats */}
        <ContentListStat contentStat={dummyContentStat} type="news" />

        {/* Filters */}
        <NewsListFilter
          search={search}
          status={status}
          setSearch={setSearch}
          setStatus={setStatus}
        />

        {/* Blog List */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <DesktopNewsListTable
              loading={loading}
              filteredNews={filteredNews}
              setNews={setReadableNews}
            />

            {pagination && (
              <Pagination
                nextPage={nextPage}
                pagination={pagination}
                previousPage={previousPage}
              />
            )}
          </div>

          {/* Mobile Card */}
          <div className="md:hidden">
            {loading ? (
              <Loading content="Loading Blogs ..." />
            ) : filteredNews.length === 0 ? (
              <Empty content="No blogs found" />
            ) : (
              <MobileContentCard
                filteredContent={filteredNews}
                setContent={setReadableNews}
                type='news'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNews