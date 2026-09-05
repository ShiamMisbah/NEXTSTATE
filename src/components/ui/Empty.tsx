import { FileText } from 'lucide-react';
import React from 'react'

type Props = {
  content?: string;
};

const Empty = ({ content = "Nothing Found" }: Props) => {
  return (
    <div className="py-20 text-center">
      <FileText size={40} className="mx-auto text-slate-300" />

      <p className="mt-3 font-medium text-slate-600">{content}</p>
    </div>
  );
};

export default Empty