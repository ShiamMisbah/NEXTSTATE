import { SetStateAction } from 'react';
import React, { Dispatch } from 'react'
import { Blog } from '@/src/lib/BlogTypes';
import MobileBlogThumbnail from './BlogListCard/MobileBlogThumbnail';
import ActionButtonSet from './BlogListCard/ActionButtonSet';
import { formatDate } from '@/src/pages/Admin/Blogs/AdminBlogs';

type Props = {
        filteredBlogs: Blog[]
        setBlogs: Dispatch<SetStateAction<Blog[]>>
}

const MobileBlogCard = ({filteredBlogs, setBlogs}: Props) => {
  return (
    <div className="divide-y divide-slate-100">
      {filteredBlogs.map((blog) => (
        <div key={blog._id} className="p-4">
          <MobileBlogThumbnail blog={blog} />

          {/* Meta */}
          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              {blog.author} · {formatDate(blog.createdAt)}
            </div>

            {/* Actions */}
            <ActionButtonSet blog={blog} setBlogs={setBlogs} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MobileBlogCard