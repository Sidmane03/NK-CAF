import menuData from '../data/menudata';
import SectionHeader from '../components/SectionHeader';
import MenuCategoryCard from '../components/MenuCategoryCard';

export default function Menu() {
  return (
    <section className="py-20 px-6 bg-sand min-h-screen">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Our Menu"
          subtitle="A diverse selection of mouth-watering dishes and refreshing beverages to satisfy every craving."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuData.map((category) => (
            <MenuCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}