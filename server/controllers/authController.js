const jwt = require('jsonwebtoken');
const User = require('../models/User');
const products = require('../models/products')

exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            console.log('No user')
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (!isMatch) {
                res.status(401).json({ message: 'Invalid username or password' });
            }else{
                req.session.user = { username }
                res.status(200).json({ message: 'Login successful',user: req.session.user });
            }
        });
    });
};

exports.register = (req, res) => {
    const { name, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({message: 'Las contraseñas no coinciden'})
    }

    User.create({ name, lastName, email, password }, (err, results) => {
        if (err) throw err;

        res.status(201).json({ message: 'User registered successfully' });
    });
};
exports.session = (req,res)=>{
    if (req.session.user) {
        res.status(200).json({user: req.session.user})
    } else {
        res.status(401).json({message: 'Not autheticated'})
    }
}
exports.logout = (req,res)=>{
    req.session.destroy((err)=>{
        if (err) {
            return res.status(500).json({message: 'Invalid logout'})
        }
        res.clearCookie('connect.sid')
        res.status(200).json({message: 'Logout session successfully'})
    })
}
exports.products = (req,res)=>{
    products.product((err, results)=>{
        if (err) {
            console.log(err)
            res.status(500).json({message: 'Error received products'})
            return
        }
        res.json(results)
    })
}