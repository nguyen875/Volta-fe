export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface RequestCreateCategoryDto {
  name: string;
  slug: string;
}
