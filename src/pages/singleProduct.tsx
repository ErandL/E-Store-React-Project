import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ShopNowBtn from '../components/shopNowBtn';
import Header from './header';
import Footer from './footer';
import ReviewForm from '../components/reviewForm';
import "../assets/productsPage.css";

type Review = {
    user: string;
    comment: string;
    rating: number;
};

function SingleProduct() {
    const { productId } = useParams();
    const numericId = parseInt(productId ?? '');
    const { products, loading, error } = useProducts();

    const product = products.find(p => p.id === numericId);

    const [localReviews, setLocalReviews] = useState<Review[]>([]);

    const [showReviewForm, setShowReviewForm] = useState(false);

    useEffect(() => {
        if (product && product.reviews) {
            setLocalReviews(product.reviews);
        }
    }, [product]);

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center mt-5 text-danger">Error loading product</p>;
    if (!product) return <p className="text-center mt-5 text-muted">Product not found</p>;

    return (
        <>
            <Header />
            <div className="container px-4 px-md-5 pt-4 pb-5">
                <div className="breadcrumb gap-2 mb-4 d-none d-md-flex">
                    <span style={{ opacity: 0.6 }}>Home</span>
                    <span>&gt;</span>
                    <span style={{ opacity: 0.6 }}>Catalogue</span>
                    <span>&gt;</span>
                    <span style={{ opacity: 0.6 }}>
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </span>
                    <span>&gt;</span>
                    <span style={{ opacity: 0.6 }}>{product.brand}</span>
                    <span>&gt;</span>
                    <span style={{ fontWeight: 'bold' }}>{product.name}</span>
                </div>

                <div className='single-card d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4 mt-4'>
                    <img src={product.image} alt={product.name} />
                    <div className="d-flex flex-column">
                        <h2>{product.name}</h2>
                        <p className="text-muted">{product.description}</p>

                        <div className="mb-2">
                            {product.oldPrice && product.oldPrice > product.price && (
                                <span className="text-decoration-line-through text-muted me-2">
                                    ${product.oldPrice}
                                </span>
                            )}
                            <span className="fw-bold fs-5 text-success">${product.price}</span>
                            {product.discount > 0 && (
                                <span className="badge bg-danger ms-2">{product.discount}% off</span>
                            )}
                        </div>

                        <p className="mb-1">Brand: <strong>{product.brand}</strong></p>
                        <p className="mb-1">Rating: {product.rating}⭐</p>
                        <p className="mb-1">Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>

                        {product.colors.length > 0 && (
                            <p className="mb-2 flex-grow-1">
                                Colors: {product.colors.map((color, idx) => {
                                    const lowerColor = color.toLowerCase();
                                    const isWhite = lowerColor === 'white' || lowerColor === '#ffffff' || lowerColor === 'rgb(255, 255, 255)';

                                    return (
                                        <span
                                            key={idx}
                                            className="badge border border-secondary-subtle me-1"
                                            style={{
                                                backgroundColor: color,
                                                color: isWhite ? '#000' : '#fff',
                                            }}
                                        >
                                            {color}
                                        </span>
                                    );
                                })}
                            </p>
                        )}

                        <ShopNowBtn text="Buy Now" className="text-white bg-black py-2 px-4 mt-3 w-fit" />
                    </div>
                </div>

                {localReviews.length > 0 ? (
                    <div className="mt-4 reviews-section">
                        <h4 className="mb-3">Customer Reviews</h4>
                        <div className="d-flex flex-column gap-3">
                            {localReviews.map((review, index) => (
                                <div key={index} className="review-card p-3 border rounded shadow-sm bg-light">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <strong>{review.user}</strong>
                                        <span className="text-warning">
                                            {'⭐'.repeat(review.rating)}
                                        </span>
                                    </div>
                                    <p className="mb-0">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="mt-4 text-muted">No reviews yet.</p>
                )}

                <div
                    onClick={() => setShowReviewForm(prev => !prev)}
                    className="d-flex align-items-center justify-content-between border rounded px-3 py-2 mt-5 bg-white cursor-pointer"
                    style={{ cursor: 'pointer' }}
                >
                    <h5 className="mb-0">Write a Review</h5>
                    <span
                        className="transition-transform"
                        style={{
                            transform: showReviewForm ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease',
                        }}
                    >
                        &gt;
                    </span>
                </div>

                {showReviewForm && (
                    <div className="mt-3">
                        <ReviewForm onSubmit={(newReview: Review) => setLocalReviews([newReview, ...localReviews])} />
                    </div>
                )}
            </div >

            <Footer />
        </>
    );
}

export default SingleProduct;