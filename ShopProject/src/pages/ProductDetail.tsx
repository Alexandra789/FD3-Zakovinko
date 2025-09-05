import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useSWR from 'swr';
import './ProductDetail.css';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

function addToCartSimple(product: any) {
    const items = getCartItems();
    const idx = items.findIndex((it: any) => it.id === product.id);
    if (idx !== -1) {
        items[idx].quantity = (items[idx].quantity || 1) + 1;
    } else {
        items.push({ id: product.id, title: product.title, price: product.price, image: product.images?.[0], quantity: 1 });
    }
    saveCartItems(items);
}

export const ProductDetail = () => {
    const { id } = useParams();

    const [author, setAuthor] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [comments, setComments] = useState<any[]>([]);

    const { data: product, error, isLoading } = useSWR<any>(
        id ? `https://api.escuelajs.co/api/v1/products/${id}` : null,
        fetcher
    );

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

    function handleAddComment(e: React.FormEvent) {
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
    }

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
                        <img src={product.images && product.images[0]} alt={product.title} />
                    </div>
                    <div className="info-box">
                        <h1 className="title">{product.title}</h1>
                        <p className="price">Price: ${product.price}</p>
                        <p className="desc">{product.description}</p>
                        <button className="btn btn-primary" onClick={() => addToCartSimple(product)}>Add to Cart</button>
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