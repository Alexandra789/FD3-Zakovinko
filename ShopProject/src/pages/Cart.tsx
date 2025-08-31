import React from 'react';

type CartProps = {
    count: number,
}

export const Cart = ({ count }: CartProps) => {
    return (
        <h1>CART {count}</h1>
    )
}