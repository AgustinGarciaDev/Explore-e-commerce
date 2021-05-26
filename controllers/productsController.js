const Product = require("../models/Product")

const getAllProducts = async (req,res)=>{

    try {
        const result = await Product.find()
        res.json({ success:true, result })
    } catch (error) {
        res.json({ success:false, err: "An error has occurred on our server" })
    }
}
const getProductById = async (req,res)=>{
    const{ id } = req.params
    try {
        const result = await Product.findById( id )
        res.json({ success:true, result })
    } catch (error) {
        res.json({ success:false, err: "An error has occurred on our server" })
    }
}

const postProduct = async (req,res)=>{

    try {
        const result = await new Product( req.body ).save()
        res.json({ success:true, result })
    } catch (error) {
        console.log( error )
        res.json({ success:false, err: "An error has occurred on our server" })
    }
}

const deleteProduct = async (req,res ) =>{
    const { id } = req.params

    try {
        const result = await Product.findByIdAndDelete( id )
        res.json({ success:true, result })   
    } catch (error) {
        res.json({ success:false, err: "An error has occurred on our server" })
    }
}

const updateProduct = async (req,res)=>{
    const { id } = req.params

    try {
        const result = await Product.findByIdAndUpdate( id, req.body,{ new:true } )
        res.json({ success:true, result })   
    } catch (error) {
        res.json({ success:false, err: "An error has occurred on our server" })
    }
}

module.exports ={
    getAllProducts,
    getProductById,
    postProduct,
    deleteProduct,
    updateProduct
}