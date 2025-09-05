import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

export const Cart = () => {
    const [items, setItems] = useState<any[]>([]);

    function loadCart() {
        try {
            const raw = localStorage.getItem('cart-items');
            const parsed = raw ? JSON.parse(raw) : [];
            if (Array.isArray(parsed)) {
                setItems(parsed);
            } else {
                setItems([]);
            }
        } catch {
            setItems([]);
        }
    }

    function saveCart(next: any[]) {
        localStorage.setItem('cart-items', JSON.stringify(next));
        setItems(next);
    }

    function handleRemove(id: number) {
        const next = items.filter((it) => it.id !== id);
        saveCart(next);
    }

    function handleClear() {
        saveCart([]);
    }

    function getTotal() {
        return items.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 1), 0);
    }

    useEffect(() => {
        loadCart();
    }, []);

    return (
        <div className="Cart">
            <div className="container">
                <h1>Cart</h1>

                {items.length === 0 && (
                    <div className="cart-empty">
                        <p>Your cart is empty.</p>
                        <Link to="/" className="btn btn-primary">Go shopping</Link>
                    </div>
                )}

                {items.length > 0 && (
                    <div className="cart-grid">
                        <div className="cart-list">
                            {items.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.title} />
                                    <div className="info">
                                        <h3>{item.title}</h3>
                                        <p>Price: ${item.price} × {item.quantity || 1}</p>
                                        <p className="subtotal">Subtotal: ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                                    </div>
                                    <button className="btn btn-secondary" onClick={() => handleRemove(item.id)}>Remove</button>
                                </div>
                            ))}
                        </div>
                        <div className="cart-summary">
                            <h3>Summary</h3>
                            <p>Items: {items.reduce((n, it) => n + (it.quantity || 1), 0)}</p>
                            <p className="total">Total: ${getTotal().toFixed(2)}</p>
                            <button className="btn btn-secondary" onClick={handleClear}>Clear cart</button>
                            <button className="btn btn-primary" disabled={items.length === 0}>Checkout</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}