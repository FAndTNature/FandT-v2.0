const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

const connectDB = require('./config/db.js')
const productRoutes = require('./routes/productRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const orderRoutes = require('./routes/orderRoutes.js')
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js')

const app = express()
app.use(express.json())
dotenv.config()
connectDB()

const port = process.env.PORT || 5000

app.use(cors())
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)


app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_ID))


if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile('/app/frontend/build/index.html')
    })
}
else {
    app.get('/', (res, req) => res.send('API UP'))
}

app.use(notFound)
app.use(errorHandler)


app.listen(port, () => console.log(`listening on ${port}`))
