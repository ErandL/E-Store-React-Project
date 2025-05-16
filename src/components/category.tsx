import "../index.css"
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useEffect, useState } from "react";

interface Category {
  name: string;
  image: string;
}

export default function BrowseByCategory() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { products } = useProducts();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      const categoryMap: Record<string, string> = {};

      // Group by category and take the first image as representative
      products.forEach((product) => {
        const category = product.category;
        if (category && !categoryMap[category]) {
          categoryMap[category] = product.image; // Use first image found
        }
      });

      const categoryData: Category[] = Object.entries(categoryMap).map(
        ([name, image]) => ({
          name,
          image: image || 'https://via.placeholder.com/100',
        })
      );

      setCategories(categoryData);
      setLoading(false);
    }
  }, [products]);

  return (
    <div className="category-container d-flex flex-column gap-4">
      <div className="d-flex justify-content-between">
        <h3>Browse By Category</h3>
        <div className="d-flex gap-3">
          <i className="fa-solid fa-chevron-left fs-3" onClick={scrollLeft} style={{ cursor: 'pointer' }}></i>
          <i className="fa-solid fa-chevron-right fs-3" onClick={scrollRight} style={{ cursor: 'pointer' }}></i>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center">
          <p>Loading categories...</p>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="d-flex justify-content-between gap-4 overflow-auto"
          style={{
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory'
          }}
        >
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
              draggable={"false"}
            >
              <div
                className="cards p-2 rounded-4 d-flex flex-column justify-content-center align-items-center"
                style={{ cursor: 'pointer', scrollSnapAlign: 'start' }}
              >
                <img src={category.image} alt={category.name} draggable={"false"} style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                <span>{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
