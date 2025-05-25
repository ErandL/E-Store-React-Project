import { useProducts } from '../hooks/useProducts';
import ShopNowBtn from '../components/shopNowBtn';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import "../assets/newArrival.css"


const DiscountsBundle = () => {
    const { products, loading, error } = useProducts({ sortBy: 'discount' });

    const closestTo50Percent = products
        .filter(product => product.discount > 0)
        .map(product => ({
            ...product,
            distanceFrom50: Math.abs(product.discount - 50)
        }))
        .sort((a, b) => a.distanceFrom50 - b.distanceFrom50)
        .slice(0, 4);

    if (loading) return (
        <div className='text-center p-5 m-5'>
            <CircularProgress />
            <h3>Loading! Please wait for a bit. Thank you!</h3>
        </div>
    );

    if (error) return <div className='text-center p-5 m-5'>{error}</div>;

    return (
        <div className="container d-flex flex-column mt-5 mb-5">
            <h3>Discounts up to -50%</h3>
            <div className="cards-holder gap-3">
                {closestTo50Percent.map((product) => (
                    <div key={product.id} className='cards-arr d-flex flex-column align-items-center mt-2 mb-3 p-4'>
                        <div className="w-100 d-flex justify-content-end">
                            <i className="fa-regular fa-heart fs-3"></i>
                        </div>
                        <img className='rounded-circle' src={product.image} alt={product.name} width={"45%"} />
                        <Link key={product.id} to={`/product/${product.id}`} className="text-decoration-none lh-base text-dark text-center mb-2">
                            <h5 className='text-center mt-5'>{product.name}</h5>
                            <span className='text-center'>{product.description}</span>
                        </Link>
                        <p className='text-center mb-0 pb-0 flex-grow-1'>Price: ${product.price}</p>
                        <ShopNowBtn text="Buy Now" className="text-white bg-black w-fit py-2" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DiscountsBundle;