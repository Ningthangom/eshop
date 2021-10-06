
const express = require('express');

const router = express.Router();

// Product is imported as object because of the way it's exported: exports.Product
const {Product} = require('../models/products')
const {Category} = require('../models/category')
const mongoose = require('mongoose');


require('dotenv/config');

// express methods: get, post, put, delete



// without using async this get method returns error
// the data might not be ready yet
//get all the products 
router.get(`/` , async (req, res) => {
    // how to put items in the same category
    //localhost:3000/api/v1/products?categories= 121234,533232
        let filter = {};
        if(req.query.categories) {
            filter ={category: req.query.categories.split(',')}
            console.log('filter is run')
        }
    const productList = await Product.find(filter).populate('category');
    if(!productList){
        res.status(500).json({success: false})
    }
     res.send(productList);
})


//get a single product 
router.get(`/:id` , async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');
    if(!product) {
        return res.status(500).json({success: false, message:"product does not exist"})
    }
    res.send(product);
})


// create a new product
 router.post(`/` , async (req, res) => {

// checking if the category exists
 const category = await Category.findById(req.body.category)
 if(!category) {
     return res.status(404).json({success:false, message:"invalid category"})
 }
 let product = new Product({
    name: req.body.name,
    image: req.body.image,
    description:req.body.description,
    richDescription:req.body.richDescription,
    brand: req.body.brand,
    price:req.body.price,
    category: req.body.category,
    countInStock:req.body.countInStock,
    rating:req.body.rating,
    numReview:req.body.numReview,
    isFeatured:req.body.isFeatured,
 })
 product = await product.save()
 if(!product) {
     return res.status(500).json({success:false, message:"product cannot be created"})
 }
 res.send(product)
}) 


// update a product 
router.put('/:id', async(req, res) =>{
    // check if the id is a valid mongo id 
   if(!mongoose.isValidObjectId(req.params.id)){
    return res.status(400).json({success: false, message:"invalid product id"})
}
    const category = await Category.findById(req.body.category)
    if(!category) {
        return res.status(404).json({success:false, message:"invalid category"})
    }
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
                name: req.body.name,
                image: req.body.image,
                description:req.body.description,
                richDescription:req.body.richDescription,
                brand: req.body.brand,
                price:req.body.price,
                category: req.body.category,
                countInStock:req.body.countInStock,
                rating:req.body.rating,
                numReview:req.body.numReview,
                isFeatured:req.body.isFeatured,
        },
        // this will return new data instead of the old one
        {new: true}
    ).populate('category')
    if(!product) {
        return res.status(500).json({success:false, message: 'product coud not be updated'})
    }
          
    res.send(product)
    
})


// delete product 
router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id)
    .then(product => {
        if(product) {
            return res.status(200).json({success: true, message: 'the product is deleted'})
        }else{
            return res.status(404).json({success:false, message: "product could not be found"})
        }
    })
    .catch((err) => {
        return res.status(400).json({success: false, error: err})
    })
})

// get product count
router.get(`/get/product_count` , async (req, res) => {
    const productCount = await Product.countDocuments();
    if(!productCount) {
        return res.status(500).json({success: false, message:"product does not exist"})
    }
    res.send({ 
        totalProduct: productCount
    });
})


//featured
router.get(`/get/featured/:count` , async (req, res) => {
    // this count will limit how many featured product to be displayed
    const count = req.params.count ? req.params.count:0
    // as count is returning string value we need to make sure count is numeric 
    // by adding + sign in front of count
    const productFeatured = await Product.find({isFeatured: true}).limit(+count);
    if(!productFeatured) {
        return res.status(500).json({success: false, message:"featured product does not exist"})
    }
    res.send(productFeatured);
})

module.exports  = router;  
