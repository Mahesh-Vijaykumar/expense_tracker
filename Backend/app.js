const express = require('express');
const cors = require('cors');
const app = express();

require("dotenv").config()
const { db } = require('./db/db');
const{readdirSync} = require('fs');

const PORT=process.env.PORT || 5000

//Middlewares
app.use(express.json());
// CORS configuration
const allowedOrigins = process.env.FRONTEND_URL 
    ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
    : ['*'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, true); // Allow all for now, can restrict later
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//Routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

// Auth routes
app.use('/api/v1/auth', require('./routes/auth'));


app.get('/', (req, res) => {
    res.send('Hello World')
})

const server=()=>{
    db()
    app.listen(PORT, ()=>{
        console.log(`Server started on port ${PORT}`);
    })
}

server()