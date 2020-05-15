import React, { useEffect, useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import Products from './Products'
import { loadProducts, newProduct } from './redux/actions'

function App () {

  const mobiles = useSelector(state => state.mobiles);
  const computers = useSelector(state => state.computers);
  const books = useSelector(state => state.books);
  const msg = useSelector(state => state.msg);
  const dispatch = useDispatch();
  const products = [{
    name: "iphone8",
    price: "799",
    category: "mobile"
  },
  {
    name: "iphoneXR",
    price: "899",
    category: "mobile"
  },
  {
    name: "iphone11",
    price: "999",
    category: "mobile"
  },
  {
    name: "Dell XR",
    price: "599",
    category: "computer"
  },
  {
    name: "Alianware 14",
    price: "1499",
    category: "computer"
  }, {
    name: "Vue",
    price: "59",
    category: "book"
  }, {
    name: "React",
    price: "39",
    category: "book"
  },
  ]
  const [name, setName] = useState(products[0].name)

  const getTotal = () => {
    let sum = 0;
    const arr = [...mobiles, ...computers, ...books];
    arr.forEach(e => {
      if (e.checked)
        sum += (e.price * e.quantity)
    })
    return sum;
  }


  useEffect(() => {
    dispatch(loadProducts())
  }, [dispatch])

  return (
    <div className="App">
      <form>
        <select value={name} onChange={e => { setName(e.target.value) }}>
          {products.map((e, index) => <option key={index} value={e.name}>{e.name}</option>)}
        </select>
        <button type="button" onClick={e => {
          let p = products.find(e => e.name === name)
          dispatch(newProduct(p.name, p.price, p.category))
        }}>Add</button>
      </form>{msg}
      <Products title={'Mobiles'} data={mobiles}></Products>
      <Products title={'Computers'} data={computers}></Products>
      <Products title={'Books'} data={books}></Products>
      <hr />
      <div style={{ float: "right", padding: "20px", fontSize: "20px" }}>Total: {getTotal()}</div>
    </div>
  );
}

export default App;
