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
  Star,
} from "lucide-react";
import ADStatCard, { Stat } from './ADStatCard';
import { ContentStats, useContentStats } from '@/src/hooks/useContentStats';
import Loading from '@/src/components/ui/Loading';

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

export const getStats = (data: ContentStats): Stat[] => {
  const blogPublishedPercentage =
    data.blogs.total > 0
      ? Math.round((data.blogs.published / data.blogs.total) * 100)
      : 0;

  const newsPublishedPercentage =
    data.news.total > 0
      ? Math.round((data.news.published / data.news.total) * 100)
      : 0;

  return [
    {
      title: "Total Blogs",
      value: data.blogs.total.toString(),
      description: "All blog posts",
      icon: FileText,
    },
    {
      title: "Published Blogs",
      value: data.blogs.published.toString(),
      description: `${blogPublishedPercentage}% of total blogs`,
      icon: FileText,
    },
    {
      title: "Draft Blogs",
      value: data.blogs.drafts.toString(),
      description: "Waiting to be published",
      icon: PenLine,
    },
    {
      title: "Featured Blogs",
      value: data.blogs.featured.toString(),
      description: "Currently featured blogs",
      icon: Star,
    },
    {
      title: "Total News",
      value: data.news.total.toString(),
      description: "All news articles",
      icon: Newspaper,
    },
    {
      title: "Published News",
      value: data.news.published.toString(),
      description: `${newsPublishedPercentage}% of total news`,
      icon: Newspaper,
    },
    {
      title: "Draft News",
      value: data.news.drafts.toString(),
      description: "Waiting to be published",
      icon: PenLine,
    },
  ];
};

const ADStatCollection = (props: Props) => {
  const { isLoading, stats: contentStats, error } = useContentStats()
  const stats = contentStats ? getStats(contentStats) : [];
  console.log(stats);
  
  if (isLoading) return (<Loading />)
  
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, idx) => {

        return (
          <ADStatCard key={idx} stat={stat} />
        );
      })}
    </div>
  );
}

export default ADStatCollection