export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-56 bg-gray-200" />

      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />

        <div className="flex items-center justify-between pt-3">
          <div className="h-6 bg-gray-200 rounded w-20" />
          <div className="h-9 bg-gray-200 rounded-full w-24" />
        </div>
      </div>
    </div>
  );
}
