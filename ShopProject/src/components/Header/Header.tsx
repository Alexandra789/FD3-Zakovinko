import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './Header.css';

function getCartCount(): number {
    try {
        const raw = localStorage.getItem('cart-items');
        const items = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(items)) return 0;
        return items.reduce((n: number, it: any) => n + (it.quantity || 1), 0);
    } catch {
        return 0;
    }
}

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState<number>(0);

    useEffect(() => {
        function update() {
            setCartCount(getCartCount());
        }
        update();
        const handler = () => update();
        window.addEventListener('cart-updated', handler);
        window.addEventListener('storage', handler);
        return () => {
            window.removeEventListener('cart-updated', handler);
            window.removeEventListener('storage', handler);
        };
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <div className="Header">
            <div className="container">
                <Link to="/" onClick={closeMenu}>
                    <h1 className="title">Shop.co</h1>
                </Link>
                <nav className={`navigation ${menuOpen ? 'open' : ''}`}>
                    <Link to="/" onClick={closeMenu}>On sale</Link>
                    <Link to="/" onClick={closeMenu}>New Arrivals</Link>
                    <Link to="/" onClick={closeMenu}>Brands</Link>
                </nav>
                <button
                    className={`menu-toggle ${menuOpen ? 'active' : ''}`}
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(prev => !prev)}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
                <div className="user-buttons">
                    <Link to="/cart" onClick={closeMenu} className="cart-link">
                        <i className="bi bi-cart3"></i>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                    <Link to="/" onClick={closeMenu}>
                        <i className="bi bi-person"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}