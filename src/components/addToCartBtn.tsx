import "../index.css";
import { useCart } from "./CartContext";

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
};

type AddToCartBtnProps = {
    text: string;
    className?: string;
    product: Product;
};

export default function AddToCartBtn({ text, className, product }: AddToCartBtnProps) {
    const { dispatch } = useCart();

    const handleAddToCart = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // Prevent navigation
        dispatch({ type: 'ADD_TO_CART', product });
    };

    return (
        <a
            href="#"
            className={`px-5 mt-3 border text-decoration-none rounded-3 ${className}`}
            onClick={handleAddToCart}
        >
            {text}
        </a>
    );
}
