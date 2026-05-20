import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-primary/5',
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-card p-8 space-y-4">
      <Skeleton className="w-12 h-12 rounded-2xl" />
      <Skeleton className="w-3/4 h-6" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-5/6 h-4" />
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      <Skeleton className="w-full h-48 rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="w-20 h-5 rounded-full" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-3/4 h-4" />
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="border-b border-gray-100">
      <td className="p-4"><Skeleton className="w-32 h-4" /></td>
      <td className="p-4"><Skeleton className="w-40 h-4" /></td>
      <td className="p-4"><Skeleton className="w-20 h-6 rounded-full" /></td>
      <td className="p-4"><Skeleton className="w-24 h-4" /></td>
    </tr>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Nav Skeleton */}
      <div className="h-20 border-b border-gray-100 px-8 flex items-center justify-between">
        <Skeleton className="w-32 h-8" />
        <div className="flex gap-4">
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-16 h-4" />
        </div>
      </div>
      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-8">
        <Skeleton className="w-64 h-10 mx-auto" />
        <Skeleton className="w-96 h-5 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
}
