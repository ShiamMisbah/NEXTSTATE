import React from 'react'
import { Link } from 'react-router-dom';
import RecentContentCard, { RecentContent } from './RecentContentCard';



type Props = {
  cardTitle: string;
  cardSubtitle: string;
  targetLink: "blog" | "news";
  recentContent: RecentContent[];
  contentType: "blog" | "news";
}

const RecentBlogCollection = ({cardTitle, cardSubtitle, targetLink, recentContent}: Props) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <div>
          <h2 className="font-semibold text-gray-900">{cardTitle}</h2>
          <p className="mt-1 text-xs text-gray-500">
           {cardSubtitle}
          </p>
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
  );
}

export default RecentBlogCollection