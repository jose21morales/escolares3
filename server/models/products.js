const conn = require('../config/db')

const products = {
    product: (callback)=>{
        const sql = "SELECT * FROM products"
        conn.query(sql, callback)
    }
}

module.exports = products