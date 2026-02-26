export default function NewsLoading() {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-200 rounded-lg w-56 mx-auto mb-4" />
          <div className="h-5 bg-gray-100 rounded w-96 mx-auto max-w-full" />
        </div>
        <div className="flex gap-3 justify-center mb-10">
          <div className="h-9 w-20 bg-gray-200 rounded-full" />
          <div className="h-9 w-28 bg-gray-200 rounded-full" />
          <div className="h-9 w-24 bg-gray-200 rounded-full" />
          <div className="h-9 w-32 bg-gray-200 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
              <div className="h-44 bg-gray-100" />
              <div className="p-5 space-y-3">
                <div className="h-3 bg-gray-100 rounded w-20" />
                <div className="h-5 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
