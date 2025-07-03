import './Myform.css'

import { useState } from 'react'
import { useFetch } from '../hooks/useFetch';

const url = 'http://localhost:5000/products';


const Myform = () => {

    //custom hook para buscar dados
    const {data: items, httpConfig, loading} = useFetch(url);   
    //const [products, setProducts] = useState([]) 

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    //useEffect(() => {
       // const fetchProducts = async () => {
         //   try {
          //      const response = await fetch(url)
           //     const data = await response.json()
            //    setProducts(data)
           // } catch (error) {
          //      console.error('Error fetching products:', error)
           // }
      //  }

       // fetchProducts()
    //}, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const product = { name, price };

        //const res = await fetch(url, {
           // method: 'POST',
            //headers: {
            //    'Content-Type': 'application/json'
           // },
           /// body: JSON.stringify(product)
       // })

        //Carregamento dinâmico de produtos

        httpConfig(product, 'POST');
        //const addedProduct = await res.json();
        //setProducts((prevProducts) => [...prevProducts, addedProduct]);

        setName('');
        setPrice('');
    }



    return (
        <div className='app'>
            <div className='product-list'>
                <h1>Lista de Produtos</h1>
                {/*Loading state*/}
                {loading && <p>Carregando produtos...</p>}
                <ul>
                    {items && items .map(product => (
                        <li key={product.id}>
                            {product.name} - R$: {product.price}
                        </li>
                    ))}
                </ul>
            </div>
            <div className='add-product'>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nome:
                        <input type="text" value={name} name="name" onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label>
                        Preço:
                        <input type="number" value={price} name="price" onChange={(e) => setPrice(e.target.value)} />
                    </label>
                    <input type="submit" value="Adicionar Produto" />
                </form>
            </div>
        </div>
    )
}

export default Myform
// This is a simple form component in React that includes fields for name, email, and message.