import { SetStateAction } from 'react';
import React, { Dispatch } from 'react'
import { Blog } from '@/src/lib/BlogTypes';
import ActionButtonSet from '../blog/AdminBlogList/ActionButtonSet';
import { formatDate } from '@/src/pages/Admin/Blogs/AdminBlogs';
import { News } from '@/src/lib/NewsTypes';
import MobileContentThumbnail from './MobileContentThumbnail';
import NewsActionButtonSet from '../news/AdminNewsList/NewsActionButtonSet';

type Props =
  | {
      filteredContent: Blog[];
      setContent: Dispatch<SetStateAction<Blog[]>>;
      type: "blog";
    }
  | {
      filteredContent: News[];
      setContent: Dispatch<SetStateAction<News[]>>;
      type: "news";
    };

const MobileContentCard = ({ filteredContent, setContent, type }: Props) => {
  return (
    <div className="divide-y divide-slate-100">
      {type === "blog"
        ? filteredContent.map((content) => (
            <div key={content._id} className="p-4">
              <MobileContentThumbnail type={type} content={content} />

              {/* Meta */}
              <div className="mt-3 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  {content.author} · {formatDate(content.createdAt)}
                </div>

                {/* Actions */}
                <ActionButtonSet blog={content} setBlogs={setContent} />
              </div>
            </div>
          ))
        : filteredContent.map((content) => (
            <div key={content._id} className="p-4">
              <MobileContentThumbnail type={type} content={content} />

              {/* Meta */}
              <div className="mt-3 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  {content.author} · {formatDate(content.createdAt)}
                </div>

                {/* Actions */}
                <NewsActionButtonSet news={content} setNews={setContent} />
              </div>
            </div>
          ))}
    </div>
  );
};

export default MobileContentCard;