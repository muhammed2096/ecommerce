import express from "express"
import { validation } from "../../middleware/validation.js"
import { uploadFields } from "../../utilties/fileUpload.js"
import { addProduct, deleteProduct, getAllProductById, getAllProducts, updateProduct } from "./controller/product.controller.js"
import { addProductSchema, deleteProductSchema, getProductByIdSchema, updateProductSchema } from "./controller/product.validator.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"


const productRoutes = express.Router()

productRoutes.route("/")
    .post(protectedRoutes, allowedTo("admin"),uploadFields([{name:"imageCover", maxCount:1}, {name:"images", maxCount:10}]), validation(addProductSchema), addProduct)
    .get(getAllProducts)

    productRoutes.route("/:id")
    .get(protectedRoutes, allowedTo("admin"),validation(getProductByIdSchema), getAllProductById)
    .patch(protectedRoutes, allowedTo("admin"),uploadFields([{name:"imageCover", maxCount:1}, {name:"images", maxCount:10}]), validation(updateProductSchema), updateProduct)
    .delete(protectedRoutes, allowedTo("admin"),validation(deleteProductSchema), deleteProduct)    

export default productRoutes