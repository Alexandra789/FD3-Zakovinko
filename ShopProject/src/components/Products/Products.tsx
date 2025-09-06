import useSWR from 'swr';
import './Products.css';
import { Link } from 'react-router-dom';
import { useState, useCallback, useMemo } from 'react';

const fetcher = (url: string): Promise<any> => fetch(url).then((res) => res.json());

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
    const BASE_URL = 'https://fakestoreapiserver.reactbd.org/api/products';
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showAll, setShowAll] = useState<boolean>(false);
    const perPage = 10;
    const { data, error, isLoading } = useSWR<any>(
        showAll ? `${BASE_URL}` : `${BASE_URL}?page=${currentPage}&perPage=${perPage}`,
        fetcher
    );

    const products: ProductType[] = useMemo(() => {
        const raw = Array.isArray(data?.data) ? data.data : [];
        return raw.map((p: any) => ({
            id: p._id,
            images: p.image ? [p.image] : [],
            title: p.title,
            description: p.description,
            price: p.price,
        }));
    }, [data?.data]);

    const totalProducts = useMemo(() => 
        showAll ? products.length : (typeof data?.totalProducts === 'number' ? data.totalProducts : products.length),
        [showAll, data?.totalProducts, products.length]
    );
    
    const totalPages = useMemo(() => 
        showAll ? 1 : (typeof data?.totalPages === 'number' ? data.totalPages : Math.max(1, Math.ceil(totalProducts / perPage))),
        [showAll, data?.totalPages, totalProducts, perPage]
    );

    const goToPage = useCallback((page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [totalPages]);

    const handleAddToCart = useCallback((product: ProductType) => {
        addToCart(product);
        setCartItemsCount(cartItemsCount + 1);
    }, [cartItemsCount, setCartItemsCount]);

    const handleRemoveFromCart = useCallback((productId: number) => {
        removeFromCart(productId);
        setCartItemsCount(Math.max(0, cartItemsCount - 1));
    }, [cartItemsCount, setCartItemsCount]);

    const toggleShowAll = useCallback(() => {
        setShowAll(!showAll);
        if (!showAll) {
            setCurrentPage(1);
        }
    }, [showAll]);

    if (error) return <div className="container">An error has occurred.</div>;
    if (isLoading) return <div className="container">Loading...</div>;
    if (products.length === 0) return <div className="container">No products found</div>;

    return (
        <div className="Products">
            <div className="container">
                <h2 className="products-list-title">Products List</h2>
                <div className="products-toolbar">
                    <div className="pagination-info">
                        <span>Page {currentPage} of {totalPages}</span>
                        <span>Total: {totalProducts}</span>
                    </div>
                    <button 
                        className={`btn btn-outline-primary show-all-toggle ${showAll ? 'active' : ''}`}
                        onClick={toggleShowAll}
                    >
                        {showAll ? 'Show Paginated' : 'Show All Products'}
                    </button>
                </div>
                <div className="products-list">
                    {products.map((product: ProductType) => (
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
                                            handleAddToCart(product);
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
                                                handleRemoveFromCart(product.id);
                                            }}
                                        >-</button>
                                        <p>{cartItemsCount}</p>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAddToCart(product);
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