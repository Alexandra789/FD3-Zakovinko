import { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import useSWR from 'swr';
import './ProductDetail.css';

type ProductType = {
    id: number;
    title: string;
    price: number;
    images: string[];
    quantity?: number;
};

const getCartItems = (): ProductType[] => {
    const saved = localStorage.getItem('cart-items');
    return saved ? JSON.parse(saved) : [];
};

const saveCartItems = (items: ProductType[]) => {
    localStorage.setItem('cart-items', JSON.stringify(items));
};

const addToCart = (product: ProductType) => {
    const items = getCartItems();
    const existingItem = items.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        items.push({ ...product, quantity: 1 });
    }
    
    saveCartItems(items);
    window.dispatchEvent(new Event('cart-updated'));
};

const removeFromCart = (productId: number) => {
    const items = getCartItems();
    const idx = items.findIndex(item => item.id === productId);
    
    if (idx === -1) return;
    
    const nextQty = (items[idx].quantity || 1) - 1;
    if (nextQty <= 0) {
        items.splice(idx, 1);
    } else {
        items[idx].quantity = nextQty;
    }
    saveCartItems(items);
    window.dispatchEvent(new Event('cart-updated'));
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());


export const ProductDetail = () => {
    const { id } = useParams();

    const [author, setAuthor] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [comments, setComments] = useState<any[]>([]);
    const [cartItemsCount, setCartItemsCount] = useState<number>(0);

    const { data: apiData, error, isLoading } = useSWR<any>(
        id ? 'https://fakestoreapiserver.reactbd.org/api/products' : null,
        fetcher
    );

    const product = useMemo(() => {
        return Array.isArray(apiData?.data)
            ? apiData.data.find((p: any) => String(p._id) === String(id))
            : null;
    }, [apiData?.data, id]);


    useEffect(() => {
        const saved = localStorage.getItem(`comments-${id}`);
        if (saved) {
            try {
                const arr = JSON.parse(saved);
                if (Array.isArray(arr)) {
                    setComments(arr);
                }
            } catch {}
        }
    }, [id]);

    useEffect(() => {
        localStorage.setItem(`comments-${id}`, JSON.stringify(comments));
    }, [comments, id]);

    useEffect(() => {
        const updateCartCount = () => {
            const items = getCartItems();
            const currentItem = items.find(item => item.id === Number(id));
            setCartItemsCount(currentItem ? (currentItem.quantity || 1) : 0);
        };

        updateCartCount();
        window.addEventListener('cart-updated', updateCartCount);
        return () => window.removeEventListener('cart-updated', updateCartCount);
    }, [id]);

    const handleAddComment = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!author.trim() || !text.trim()) return;
        const newComment = {
            id: Date.now(),
            author,
            text,
            date: new Date().toLocaleDateString(),
        };
        setComments([newComment, ...comments]);
        setAuthor('');
        setText('');
    }, [author, text, comments]);

    const handleAddToCart = useCallback(() => {
        if (!product) return;
        addToCart({
            id: product._id,
            title: product.title,
            price: product.price,
            images: [product.image]
        });
    }, [product]);

    const handleRemoveFromCart = useCallback(() => {
        if (!product) return;
        removeFromCart(product._id);
    }, [product]);

    if (isLoading) {
        return (
            <div className="container">
                <p>Loading...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container">
                <h2>Product not found</h2>
                <p>{error ? 'Could not load product. Try again later.' : ''}</p>
                <Link to="/" className="btn btn-primary">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="ProductDetail">
            <div className="container">
                <nav className="breadcrumb">
                    <Link to="/">Home</Link>
                    <span>/</span>
                    <span>{product.title}</span>
                </nav>

                <div className="detail-box">
                    <div className="image-box">
                        <img src={product.image} alt={product.title} />
                    </div>
                    <div className="info-box">
                        <h1 className="title">{product.title}</h1>
                        <p className="price">Price: ${product.price}</p>
                        <p className="desc">{product.description}</p>
                        <div className="cart-actions">
                            {cartItemsCount === 0 ? (
                                <button className="btn btn-primary" onClick={handleAddToCart}>
                                    <i className="bi bi-cart3"></i> Add to Cart
                                </button>
                            ) : (
                                <div className="count">
                                    <button className="btn btn-secondary" onClick={handleRemoveFromCart}>-</button>
                                    <p>{cartItemsCount}</p>
                                    <button className="btn btn-secondary" onClick={handleAddToCart}>+</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="comments">
                    <h2>Comments ({comments.length})</h2>

                    <form onSubmit={handleAddComment} className="comment-form">
                        <div className="form-row">
                            <label htmlFor="author">Your name</label>
                            <input
                                id="author"
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="form-row">
                            <label htmlFor="text">Comment</label>
                            <textarea
                                id="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Write your comment"
                                rows={4}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Comment</button>
                    </form>

                    <div className="comment-list">
                        {comments.length === 0 && (
                            <p className="no-comments">No comments yet.</p>
                        )}
                        {comments.map((c) => (
                            <div key={c.id} className="comment-item">
                                <div className="comment-head">
                                    <strong>{c.author}</strong>
                                    <span className="date">{c.date}</span>
                                </div>
                                <p className="comment-text">{c.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}