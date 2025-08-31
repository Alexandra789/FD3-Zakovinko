import { Link } from 'react-router-dom';

import './Header.css';

export const Header = () => {
    return (
        <div className="Header">
            <Link to="/">
                <h1 className="title">Shop.co</h1>
            </Link>
            <nav className="navigation">
                <Link to="/">On sale</Link>
                <Link to="/">New Arrivals</Link>
                <Link to="/">Brands</Link>
            </nav>
            <div className="search">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Search for products..." />
            </div>
            <div className="user-buttons">
                <Link to="/cart">
                    <i className="bi bi-cart3"></i>
                </Link>
                <Link to="/">
                    <i className="bi bi-person"></i>
                </Link>
            </div>
        </div>
    )
}