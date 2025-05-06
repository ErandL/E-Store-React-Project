import "../assets/productsCarousel.css";
import React, { useEffect, useRef } from 'react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';

const ProductsCarousel: React.FC = () => {
    const glideInstance = useRef<InstanceType<typeof Glide> | null>(null);
    const glideNode = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!glideNode.current) return;

        const initializeGlide = () => {
            if (window.innerWidth < 768) {
                glideInstance.current = new Glide(glideNode.current!, {
                    type: 'carousel',
                    perView: 1,
                    gap: 0,
                    peek: 0,
                    bound: true,
                    startAt: 0,
                    rewind: true,
                    animationDuration: 500,
                    focusAt: 'center'
                });
                glideInstance.current.mount();
            }
        };

        const handleResize = () => {
            if (window.innerWidth >= 768 && glideInstance.current) {
                glideInstance.current.destroy();
                glideInstance.current = null;
            } else if (window.innerWidth < 768 && !glideInstance.current) {
                initializeGlide();
            }
        };

        initializeGlide();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            glideInstance.current?.destroy();
        };
    }, []);

    return (
        <div className="glide" ref={glideNode}>
            <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                    <li className="glide__slide">
                        <div className="product">
                            <div className="product-image">
                                <img src="https://i.ibb.co/Gf59f61q/Group-1.png" alt="Ear Buds And Watch" />
                            </div>
                            <h3 className="product-title">Wireless Earbuds & Smart Watch</h3>
                            <p className="product-description">Premium quality wireless earbuds with matching smart watch</p>
                            <button className="product-button">Add to Cart</button>
                        </div>
                    </li>
                    <li className="glide__slide">
                        <div className="product">
                            <div className="product-image">
                                <img src="https://i.ibb.co/PvjYBkX4/image-64.png" alt="IPad" />
                            </div>
                            <h3 className="product-title">iPad Pro 2023</h3>
                            <p className="product-description">Latest iPad Pro with M2 chip and Liquid Retina display</p>
                            <button className="product-button">Add to Cart</button>
                        </div>
                    </li>
                    <li className="glide__slide">
                        <div className="product">
                            <div className="product-image">
                                <img src="https://i.ibb.co/jkLp3J15/image-41.png" alt="Samsung Phone" />
                            </div>
                            <h3 className="product-title">Samsung Galaxy S23</h3>
                            <p className="product-description">Flagship smartphone with professional-grade camera</p>
                            <button className="product-button">Add to Cart</button>
                        </div>
                    </li>
                    <li className="glide__slide">
                        <div className="product">
                            <div className="product-image">
                                <img src="https://i.ibb.co/rR9F1JKH/Macbook-1.png" alt="Macbook-1" />
                            </div>
                            <h3 className="product-title">MacBook Pro 16"</h3>
                            <p className="product-description">Powerful laptop with M2 Max chip for professionals</p>
                            <button className="product-button">Add to Cart</button>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="glide__bullets" data-glide-el="controls[nav]">
                <button className="glide__bullet" data-glide-dir="=0"></button>
                <button className="glide__bullet" data-glide-dir="=1"></button>
                <button className="glide__bullet" data-glide-dir="=2"></button>
                <button className="glide__bullet" data-glide-dir="=3"></button>
            </div>
        </div>
    );
};

export default ProductsCarousel;