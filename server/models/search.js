const conn = require('../config/db')

const search = {
    searchProducts: (searchQuery, callback)=>{
        const sql = "SELECT * FROM products WHERE productname LIKE ?"
        conn.query(sql,[`%${searchQuery}%`],callback)
    }
}
module.exports = search