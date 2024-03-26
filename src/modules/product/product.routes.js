import express from "express"
import { validation } from "../../middleware/validation.js"
import { uploadFields } from "../../utilties/fileUpload.js"
import { addProduct, deleteProduct, getAllProductById, getAllProducts, updateProduct } from "./controller/product.controller.js"
import { addProductSchema, deleteProductSchema, getProductByIdSchema, updateProductSchema } from "./controller/product.validator.js"


const productRoutes = express.Router()

productRoutes.route("/")
    .post(uploadFields([{name:"imageCover", maxCount:1}, {name:"images", maxCount:10}]), validation(addProductSchema), addProduct)
    .get(getAllProducts)

    productRoutes.route("/:id")
    .get(validation(getProductByIdSchema), getAllProductById)
    .patch(uploadFields([{name:"imageCover", maxCount:1}, {name:"images", maxCount:10}]), validation(updateProductSchema), updateProduct)
    .delete(validation(deleteProductSchema), deleteProduct)    

export default productRoutes