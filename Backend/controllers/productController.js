const asyncHandler = require('express-async-handler')
const Product = require('../model/productModel')

const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({})
    res.json(products) 
})

const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
        if(product) res.send(product) 
        else {
            res.status(404)
            throw new Error('Product not Found')
        }
}) 

module.exports = { getProductById, getProducts }