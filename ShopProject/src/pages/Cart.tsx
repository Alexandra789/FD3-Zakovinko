type CartPropTypes = {
    count: number,
}

export const Cart = ({ count }: CartPropTypes) => {
    return (
        <h1>CART {count}</h1>
    )
}