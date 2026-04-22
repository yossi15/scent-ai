'use client';

import { motion } from 'framer-motion';

export function SkeletonLine({ className = '', width = 'w-full' }: { className?: string; width?: string }) {
  return <div className={`skeleton h-3 ${width} ${className}`} />;
}

export function SkeletonRecCard({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white/80 dark:bg-bg-card rounded-2xl border border-black/[0.06] dark:border-white/[0.06] p-4 shadow-sm"
    >
      <div className="flex gap-4">
        <div className="skeleton w-16 h-20 rounded-xl flex-shrink-0" />
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="space-y-1.5 flex-1">
              <div className="skeleton h-4 w-32 rounded" />
              <div className="skeleton h-3 w-44 rounded" />
            </div>
            <div className="skeleton h-5 w-16 rounded-full" />
          </div>
          <div className="skeleton h-3 w-full rounded mt-3" />
          <div className="skeleton h-3 w-4/5 rounded" />
          <div className="skeleton h-7 w-28 rounded-lg mt-3" />
        </div>
      </div>
    </motion.div>
  );
}
