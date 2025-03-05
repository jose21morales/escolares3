import Banner from '../Banner/Banner.jsx';
import Products from '../Products/Products.jsx';
import Footer from '../Footer/Footer.jsx';
import axios from 'axios';

export default function Home({ searchResults }) {

    const addToCart = async (productId, productImg, productName, productPrice)=>{
        try {
            const res= await axios.post('http://localhost:5000/api/auth/cart/add',{
            productId,
            productImg,
            productName,
            productPrice,
            quantity: 1
        })
        if (res) {
            alert('Producto agregado al carrito')
        }
        } catch (error) {
            console.error('Error al gregar al carrito: ', error)
        }
    }
    const toStartCase = (string)=>{
        return string
        .split(" ")
        .map((word)=>word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
    }
    return (
        <div>
            <Banner />
            {searchResults.length > 0 ? (
                <div>
                        <h2>Resultados:</h2>
                        <ul>
                            {searchResults.map((product)=>(
                                <li key={product.product_id}>
                                    <div>
                                        <img src={`img/${product.img}`} alt="" />
                                        <p>{toStartCase(product.productname)}</p>
                                        <p>${product.price.toFixed(2)}</p>
                                        <button onClick={()=>addToCart(product.product_id, product.img, product.productname, product.price)}>Agregar al carrito</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                </div>
            ) : (
                <Products addToCart={addToCart} />
            )}
            <Footer />
        </div>
    );

}