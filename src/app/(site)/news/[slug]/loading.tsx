export default function PostLoading() {
  return (
    <>
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-4xl animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-28 mb-6" />
          <div className="h-6 bg-gray-200 rounded-full w-24 mb-4" />
          <div className="h-9 bg-gray-200 rounded w-full mb-2" />
          <div className="h-9 bg-gray-200 rounded w-3/4 mb-6" />
          <div className="h-5 bg-gray-100 rounded w-full mb-2" />
          <div className="h-5 bg-gray-100 rounded w-2/3 mb-6" />
          <div className="flex gap-4 pb-8 border-b border-gray-200">
            <div className="h-4 bg-gray-100 rounded w-24" />
            <div className="h-4 bg-gray-100 rounded w-32" />
          </div>
        </div>
      </section>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl animate-pulse space-y-4">
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-5/6" />
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-4/5" />
          <div className="h-4 bg-gray-100 rounded w-full" />
        </div>
      </div>
    </>
  );
}
