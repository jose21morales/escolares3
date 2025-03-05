const searchBar = require('../models/search')

exports.search = (req,res)=>{
    const searchQuery = req.query.q
    searchBar.searchProducts(searchQuery, (err,results)=>{
        if (err) {
            console.error(err)
            return res.status(500).json({message: 'Error fetching products'})
        }
        res.json(results)
    })
}