import { useState } from 'react';
import { Products } from '../components/Products/Products';

export const Home = () => {
    const [cartItemsCount, setCartItemsCount] = useState<number>(0);
    
    return (
        <Products cartItemsCount={cartItemsCount} setCartItemsCount={setCartItemsCount}/>
    )
}