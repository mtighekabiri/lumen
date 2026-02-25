export default function Loading() {
  return (
    <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto mb-4" />
        <div className="h-5 bg-gray-100 rounded w-96 mx-auto mb-12 max-w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="h-48 bg-gray-100 rounded-2xl" />
          <div className="h-48 bg-gray-100 rounded-2xl" />
          <div className="h-48 bg-gray-100 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
