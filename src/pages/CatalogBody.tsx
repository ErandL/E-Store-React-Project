import { useEffect, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ShopNowBtn from '../components/shopNowBtn';
import { Link } from 'react-router-dom';

export default function CatalogBody() {
    const { products, loading, error } = useProducts();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [productNameFilter, setProductNameFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const categories = [...new Set(products.map(p => p.category))].sort();
    const filteredByCategory = selectedCategory
        ? products.filter(p => p.category === selectedCategory)
        : products;

    const brands = [...new Set(filteredByCategory.map(p => p.brand))].sort();
    const filteredByBrand = selectedBrand
        ? filteredByCategory.filter(p => p.brand === selectedBrand)
        : filteredByCategory;

    const finalFiltered = productNameFilter
        ? filteredByBrand.filter(p =>
            p.name.toLowerCase().includes(productNameFilter.toLowerCase())
        )
        : filteredByBrand;

    const totalPages = Math.ceil(finalFiltered.length / productsPerPage);
    const paginatedProducts = finalFiltered.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, selectedBrand, productNameFilter]);

    return (
        <div className="container py-4">
            <h3 className="mb-4 text-center">Browse Our Products</h3>

            <div className="row mb-4">
                <div className="col-md-4 mb-2">
                    <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setSelectedBrand('');
                        }}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4 mb-2">
                    <select
                        className="form-select"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        disabled={!selectedCategory}
                    >
                        <option value="">All Brands</option>
                        {brands.map(brand => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4 mb-2">
                    <input
                        type="text"
                        placeholder="Search by product name"
                        className="form-control"
                        value={productNameFilter}
                        onChange={(e) => setProductNameFilter(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p>Error loading products.</p>
            ) : (
                <>
                    <div className="row">
                        {paginatedProducts.length > 0 ? (
                            paginatedProducts.map(product => (
                                <div key={product.id} className="col-12 col-sm-6 col-lg-3 mb-4">
                                    <div className="cards-arr d-flex flex-column align-items-center p-4 border rounded h-100">
                                        <div className="w-100 d-flex justify-content-end">
                                            <i className="fa-regular fa-heart fs-4"></i>
                                        </div>
                                        <img
                                            className="rounded-circle mb-3"
                                            src={product.image}
                                            alt={product.name}
                                            width="60%"
                                        />
                                        <Link to={`/product/${product.id}`} className="text-decoration-none text-dark text-center mb-2">
                                            <h5>{product.name}</h5>
                                            <p className="small">{product.description}</p>
                                        </Link>
                                        <p className="mb-2 fw-bold">Price: ${product.price}</p>
                                        <ShopNowBtn text="Buy Now" className="text-white bg-black w-fit py-2" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No products match your filters.</p>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
                            <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                &laquo;
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    className={`btn btn-sm ${currentPage === i + 1 ? 'btn-dark' : 'btn-outline-dark'}`}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                &raquo;
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
