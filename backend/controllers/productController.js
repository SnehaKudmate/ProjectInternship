const { Product } = require("../models/ProductModel");

const createProduct = async(req, res)=>{
  const product = new Product(req.body);
  product.discountPrice = Math.round(product.price*(1-product.discountPercentage/100))
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};


const getProduct = async (req, res) => {
    
    let condition = {}
  
    if(!req.query.admin){
      condition.deleted = {$ne:true}
    }

    let query = Product.find(condition);
    let totalProductsQuery = Product.find(condition);
  

  
    
   
   
  
    const totalDocs = await totalProductsQuery.count().exec();
    console.log({ totalDocs });
  
    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
  
    try {
      const docs = await query.exec();
      res.status(200).json({docs,totalDocs});
    } catch (err) {
      res.status(400).json(err);
    }
  };


  const getProductDetail = async(req,res)=>{
  try {
    const productDetails = await Product.findById(req.params.id);
    res.status(200).json(productDetails);
  } catch (error) {
    res.status(400).json(error)
  }
  }
  
  const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {new:true});
      product.discountPrice = Math.round(product.price*(1-product.discountPercentage/100))
      const updatedProduct = await product.save()
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(400).json(err);
    }
  };
    
module.exports = {createProduct,getProduct,getProductDetail,updateProduct};
