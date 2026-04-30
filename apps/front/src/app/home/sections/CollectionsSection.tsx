import { Link } from 'react-router-dom';
import { useGetDepartmentsQuery } from '../../../redux/productsApi/productsApi';
import { SectionHeading } from '../components/SectionHeading';

export function CollectionsSection() {
  const { data: departments, isLoading, isError } = useGetDepartmentsQuery();

  return (
    <section className="border-b border-gray-300 py-16 md:py-24" id="collections" aria-labelledby="collections-title">
      <div className="mx-auto w-full max-w-[1440px] px-8">
        <SectionHeading
          title="Shop by Category"
          description="Choose a department and jump straight to filtered products."
        />
        {isLoading ? (
          <p className="py-8 text-center text-sm text-gray-600">Loading collections...</p>
        ) : isError ? (
          <p className="py-8 text-center text-sm text-red-600">Failed to load collections.</p>
        ) : (
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {(departments ?? []).map((department) => (
              <Link key={department.slug} to={`/shop?department=${department.slug}`} className="group">
                <div className="mb-4 aspect-[4/5] overflow-hidden rounded-lg border border-gray-300 bg-gray-100">
                  <img
                    src={department.imageUrl}
                    alt={`${department.departmentName} collection`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-center text-lg capitalize text-gray-900">{department.departmentName}</h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
