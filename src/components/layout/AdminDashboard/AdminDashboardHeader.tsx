import { Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const AdminDashboardHeader = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your blog and news content from one place.
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          to="/admin/blog/create"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          New Blog
        </Link>

        <Link
          to="/admin/news/create"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <Plus className="h-4 w-4" />
          Add News
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
