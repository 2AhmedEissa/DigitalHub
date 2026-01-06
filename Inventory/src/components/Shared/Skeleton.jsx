export const Skeleton = () => (
  <div className="grid gap-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-white animate-pulse"
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gray-100"></div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-100 rounded"></div>
            <div className="h-3 w-48 bg-gray-50 rounded"></div>
          </div>
        </div>
        <div className="h-5 w-5 bg-gray-50 rounded"></div>
      </div>
    ))}
  </div>
);
