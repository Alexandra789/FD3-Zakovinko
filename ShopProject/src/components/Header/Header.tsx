import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

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
    const [searchOpen, setSearchOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
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

    const openSearch = () => {
        setSearchOpen(true);
        setMenuOpen(false);
        requestAnimationFrame(() => searchInputRef.current?.focus());
    };

    const closeSearch = () => {
        setSearchOpen(false);
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
            searchInputRef.current.blur();
        }
    };

    return (
        <div className="Header">
            <div className="container">
                <Link to="/" onClick={() => { closeMenu(); closeSearch(); }}>
                    <h1 className="title">Shop.co</h1>
                </Link>
                <nav className={`navigation ${menuOpen ? 'open' : ''}`}>
                    <Link to="/" onClick={() => { closeMenu(); closeSearch(); }}>On sale</Link>
                    <Link to="/" onClick={() => { closeMenu(); closeSearch(); }}>New Arrivals</Link>
                    <Link to="/" onClick={() => { closeMenu(); closeSearch(); }}>Brands</Link>
                </nav>
                <button
                    className={`menu-toggle ${menuOpen ? 'active' : ''} ${searchOpen ? 'hidden' : ''}`}
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(prev => !prev)}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
                <div className={`search ${searchOpen ? 'open' : ''}`}>
                    <i className="bi bi-search" onClick={openSearch}></i>
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search for products..."
                        onFocus={openSearch}
                    />
                    <button className="search-clear" aria-label="Close search" onClick={closeSearch}>×</button>
                </div>
                <div className="user-buttons">
                    <Link to="/cart" onClick={() => { closeMenu(); closeSearch(); }} className="cart-link">
                        <i className="bi bi-cart3"></i>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                    <Link to="/" onClick={() => { closeMenu(); closeSearch(); }}>
                        <i className="bi bi-person"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}