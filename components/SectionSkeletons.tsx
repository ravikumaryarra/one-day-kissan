import React from "react";

export function GallerySkeleton() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-pulse">
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="h-6 w-48 bg-[#2b4c1c]/10 rounded-full mx-auto" />
        <div className="h-10 w-80 bg-[#2b4c1c]/15 rounded-2xl mx-auto" />
        <div className="h-4 w-96 bg-[#2b4c1c]/10 rounded-full mx-auto" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="polaroid-frame rounded-2xl bg-white border border-[#2b4c1c]/10">
            <div className="aspect-square rounded-xl bg-[#e8ded0]/60 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSkeleton() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-pulse">
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="h-6 w-44 bg-[#2b4c1c]/10 rounded-full mx-auto" />
        <div className="h-10 w-96 bg-[#2b4c1c]/15 rounded-2xl mx-auto" />
        <div className="h-4 w-72 bg-[#2b4c1c]/10 rounded-full mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="polaroid-frame rounded-2xl bg-white border border-[#2b4c1c]/10 p-4">
            <div className="aspect-video rounded-xl bg-[#e8ded0]/60 mb-3" />
            <div className="h-4 w-32 bg-[#2b4c1c]/10 rounded mb-2" />
            <div className="h-5 w-48 bg-[#2b4c1c]/15 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlannerSkeleton() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2b4c1c]/10 animate-pulse">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="h-6 w-52 bg-[#2b4c1c]/10 rounded-full mx-auto" />
        <div className="h-10 w-80 bg-[#2b4c1c]/15 rounded-2xl mx-auto" />
      </div>
      <div className="max-w-5xl mx-auto rounded-3xl bg-white p-8 sm:p-12 border border-[#2b4c1c]/10 min-h-[300px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <div className="h-4 w-40 bg-[#2b4c1c]/10 rounded" />
            <div className="h-8 w-72 bg-[#2b4c1c]/15 rounded" />
            <div className="h-16 w-full bg-[#2b4c1c]/5 rounded" />
          </div>
          <div className="lg:col-span-5 bg-[#faf7f0] p-6 rounded-2xl space-y-3">
            <div className="h-6 w-36 bg-[#2b4c1c]/15 rounded" />
            <div className="h-10 w-full bg-white rounded-xl" />
            <div className="h-10 w-full bg-white rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
