import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteProductById, changeQuantityById ,checkProduct} from './redux/actions'

function Product (props) {
    const dispatch = useDispatch();

    return (<tr>
        <td><input checked={props.data.check} type="checkbox" onChange={e=>{dispatch(checkProduct(props.data.id, props.data.category))}} /></td>
        
        <td>{props.data.name}</td>
        <td><img style={{maxWidth:"100px"}} src={process.env.PUBLIC_URL + `/img/${props.data.name.trim()}.png`} alt={props.data.name}/></td>
        <td>{props.data.price}</td>
        <td><button disabled={props.data.quantity <= 0} onClick={e => { dispatch(changeQuantityById(props.data.id, props.data.category, (props.data.quantity - 1) )) }}>-</button>{props.data.quantity}<button onClick={e => { dispatch(changeQuantityById(props.data.id, props.data.category, props.data.quantity + 1)) }}>+</button></td>
        <td>{props.data.quantity * props.data.price}</td>
        <td><button onClick={e => { dispatch(deleteProductById(props.data.id, props.data.category)) }}>DELETE</button></td>
    </tr>)
}

export default Product;