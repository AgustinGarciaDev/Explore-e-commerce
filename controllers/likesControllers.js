const Product = require('../models/Product')
const User = require('../models/User')

const likesControllers = {
    likear: async (req,res) => {
        const id = req.params.id
        const idUser = req.user._id

        
        var response;
        var err;

        const UserId = await User.findOne({_id: idUser})
        const articleLiked = await Product.findOne({_id: id , userLiked: UserId._id})

        try {
            if (articleLiked) {
                const likeArticle = await User.findOneAndUpdate({ _id: id },{ $pull: { whishList: UserId._id}},{new:true})
                likeItinerario.save()
                response = likeArticle
            } else {
                const likeArticle = await User.findOneAndUpdate({ _id: id },{ $push: { whishList: UserId._id}},{new:true})
                likeItinerario.save()
                response = likeArticle
            }
        } catch(err) {
            err = err
        }

        res.json({
            success: !err ? true : false,
            response: !err && response,
            error: err
        })
    },
}


module.exports = likesControllers