import React from 'react'

import {
  FileText,
  Newspaper,
  Eye,
  PenLine,
  FolderOpen,
  Clock,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import ADStatCard, { Stat } from './ADStatCard';

type Props = {}

const stats: Stat[] = [
  {
    title: "Total Blogs",
    value: "128",
    description: "12 added this month",
    icon: FileText,
  },
  {
    title: "Published Blogs",
    value: "96",
    description: "75% of total blogs",
    icon: FileText,
  },
  {
    title: "Draft Blogs",
    value: "32",
    description: "Waiting to be published",
    icon: PenLine,
  },
  {
    title: "Total News",
    value: "84",
    description: "8 added this month",
    icon: Newspaper,
  },
  {
    title: "Published News",
    value: "71",
    description: "84% of total news",
    icon: Newspaper,
  },
  {
    title: "Total Views",
    value: "24.8K",
    description: "18.4% this month",
    icon: Eye,
  },
];

const ADStatCollection = (props: Props) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, idx) => {

        return (
          <ADStatCard key={idx} stat={stat} />
        );
      })}
    </div>
  );
}

export default ADStatCollection