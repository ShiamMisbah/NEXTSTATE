import { Plus } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
  heading: string;
  subheading: string;
  actionButton: string;
  actionButtonTarget: string;
}

const ContentListHeader = ({actionButton, actionButtonTarget, heading, subheading}: Props) => {
    const navigate = useNavigate();
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{heading}</h1>

        <p className="mt-1 text-sm text-slate-500">
          {subheading}
        </p>
      </div>

      <button
        type="button"
        onClick={() => navigate(`/admin/${actionButtonTarget}/create`)}
        className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        <Plus size={18} />
        {actionButton}
      </button>
    </div>
  );
}

export default ContentListHeader