import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

export const Cart = () => {
    const [items, setItems] = useState<any[]>([]);
    const [removingItems, setRemovingItems] = useState<Set<number>>(new Set());

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
        window.dispatchEvent(new Event('cart-updated'));
    }

    const handleRemove = useCallback((id: number) => {
        setRemovingItems(prev => new Set(prev).add(id));
        
        setTimeout(() => {
            const next = items.filter((it) => it.id !== id);
            saveCart(next);
            setRemovingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }, 300);
    }, [items]);

    const handleUpdateQuantity = useCallback((id: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            handleRemove(id);
            return;
        }
        
        const next = items.map(item => 
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        saveCart(next);
    }, [items, handleRemove]);

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
                                <div 
                                    key={item.id} 
                                    className={`cart-item ${removingItems.has(item.id) ? 'removing' : ''}`}
                                >
                                    <div className="item-image">
                                        <img src={item.image || item.images?.[0]} alt={item.title} />
                                    </div>
                                    <div className="info">
                                        <h3>{item.title}</h3>
                                        <p className="price">Price: ${item.price}</p>
                                        <div className="quantity-controls">
                                            <button 
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                                            >
                                                -
                                            </button>
                                            <span className="quantity">{item.quantity || 1}</span>
                                            <button 
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => handleUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="subtotal">Subtotal: ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                                    </div>
                                    <button 
                                        className="btn btn-danger btn-sm" 
                                        onClick={() => handleRemove(item.id)}
                                        disabled={removingItems.has(item.id)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
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