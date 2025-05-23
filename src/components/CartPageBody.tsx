import { useCart } from '../components/CartContext';
import "../index.css";

export default function CartPageBody() {
    const { cart, dispatch } = useCart();

    const tax = 50;
    const shipping = 29;

    const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    const total = subtotal + tax + shipping;

    const handleQuantityChange = (id: number, type: 'inc' | 'dec') => {
        if (type === 'inc') {
            const item = cart.find(p => p.id === id);
            if (item) {
                dispatch({ type: 'ADD_TO_CART', product: item });
            }
        } else {
            dispatch({ type: 'DECREASE_QUANTITY', id });
        }
    };


    return (
        <div className="container py-5 d-flex flex-column flex-md-row justify-content-between gap-5">
            <div className="w-100 w-md-60">
                <h4 className="mb-4">Shopping Cart</h4>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="d-flex align-items-center justify-content-between border-bottom py-3">
                            <div className="d-flex align-items-center gap-3">
                                <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                                <div>
                                    <h6 className="mb-1">{item.name}</h6>
                                    <span className="fw-bold">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                                <button onClick={() => handleQuantityChange(item.id, 'dec')} className="btn btn-sm btn-outline-secondary">−</button>
                                <span>{item.quantity || 1}</span>
                                <button onClick={() => handleQuantityChange(item.id, 'inc')} className="btn btn-sm btn-outline-secondary">+</button>
                                <span className="fw-bold cart-quantity">${item.price * (item.quantity || 1)}</span>
                                <button
                                    onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: item.id })}
                                    className="btn btn-sm btn-outline-danger"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="w-100 w-md-35 border rounded p-md-5 p-4 bg-white">
                <h5 className="mb-4">Order Summary</h5>
                <div className="mb-3">
                    <p className="mb-1">Discount code / Promo code</p>
                    <input type="text" className="form-control py-3 mb-3" placeholder="Code" />
                    <p className="my-1">Your bonus card number</p>
                    <div className='card-bonus'>
                        <input type="text" className="form-control mb-2 py-3" placeholder="Enter Card Number" />
                        <button className="btn btn-white border border-black w-fit py-1 px-4 ">Apply</button>
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-4 mb-3">
                    <span className='fw-bold'>Subtotal</span>
                    <span className='fw-bold'>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span>Estimated Tax</span>
                    <span>${tax}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <span>Estimated shipping & Handling</span>
                    <span>${shipping}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <button className="btn btn-dark w-100 mt-4 py-3">Checkout</button>
            </div>
        </div>
    );
}
