import React, { Fragment } from 'react';
import Product from "./Product";

const Products = (props) => {
    return (
        <Fragment>
        {props.data.length >0?<table>
        <caption><h2>{props.title}</h2></caption>
        <thead>
            <tr>
                <th></th>
                <th> Product</th>
                <th></th>
                <th> Unit Price</th>
                <th> Quantity</th>
                <th> Total</th>
                <th> Action</th>
            </tr>
        </thead>
        <tbody>
            {props.data.map(e =>
                <Product key={e.id} data={e}></Product>
            )}
        </tbody>
    </table>:""}</Fragment>)
}

export default Products;