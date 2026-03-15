import { useMenu } from '../hooks/useMenu';
import SectionHeader from '../components/SectionHeader';
import MenuCategoryCard from '../components/MenuCategoryCard';

/* ── Skeleton card shown while data is loading ── */
function SkeletonCard() {
  return (
    <div className="card-artisanal overflow-hidden flex flex-col bg-cream h-[580px] animate-pulse">
      <div className="h-48 w-full bg-charcoal/10 shrink-0" />
      <div className="p-6 flex flex-col grow gap-4">
        <div className="h-8 w-3/5 bg-charcoal/10 rounded" />
        <div className="h-px bg-charcoal/10" />
        <div className="space-y-4 grow">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between gap-4">
              <div className="h-5 bg-charcoal/10 rounded grow" />
              <div className="h-5 w-16 bg-charcoal/10 rounded shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  const { categories, loading, error } = useMenu();

  return (
    <section className="py-20 px-6 bg-sand min-h-screen">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Our Menu"
          subtitle="A diverse selection of mouth-watering dishes and refreshing beverages to satisfy every craving."
        />

        {/* Error state */}
        {error && (
          <div className="text-center py-16">
            <p className="text-lg text-charcoal/70 mb-4">
              Unable to load the menu right now.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-artisanal rounded-full px-8 py-3"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Loading skeleton grid */}
        {loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Loaded cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <MenuCategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}