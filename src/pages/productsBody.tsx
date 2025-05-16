import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../assets/productsPage.css";
import { useProducts } from '../hooks/useProducts';
import ShopNowBtn from '../components/shopNowBtn';

function Breadcrumb({ category }: { category: string | null }) {
    return (
        <div className="breadcrumb d-flex gap-2 mb-4">
            <span style={{ opacity: 0.6 }}>Home</span>
            <span>&gt;</span>
            <span style={{ opacity: 0.6 }}>Catalogue</span>
            {category && (
                <>
                    <span>&gt;</span>
                    <span style={{ fontWeight: 'bold' }}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                </>
            )}
        </div>
    );
}

function ProductsBody() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedCategory = queryParams.get('category');

    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    const { products: allProducts, loading, error } = useProducts();

    const normalizedCategory = selectedCategory?.toLowerCase();

    const categoryFilteredProducts = normalizedCategory
        ? allProducts.filter(
            product => product.category?.toLowerCase() === normalizedCategory
        )
        : allProducts;

    const brands = [...new Set(categoryFilteredProducts.map(product => product.brand))].sort();

    const brandFilteredProducts = selectedBrands.length > 0
        ? categoryFilteredProducts.filter(product => selectedBrands.includes(product.brand))
        : categoryFilteredProducts;

    const finalFilteredProducts = selectedRating !== null
        ? brandFilteredProducts.filter(product => product.rating >= selectedRating)
        : brandFilteredProducts;

    const totalPages = Math.ceil(finalFilteredProducts.length / productsPerPage);
    const paginatedProducts = finalFilteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const handleBrandToggle = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedRating(value ? parseInt(value) : null);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Reset to page 1 when filters or category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedBrands, selectedRating, selectedCategory]);

    return (
        <div className='px-5 pt-2 pb-5'>
            <Breadcrumb category={selectedCategory} />
            <div className="products-page-body">
                <div className="products-page-side-menu">
                    <div className="brand-dropdown">
                        <div className='d-flex justify-content-between align-items-center border-bottom mb-3'>
                            <h5 className='text-center'>Brand</h5>
                            <span>&gt;</span>
                        </div>
                        {loading ? (
                            <p>Loading brands...</p>
                        ) : error ? (
                            <p>Error loading brands</p>
                        ) : (
                            <ul className='d-flex flex-column gap-3 p-0 m-0'>
                                {brands.map((brand) => (
                                    <li key={brand} style={{ listStyle: 'none' }}>
                                        <label className='d-flex align-items-center gap-2'>
                                            <input
                                                type="checkbox"
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => handleBrandToggle(brand)}
                                            />
                                            {brand}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="products-page-main-menu px-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <p className='fw-light'>
                            Selected Products: <span className='fw-bold'>{finalFilteredProducts.length}</span>
                        </p>
                        <div className="rating-filter">
                            <select id="rating" className='ms-2 rounded' onChange={handleRatingChange} value={selectedRating ?? ''}>
                                <option value="">By Rating</option>
                                <option value="4">4 Stars & Up</option>
                                <option value="3">3 Stars & Up</option>
                                <option value="2">2 Stars & Up</option>
                                <option value="1">1 Star & Up</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <p>Loading products...</p>
                    ) : error ? (
                        <p>Error loading products</p>
                    ) : (
                        <>
                            <div className="products-grid">
                                {paginatedProducts.length > 0 ? (
                                    paginatedProducts.map(product => (
                                        <div key={product.id} className='cards-arr d-flex flex-column align-items-center p-4'>
                                            <div className="w-100 d-flex justify-content-end">
                                                <i className="fa-regular fa-heart fs-3"></i>
                                            </div>
                                            <img
                                                className='rounded-circle'
                                                src={product.image}
                                                alt={product.name}
                                                width={"45%"}
                                            />
                                            <h5 className='text-center mt-5'>{product.name}</h5>
                                            <span className='text-center'>{product.description}</span>
                                            <p className='text-center mb-0 pb-0 flex-grow-1'>Price: ${product.price}</p>
                                            <ShopNowBtn text="Buy Now" className="text-white bg-black w-fit py-2" />
                                        </div>
                                    ))
                                ) : (
                                    <p>No products found matching your filters.</p>
                                )}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        &laquo;
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i + 1}
                                            className={`btn btn-sm ${currentPage === i + 1 ? 'btn-dark' : 'btn-outline-dark'}`}
                                            onClick={() => handlePageChange(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        &raquo;
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductsBody;
