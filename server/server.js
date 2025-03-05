const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 30,
        httpOnly: true,
        // I had session problems so i better remove sameSite
        // When reloading the page the session was deleted
        
        /* sameSite: 'lax', // More reliable than 'none' */
        secure: false // Must be `true` in production (if using HTTPS)
    }
}))

app.use(cors({
    origin:'http://localhost:8888',
    credentials: true,
    methods: ['GET','POST'],
    allowedHeaders: ['Content-Type','Authorization']
}));
app.use(bodyParser.json());

const db = require('./config/db');
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL connected');
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
