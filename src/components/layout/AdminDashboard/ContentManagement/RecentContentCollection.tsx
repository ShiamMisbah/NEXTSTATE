import React from "react";
import { Link } from "react-router-dom";
import RecentContentCard, { RecentContent } from "./RecentContentCard";
import { useBlogs } from "@/src/hooks/useBlogs";
import { Blog } from "@/src/lib/BlogTypes";
import Pagination from "@/src/components/ui/Pagination";
import { FileText, Loader2 } from "lucide-react";
import { useNews } from "@/src/hooks/useNews";
import { useRecentContent } from "@/src/hooks/useRecentContent";
import { News } from "@/src/lib/NewsTypes";
import Loading from "@/src/components/ui/Loading";
import Empty from "@/src/components/ui/Empty";
import { mapBlogToRecentContent, mapNewsToRecentContent } from "@/src/lib/ShapeContent";

type Props = {
  cardTitle: string;
  cardSubtitle: string;
  targetLink: "blog" | "news";
  contentType: "blog" | "news";
};


const RecentBlogCollection = ({
  cardTitle,
  cardSubtitle,
  targetLink,
  contentType,
}: Props) => {
  const { content, pagination, loading, error, nextPage, previousPage } =
    useRecentContent({ contentType, limit: 2 });
    
  const recentContent: RecentContent[] = contentType === "blog"
    ? (content as Blog[]).map(mapBlogToRecentContent)
    : (content as News[]).map(mapNewsToRecentContent);



  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      {loading ? (
        <Loading />
      ) : recentContent.length === 0 ? (
        <Empty />
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="font-semibold text-gray-900">{cardTitle}</h2>
                <p className="mt-1 text-xs text-gray-500">{cardSubtitle}</p>
              </div>

              <Link
                to={`/admin/${targetLink}`}
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                View all
              </Link>
            </div>

            <div className="divide-y divide-gray-100">
              {recentContent.map((content) => (
                <RecentContentCard content={content} key={content.title} />
              ))}
            </div>
          </div>
          {pagination && (
            <Pagination
              nextPage={nextPage}
              previousPage={previousPage}
              pagination={pagination}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default RecentBlogCollection;
