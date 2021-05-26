


























const { getAllProducts, getProductById, postProduct, deleteProduct, updateProduct } = require("../controllers/productsController")


router.route("/products")
.get( getAllProducts )
.post( postProduct )

router.route("/products/:id")
.get( getProductById )
.delete( deleteProduct )
.put( updateProduct )
