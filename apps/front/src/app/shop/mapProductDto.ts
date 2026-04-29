import type { ProductDto } from '@shared/products-contracts';
import type { ShopCategory, ShopDepartment, ShopProduct } from './types';

export function mapProductDtoToShopProduct(dto: ProductDto): ShopProduct {
  return {
    id: dto.productId,
    name: dto.productName,
    price: Number(dto.price),
    category: dto.category.categoryName as ShopCategory,
    sizes: dto.sizes ?? [],
    color: dto.color,
    brand: dto.brand,
    imageUrl: dto.imageUrl,
    createdAt: dto.createdAt,
    department: dto.department?.departmentName as ShopDepartment | null,
  };
}
