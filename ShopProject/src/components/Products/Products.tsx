import useSWR from 'swr';
import './Products.css';
import { Link } from 'react-router-dom';

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

export const Products = ({ cartItemsCount, setCartItemsCount }: ProductsPropTypes) => {
    const ALL_PRODUCTS_URL = 'https://api.escuelajs.co/api/v1/products';
    const { data, error, isLoading } = useSWR<ProductType[]>(
        ALL_PRODUCTS_URL,
        fetcher
    );
    if (error) return <div className="container">An error has occurred.</div>;
    if (isLoading) return <div className="container">Loading...</div>;

    if (!data || !Array.isArray(data)) return <div className="container">No products found</div>;

    const incrementCount = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setCartItemsCount(++cartItemsCount);
    }
    const decrementCount = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setCartItemsCount(--cartItemsCount);
    }

    return (
        <div className="Products">
            <div className="container">
                <h2 className="products-list-title">Products List</h2>
                <div className="products-list">
                    {data.map((product: ProductType) => (
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
                                {
                                    cartItemsCount === 0 &&
                                    <button className="btn btn-secondary" onClick={e => incrementCount(e)}>
                                        <i className="bi bi-cart3"></i>
                                    </button>
                                }
                                {
                                    cartItemsCount !== 0 &&
                                    <div className="count">
                                        <button className="btn btn-secondary" onClick={e => decrementCount(e)}>-</button>
                                        <p>{cartItemsCount}</p>
                                        <button className="btn btn-secondary" onClick={e => incrementCount(e)}>+</button>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}