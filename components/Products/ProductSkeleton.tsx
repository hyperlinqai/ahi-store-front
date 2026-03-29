export default function ProductSkeleton({ count = 12 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col">
                    <div className="aspect-square rounded-2xl bg-gray-200" />
                    <div className="mt-3.5 flex flex-col gap-2 px-0.5">
                        <div className="h-3 w-16 bg-gray-200 rounded" />
                        <div className="h-4 w-3/4 bg-gray-200 rounded" />
                        <div className="h-3 w-20 bg-gray-200 rounded" />
                        <div className="h-4 w-24 bg-gray-200 rounded mt-1" />
                    </div>
                </div>
            ))}
        </div>
    );
}
