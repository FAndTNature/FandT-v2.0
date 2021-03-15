const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const app = express()
app.use(express.json())
dotenv.config()
connectDB()

const port = process.env.PORT || 6000

app.use(cors())
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)


app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_ID))

__dirname = path.resolve()
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}
else {
    app.get('/', (req, res) => { res.send('API is Up....') })
}

app.use(notFound)
app.use(errorHandler)


app.listen(port, () => console.log(`listening on ${port}`))
