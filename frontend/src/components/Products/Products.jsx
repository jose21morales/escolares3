import style from './Products.module.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Products({ addToCart }) {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const fetchProducts = async ()=>{
            try {
                const response = await axios.get('http://localhost:5000/api/auth/products')
                setProducts(response.data)
            } catch (error) {
                console.error('Error fetching products ' + error)
            }
        }
        fetchProducts()
    },[])

    const toStartCase = (string)=>{
        return string
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
    }

    return (
        <div>
            <h1><b>Los productos más vendidos</b></h1>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {products.map((product) => (

                    <div className="col" key={product.product_id}>
                        <div className={style.card}>
                            <a href="/">
                                <img className="card-img-top" src={`/img/${product.img}`} alt={`/img/${product.img}`} width='300' />
                            </a>
                            <div className="card-body">
                                <a href="/">
                                    <p className="card-title"><b>{toStartCase(product.productname)}</b></p>
                                </a>
                                <p className="card-text">${product.price}.00</p>
                        
                                <button onClick={() => addToCart(product.product_id, product.img, product.productname, product.price)} className="btn btn-primary" name="btnAdd" value="Agregar" type="submit">Agregar al carrito</button>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
            <br /><br />
        </div>
    );
};