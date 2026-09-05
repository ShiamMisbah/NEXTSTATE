import React from 'react'
import { motion } from "motion/react";

import { useNews } from '../hooks/useNews';
import Loading from '../components/ui/Loading';
import Empty from '../components/ui/Empty';
import NewsCard from '../components/layout/AdminDashboard/news/GlobalNewsContent/NewsCard';
import CustomCursor from '../components/layout/CustomCursor';
import { Sparkles } from 'lucide-react';
import Pagination from '../components/ui/Pagination';

type Props = {}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as any },
  },
};

const News = (props: Props) => {

  const  { news, loading, error, pagination, nextPage, previousPage } = useNews()

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Empty />
    );
  }
  return (
    <div className="bg-ivory text-charcoal min-h-screen pt-32 pb-24 overflow-hidden selection:bg-emerald/10 selection:text-emerald relative">
      <CustomCursor theme="light" />
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <main className="min-h-screen overflow-hidden text-slate-900">
          {/* Background */}
          <div className="pointer-events-none fixed inset-0 -z-0">
            {/* <div className="absolute left-[10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-300/20 blur-[120px]" /> */}

            {/* <div className="absolute right-[-5%] top-[25%] h-[500px] w-[500px] rounded-full bg-violet-300/20 blur-[120px]" /> */}

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#15241d08_1px,transparent_1px),linear-gradient(to_bottom,#15241d08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 pointer-events-none" />
          </div>
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <section className="border-b border-slate-100">
              <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                  <motion.span
                    variants={fadeUp}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 border border-emerald/20 text-emerald font-mono text-xs uppercase tracking-widest mb-6"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    NEWS & UPDATES
                  </motion.span>
                  <motion.div variants={fadeUp}>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                      Latest News
                    </h1>

                    <p className="mt-4 text-lg leading-8 text-slate-600">
                      Stay up to date with the latest news, announcements, and
                      updates.
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>
          </motion.div>

          {/* News collection */}
          <section className="mx-auto max-w-7xl">
            {news.length === 0 ? (
              <div className="py-20 text-center">
                <h2 className="text-xl font-semibold text-slate-900">
                  No news available
                </h2>

                <p className="mt-2 text-slate-500">
                  Check back later for the latest updates.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {news.map((item) => (
                  <NewsCard key={item._id} news={item} />
                ))}
              </div>
            )}
          </section>

          {pagination && (
            <Pagination
              nextPage={nextPage}
              pagination={pagination}
              previousPage={previousPage}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default News