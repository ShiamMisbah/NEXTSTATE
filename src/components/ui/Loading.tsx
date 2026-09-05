import { Loader2 } from 'lucide-react';
import React from 'react'

type Props = {
    content?: string
}

const Loading = ({content = "Loading ..."}: Props) => {
  return (
    <div className="py-20 text-center">
      <Loader2 size={24} className="mx-auto animate-spin text-slate-400" />

      <p className="mt-3 text-sm text-slate-500">{content}</p>
    </div>
  );
}

export default Loading