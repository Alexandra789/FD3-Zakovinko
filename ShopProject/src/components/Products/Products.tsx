import useSWR from 'swr';
import './Products.css';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';

const fetcher = (url: string): Promise<ProductType[]> => fetch(url).then((res) => res.json());

type ProductsPropTypes = {
    cartItemsCount: number;
    setCartItemsCount: (newCartItemsCount: number) => void;
};

type ProductType = {
    id: number,
    images: string[],
    title: string,
    description: string,
    price: number
};

function getCartItems() {
    try {
        const raw = localStorage.getItem('cart-items');
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function saveCartItems(items: any[]) {
    localStorage.setItem('cart-items', JSON.stringify(items));
    window.dispatchEvent(new Event('cart-updated'));
}

function addToCart(product: ProductType) {
    const items = getCartItems();
    const idx = items.findIndex((it: any) => it.id === product.id);
    if (idx !== -1) {
        items[idx].quantity = (items[idx].quantity || 1) + 1;
    } else {
        items.push({ id: product.id, title: product.title, price: product.price, image: product.images?.[0], quantity: 1 });
    }
    saveCartItems(items);
}

function removeFromCart(productId: number) {
    const items = getCartItems();
    const idx = items.findIndex((it: any) => it.id === productId);
    if (idx === -1) return saveCartItems(items);
    const nextQty = (items[idx].quantity || 1) - 1;
    if (nextQty <= 0) {
        items.splice(idx, 1);
    } else {
        items[idx].quantity = nextQty;
    }
    saveCartItems(items);
}

export const Products = ({ cartItemsCount, setCartItemsCount }: ProductsPropTypes) => {
    const ALL_PRODUCTS_URL = 'https://api.escuelajs.co/api/v1/products';
    const { data, error, isLoading } = useSWR<ProductType[]>(
        ALL_PRODUCTS_URL,
        fetcher
    );
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showAll, setShowAll] = useState<boolean>(false);
    const pageSize = 10;

    const products: ProductType[] = Array.isArray(data) ? data : [];
    const totalProducts = products.length;
    const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize));

    const displayedProducts = useMemo(() => {
        if (showAll) return products;
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return products.slice(start, end);
    }, [products, currentPage, showAll]);

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleShowAll = () => {
        setShowAll(prev => !prev);
        if (showAll) setCurrentPage(1);
    };

    if (error) return <div className="container">An error has occurred.</div>;
    if (isLoading) return <div className="container">Loading...</div>;
    if (!Array.isArray(data) || data.length === 0) return <div className="container">No products found</div>;

    return (
        <div className="Products">
            <div className="container">
                <h2 className="products-list-title">Products List</h2>
                <div className="products-toolbar">
                    <button
                        className={`btn btn-secondary show-all-toggle ${showAll ? 'active' : ''}`}
                        onClick={toggleShowAll}
                    >
                        {showAll ? 'Показывать по 10' : 'Показать все'}
                    </button>
                    {!showAll && (
                        <div className="pagination-info">
                            <span>Page {currentPage} of {totalPages}</span>
                            <span>Total: {totalProducts}</span>
                        </div>
                    )}
                </div>
                <div className="products-list">
                    {displayedProducts.map((product: ProductType) => (
                        <div key={product.id} className="product-card">
                            <Link to={`/product/${product.id}`}>
                                <img className="product-image"
                                    src={product.images[0]}
                                    alt={product.title}
                                />
                                <div className="product-info">
                                    <h3 className="product-title">{product.title}</h3>
                                    <p className="product-description">{product.description}</p></div></Link>
                            <div className="cart-info">
                                <p><strong>Price: ${product.price}</strong></p>
                                {cartItemsCount === 0 && (
                                    <button
                                        className="btn btn-secondary"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(product);
                                            setCartItemsCount(cartItemsCount + 1);
                                        }}
                                    >
                                        <i className="bi bi-cart3"></i>
                                    </button>
                                )}
                                {cartItemsCount !== 0 && (
                                    <div className="count">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                removeFromCart(product.id);
                                                setCartItemsCount(Math.max(0, cartItemsCount - 1));
                                            }}
                                        >-</button>
                                        <p>{cartItemsCount}</p>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addToCart(product);
                                                setCartItemsCount(cartItemsCount + 1);
                                            }}
                                        >+</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {!showAll && totalPages > 1 && (
                    <div className="pagination">
                        <button
                            className="btn btn-secondary"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            « Prev
                        </button>
                        <div className="page-buttons">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    className={`btn btn-secondary page-btn ${page === currentPage ? 'active' : ''}`}
                                    onClick={() => goToPage(page)}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button
                            className="btn btn-secondary"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next »
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}