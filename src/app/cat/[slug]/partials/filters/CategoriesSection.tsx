import Link from "next/link";
import React from "react";

interface CategoryData {
  id: number;
  name: string;
  category_slug: string;
  parent_id: number | null;
}

const CategoriesSection = ({
  categoryData,
  allCategories,
  setFilters,
}: {
  categoryData: CategoryData | null;
  allCategories: CategoryData[];
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}) => {
  if (!categoryData) return null;

  // Find sub-categories by parent_id
  const subCategories = allCategories.filter(
    (cat) => cat.parent_id === categoryData.id
  );

  return (
    <div className="flex flex-col space-y-0.5 text-black/60">
      {subCategories.length > 0 &&
        subCategories.map((subcat) => (
          <Link
            key={subcat.id}
            href={`/cat/${subcat.category_slug}`}
            className="flex items-center justify-between py-2"
          >
            {subcat.name}
            <i className="far fa-chevron-right text-sm" />
          </Link>
        ))}
    </div>
  );
};

export default CategoriesSection;
