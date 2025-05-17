import { useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ShopNowBtn from '../components/shopNowBtn';
import Header from './header';
import Footer from './footer';
import "../assets/productsPage.css"

function SingleProduct() {
    const { productId } = useParams();
    const numericId = parseInt(productId ?? '');
    const { products, loading, error } = useProducts();

    const product = products.find(p => p.id === numericId);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading product</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <>
            <Header />
            <div className="container px-5 pt-4 pb-5">
                <div className="breadcrumb gap-2 mb-4 d-none d-md-flex">
                    <span style={{ opacity: 0.6 }}>Home</span>
                    <span>&gt;</span>
                    <span style={{ opacity: 0.6 }}>Catalogue</span>
                    {product.category && (
                        <>
                            <span>&gt;</span>
                            <span style={{ opacity: 0.6 }}>
                                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                            </span>
                        </>
                    )}
                    {product.brand && (
                        <>
                            <span>&gt;</span>
                            <span style={{ opacity: 0.6 }}>{product.brand}</span>
                        </>
                    )}
                    <>
                        <span>&gt;</span>
                        <span style={{ fontWeight: 'bold' }}>{product.name}</span>
                    </>
                </div>

                <div className='mt-5 single-card d-flex flex-md-row flex-column align-items-start gap-5'>
                    <img src={product.image} alt={product.name} className="mb-3" />
                    <div>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p className='fw-bold'>Price: ${product.price}</p>
                        <p>Rating: {product.rating}⭐</p>
                        <ShopNowBtn text="Buy Now" className="text-white bg-black py-2 px-4 mt-3" />
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
}

export default SingleProduct;