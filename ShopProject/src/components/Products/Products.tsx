import useSWR from 'swr';
import { type ProductType } from '../../types/index'

import './Products.css';

const fetcher = (url: string): Promise<ProductType[]> => fetch(url).then((res) => res.json());

export const Products = () => {
    const ALL_PRODUCTS_URL = 'https://api.escuelajs.co/api/v1/products';
    const { data, error, isLoading } = useSWR<ProductType[]>(
        ALL_PRODUCTS_URL,
        fetcher
    );
    if (error) return <div>An error has occurred.</div>;
    if (isLoading) return <div>Loading...</div>;

    if (!data || !Array.isArray(data)) return <div>No products found</div>;

    return (
        <div className="Products">
            <h2 className="products-list-title">Products List</h2>
            <div className="products-list">
                {data.map((product: ProductType) => (
                    <div key={product.id} className="product-card">
                        <img className="product-image"
                            src={product.images[0]}
                            alt={product.title}
                        />
                        <div className="product-info">
                            <h3 className="product-title">{product.title}</h3>
                            <p className="product-description">{product.description}</p>
                            <div className="cart-info">
                                <p><strong>Price: ${product.price}</strong></p>
                                <button className="btn btn-secondary"> <i className="bi bi-cart3"></i></button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}