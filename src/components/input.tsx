import '../index.css';
import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Link } from 'react-router-dom';

type inputProp = {
  className?: string;
};

export default function Input({ className }: inputProp) {
  const [search, setSearch] = useState('');
  const { products } = useProducts();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`input-basic position-relative ${className}`}>
      <input
        className='border border-0'
        type="text"
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <i className="fa-solid fa-magnifying-glass"></i>

      {search && filteredProducts.length > 0 && (
        <ul className='search-suggestions list-group position-absolute mt-2 w-100 bg-white z-3'>
          {filteredProducts.slice(0, 5).map(product => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={() => setSearch('')}
            >
              <li className='list-group-item'>{product.name}</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
