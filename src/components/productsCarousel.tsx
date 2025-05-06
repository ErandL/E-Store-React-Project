import { useRef, useState } from "react";
import "../assets/productsCarousel.css";
import ShopNowBtn from "./shopNowBtn";

const ProductsCarousel: React.FC = () => {
    const carouselRef = useRef<HTMLUListElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        if (carouselRef.current) {
            const scrollPosition = carouselRef.current.scrollLeft;
            const itemWidth = carouselRef.current.clientWidth;
            const newIndex = Math.round(scrollPosition / itemWidth);
            setActiveIndex(newIndex);
        }
    };

    const scrollToIndex = (index: number) => {
        if (carouselRef.current) {
            const itemWidth = carouselRef.current.clientWidth;
            carouselRef.current.scrollTo({
                left: index * itemWidth,
                behavior: 'smooth'
            });
        }
    };

    const products = [
        {
            image: "https://i.ibb.co/Gf59f61q/Group-1.png",
            alt: "Ear Buds And Watch",
            title: "Popular Products",
            description: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
            bgColor: ""
        },
        {
            image: "https://i.ibb.co/PvjYBkX4/image-64.png",
            alt: "IPad",
            title: "iPad Pro",
            description: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
            bgColor: "#f9f9f9"
        },
        {
            image: "https://i.ibb.co/jkLp3J15/image-41.png",
            alt: "Samsung Phone",
            title: "Samsung Galaxy",
            description: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
            bgColor: "#eaeaea"
        },
        {
            image: "https://i.ibb.co/rR9F1JKH/Macbook-1.png",
            alt: "Macbook-1",
            title: "MacBook Pro",
            description: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
            bgColor: "#2c2c2c",
            textColor: "white"
        }
    ];

    return (
        <div className="carousel-container">
            <ul
                className="prod-carousel"
                ref={carouselRef}
                onScroll={handleScroll}
            >
                {products.map((product, index) => (
                    <li
                        key={index}
                        className="product-li"
                        style={{
                            backgroundColor: product.bgColor,
                            color: product.textColor || 'inherit'
                        }}
                    >
                        <div className="product-image">
                            <img src={product.image} alt={product.alt} />
                        </div>
                        <div className="product-desc">
                            <h3 className="product-title">{product.title}</h3>
                            <p className="product-description">{product.description}</p>
                            <ShopNowBtn
                                text="Shop Now"
                                className={`${product.textColor ? 'text-white border-white' : 'text-black border-black'} w-fit py-3`}
                            />
                            {/* Pagination dots - shown only on mobile */}
                            <div className="carousel-pagination">
                                {products.map((_, dotIndex) => (
                                    <div
                                        key={dotIndex}
                                        className={`carousel-dot ${activeIndex === dotIndex ? 'active' : ''}`}
                                        onClick={() => scrollToIndex(dotIndex)}
                                    />
                                ))}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsCarousel;