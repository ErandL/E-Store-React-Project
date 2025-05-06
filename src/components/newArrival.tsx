import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import "../assets/newArrival.css"
import ShopNowBtn from '../components/shopNowBtn';
import { CircularProgress } from '@mui/material';

const NewArrival: React.FC = () => {
    const [selectedTag, setSelectedTag] = React.useState<string>('new');
    const [limit, setLimit] = useState<number>(8);


    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 1300) {
                setLimit(6);
            } else {
                setLimit(8);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const { products, loading, error } = useProducts({ limit, tag: selectedTag });

    if (loading) return (
        <div className='text-center p-5 m-5'>
            <CircularProgress />
            <h3>Loading! Please wait for a bit. Thank you!</h3>
        </div>
    );

    if (error) return <div className='text-center p-5 m-5'>{error}</div>;

    return (
        <div className="container pb-2">
            <ul className="new-ul pt-5 d-flex gap-3 arr-header">
                <li
                    className={`fs-5 list-unstyled ${selectedTag === 'new' ? 'activ-header text-black' : 'text-secondary'}`}
                    onClick={() => setSelectedTag('new')}
                    style={{ cursor: 'pointer', display: 'inline-block' }}
                >
                    New Arrival
                </li>
                <li
                    className={`fs-5 list-unstyled ${selectedTag === 'best-seller' ? 'activ-header text-black' : 'text-secondary'}`}
                    onClick={() => setSelectedTag('best-seller')}
                    style={{ cursor: 'pointer', display: 'inline-block' }}
                >
                    Bestseller
                </li>
                <li
                    className={`fs-5 list-unstyled ${selectedTag === 'featured' ? 'activ-header text-black' : 'text-secondary'}`}
                    onClick={() => setSelectedTag('featured')}
                    style={{ cursor: 'pointer', display: 'inline-block' }}
                >
                    Featured Products
                </li>
            </ul>
            <div className="cards-holder mt-4">
                {products.map((product) => (
                    <div key={product.id} className='cards-arr d-flex flex-column align-items-center m-3 p-4'>
                        <div className="w-100 d-flex justify-content-end">
                            <i className="fa-regular fa-heart fs-3"></i>
                        </div>
                        <img className='rounded-circle' src={product.image} alt={product.name} width={"45%"} />
                        <h5 className='text-center mt-3'>{product.name}</h5>
                        <span className='text-center'>{product.description}</span>
                        <p className='text-center mb-0 pb-0'>Price: ${product.price}</p>
                        <ShopNowBtn text="Buy Now" className="text-white bg-black w-fit py-2" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewArrival;
