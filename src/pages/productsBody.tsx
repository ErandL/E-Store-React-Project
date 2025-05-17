import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../assets/productsPage.css";
import { useProducts } from '../hooks/useProducts';
import ShopNowBtn from '../components/shopNowBtn';
import { Link } from 'react-router-dom';

function Breadcrumb({ category }: { category: string | null }) {
    return (
        <div className="breadcrumb d-none d-md-flex gap-2 mb-4">
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
    const [brandSearch, setBrandSearch] = useState('');
    const productsPerPage = 9;

    const { products: allProducts, loading, error } = useProducts();

    const normalizedCategory = selectedCategory?.toLowerCase();

    const categoryFilteredProducts = normalizedCategory
        ? allProducts.filter(
            product => product.category?.toLowerCase() === normalizedCategory
        )
        : allProducts;

    const brands = [...new Set(categoryFilteredProducts.map(product => product.brand))].sort();

    const filteredBrands = brands.filter(brand =>
        brand.toLowerCase().includes(brandSearch.toLowerCase())
    );

    const [isBrandOpen, setIsBrandOpen] = useState(false);

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

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedBrands, selectedRating, selectedCategory]);

    return (
        <div className='px-sm-5 px-3 pt-4 pb-5'>
            <Breadcrumb category={selectedCategory} />
            <div className="products-page-body">
                <div className="products-page-side-menu">
                    <div className="brand-dropdown">
                        <div
                            className='d-flex justify-content-between align-items-center border-bottom mb-3'
                            onClick={() => setIsBrandOpen(prev => !prev)}
                            style={{ cursor: 'pointer' }}
                        >
                            <h5 className='text-center m-0'>Brand</h5>
                            <span className={`fs-5 ${isBrandOpen ? 'rotate-down' : 'rotate-right'}`}>&gt;</span>
                        </div>

                        {isBrandOpen && (
                            loading ? (
                                <p>Loading brands...</p>
                            ) : error ? (
                                <p>Error loading brands</p>
                            ) : (
                                <ul id='brands-ul' className='d-flex flex-column gap-3 p-0 m-0'>
                                    <li style={{ listStyle: 'none', paddingRight: '1rem' }}>
                                        <div className="category-input">
                                            <input
                                                type="text"
                                                placeholder="Search"
                                                value={brandSearch}
                                                onChange={(e) => setBrandSearch(e.target.value)}
                                                className="form-control"
                                            />
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </div>
                                    </li>

                                    {filteredBrands.length > 0 ? (
                                        filteredBrands.map((brand) => (
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
                                        ))
                                    ) : (
                                        <li style={{ listStyle: 'none', opacity: 0.6 }}>No matching brands</li>
                                    )}
                                </ul>
                            )
                        )}
                    </div>
                </div>

                <div className="products-page-main-menu px-sm-5 px-3 mt-5 mt-md-0">
                    <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-3 gap-3">
                        <p className='fw-light m-0 p-0'>
                            Selected Products: <span className='fw-bold'>{finalFilteredProducts.length}</span>
                        </p>
                        <div className="rating-filter p-0 m-sm-0 mb-3">
                            <select id="rating" className='m-0 rounded border-secondary-subtle' onChange={handleRatingChange} value={selectedRating ?? ''}>
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
                                        <Link
                                            key={product.id}
                                            to={`/product/${product.id}`}
                                            className="text-decoration-none text-dark"
                                        >
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
                                        </Link>
                                    ))
                                ) : (
                                    <p>No products found matching your filters.</p>
                                )}
                            </div>

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
