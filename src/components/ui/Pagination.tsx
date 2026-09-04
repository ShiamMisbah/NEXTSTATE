import { BlogPagination } from '@/src/lib/BlogTypes';
import React from 'react'

type Props = {
    pagination: BlogPagination
    previousPage: () => void
    nextPage: () => void
}

const Pagination = ({pagination, previousPage, nextPage}: Props) => {
  return (
    <div className="mt-6 rounded-xl bg-card p-4 shadow-sm">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Page Info */}
        <p className="text-sm text-muted-foreground">
          Page{" "}
          <span className="font-medium text-foreground">
            {pagination.currentPage}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">
            {pagination.totalPages}
          </span>
        </p>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          <button
            disabled={!pagination.hasPreviousPage}
            onClick={previousPage}
            className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground">
            {pagination.currentPage}
          </div>

          <button
            disabled={!pagination.hasNextPage}
            onClick={nextPage}
            className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination