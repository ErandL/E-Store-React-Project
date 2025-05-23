import { createContext, useContext, useReducer, ReactNode } from 'react';

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity?: number;
};

type CartAction =
    | { type: 'ADD_TO_CART'; product: Product }
    | { type: 'REMOVE_FROM_CART'; id: number }
    | { type: 'DECREASE_QUANTITY'; id: number };

type CartState = Product[];

const CartContext = createContext<{
    cart: CartState;
    dispatch: React.Dispatch<CartAction>;
}>({ cart: [], dispatch: () => { } });

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existing = state.find(p => p.id === action.product.id);
            if (existing) {
                return state.map(p =>
                    p.id === action.product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
                );
            }
            return [...state, { ...action.product, quantity: 1 }];
        }
        case 'DECREASE_QUANTITY': {
            const existing = state.find(p => p.id === action.id);
            if (existing && (existing.quantity || 1) > 1) {
                return state.map(p =>
                    p.id === action.id ? { ...p, quantity: (p.quantity || 1) - 1 } : p
                );
            }
            return state.filter(p => p.id !== action.id);
        }
        case 'REMOVE_FROM_CART':
            return state.filter(p => p.id !== action.id);
        default:
            return state;
    }
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, dispatch] = useReducer(cartReducer, []);
    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
