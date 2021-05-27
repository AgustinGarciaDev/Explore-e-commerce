const Product = require("../models/Product")

const getAllProducts = async (req, res) => {

    try {
        const result = await Product.find()
            .populate({ path: "comments", populate: { path: "userId", select: { "_id": 1, "user": 1, "urlImg": 1 } } })
            .populate({ path: "scores", populate: { path: "userId", select: { "_id": 1, "user": 1, "urlImg": 1 } } })

        res.json({ success: true, result })
    } catch (error) {
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}
const getProductById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await Product.findById(id)
        res.json({ success: true, result })
    } catch (error) {
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}

const postProduct = async (req, res) => {
    try {
        const result = await new Product(req.body).save()
        res.json({ success: true, result })
    } catch (error) {
        console.log(error)
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params

    try {
        const result = await Product.findByIdAndDelete(id)
        res.json({ success: true, result })
    } catch (error) {
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params

    try {
        const result = await Product.findByIdAndUpdate(id, req.body, { new: true })
        res.json({ success: true, result })
    } catch (error) {
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}

/*---------------- Comments ----------------------- */

const postComment = async (req, res) => {
    const { idProduct } = req.params

    try {
        const result = await Product.findByIdAndUpdate(idProduct, { $push: { comments: req.body } }, { new: true })
            .populate({ path: "comments", populate: { path: "userId", select: { "_id": 1, "user": 1, "urlImg": 1 } } })

        res.json({ success: true, result })
    } catch (error) {
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}

const deleteComment = async (req, res) => {
    const { idProduct, idComment } = req.params

    try {
        const result = await Product.findByIdAndUpdate(idProduct, { $pull: { comments: { _id: idComment } } }, { new: true })
            .populate({ path: "comments", populate: { path: "userId", select: { "_id": 1, "user": 1, "urlImg": 1 } } })

        res.json({ success: true, result })
    } catch (error) {
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}

const putComment = async (req, res) => {
    const { idProduct, idComment } = req.params
    const { comment } = req.body

    try {
        const result = await Product.findOneAndUpdate({ "_id": idProduct, "comments._id": idComment }, { $set: { "comments.$.comment": comment } }, { new: true })
            .populate({ path: "comments", populate: { path: "userId", select: { "_id": 1, "user": 1, "urlImg": 1 } } })

        res.json({ success: true, result })
    } catch (error) {
        console.log(error)
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}

/* -------------------Score----------------------------------------------------- */

const postScore = async (req, res) => {
    const { idProduct } = req.params

    try {
        const result = await Product.findByIdAndUpdate(idProduct, { $push: { scores: req.body } }, { new: true })
            .populate({ path: "scores", populate: { path: "userId", select: { "_id": 1, "user": 1, "urlImg": 1 } } })

        res.json({ success: true, result })
    } catch (error) {
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}

const deleteScore = async (req, res) => {
    const { idProduct, idScore } = req.params

    try {
        const result = await Product.findByIdAndUpdate(idProduct, { $pull: { scores: { _id: idScore } } }, { new: true })
            .populate({ path: "scores", populate: { path: "userId", select: { "_id": 1, "user": 1, "urlImg": 1 } } })

        res.json({ success: true, result })
    } catch (error) {
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}

const putScore = async (req, res) => {
    const { idProduct, idScore } = req.params
    const { score } = req.body

    try {
        const result = await Product.findOneAndUpdate({ "_id": idProduct, "scores._id": idScore }, { $set: { "scores.$.score": score } }, { new: true })
            .populate({ path: "scores", populate: { path: "userId", select: { "_id": 1, "user": 1, "urlImg": 1 } } })

        res.json({ success: true, result })
    } catch (error) {
        console.log(error)
        res.json({ success: false, err: "An error has occurred on our server" })
    }
}


module.exports = {
    getAllProducts,
    getProductById,
    postProduct,
    deleteProduct,
    updateProduct,
    postComment,
    deleteComment,
    putComment,
    postScore,
    deleteScore,
    putScore
}