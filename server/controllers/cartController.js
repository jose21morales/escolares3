let cart = []

exports.addToCart = (req, res)=>{
    const { productId, productImg, productName, productPrice, quantity } = req.body

    const existingProduct = cart.find((item) => item.productId === productId)
    if (existingProduct) {
        existingProduct.quantity += quantity
    } else {
        cart.push({productId, productImg, productName, productPrice, quantity})
    }
    res.status(200).json({message: 'Producto agregado al carrito',cart})
}

exports.getCart = (req,res)=>{
    res.status(200).json(cart)
}

exports.removeFromCart = (req,res)=>{
    const { productId } = req.body

    cart = cart.filter((item) => item.productId !== productId)
    res.status(200).json({message: 'Producto eliminado del carrito', cart})
}

exports.updateCartItemQuantity = (req,res)=>{
    const { id, updateQuantity } = req.body
    cart = cart.filter((item)=> item.productId === id ? item.quantity = updateQuantity : item)
    res.status(200).json({message: 'Cantidad actualizada', cart})
}