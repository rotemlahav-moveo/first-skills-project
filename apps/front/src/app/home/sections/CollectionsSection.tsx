import { Link } from 'react-router-dom';
import { ProductDepartment, type ProductDepartment as ProductDepartmentValue } from '@shared/products-contracts';
import { SectionHeading } from '../components/SectionHeading';

const departments: Array<{ name: string; slug: ProductDepartmentValue; imageUrl: string }> = [
  {
    name: 'Women',
    slug: ProductDepartment.woman,
    imageUrl:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Men',
    slug: ProductDepartment.men,
    imageUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Accessories',
    slug: ProductDepartment.accessories,
    imageUrl:
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80',
  },
];

export function CollectionsSection() {
  return (
    <section className="border-b border-gray-300 py-16 md:py-24" id="collections" aria-labelledby="collections-title">
      <div className="mx-auto w-full max-w-[1440px] px-8">
        <SectionHeading
          title="Shop by Category"
          description="Choose a department and jump straight to filtered products."
        />
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {departments.map((department) => (
            <Link key={department.slug} to={`/shop?department=${department.slug}`} className="group">
              <div className="mb-4 aspect-[4/5] overflow-hidden rounded-lg border border-gray-300 bg-gray-100">
                <img
                  src={department.imageUrl}
                  alt={`${department.name} collection`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-center text-lg text-gray-900">{department.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
