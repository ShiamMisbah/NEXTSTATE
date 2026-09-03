import { Clock, FileText, FolderOpen, Newspaper } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

type Props = {}

const ADQuickActions = (props: Props) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="font-semibold text-gray-900">Quick Actions</h2>
      <p className="mt-1 text-sm text-gray-500">
        Common content management tasks
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          to="/admin/blog/create"
          className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50"
        >
          <FileText className="h-5 w-5 text-gray-600" />
          <span className="text-sm font-medium">Create Blog</span>
        </Link>

        <Link
          to="/admin/news/create"
          className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50"
        >
          <Newspaper className="h-5 w-5 text-gray-600" />
          <span className="text-sm font-medium">Create News</span>
        </Link>

        <Link
          to="/admin/categories"
          className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50"
        >
          <FolderOpen className="h-5 w-5 text-gray-600" />
          <span className="text-sm font-medium">Categories</span>
        </Link>

        <Link
          to="/admin/drafts"
          className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50"
        >
          <Clock className="h-5 w-5 text-gray-600" />
          <span className="text-sm font-medium">View Drafts</span>
        </Link>
      </div>
    </div>
  );
}

export default ADQuickActions