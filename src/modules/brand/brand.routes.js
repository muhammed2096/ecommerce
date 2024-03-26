import express from "express"
import { validation } from "../../middleware/validation.js"
import { uploadSingle } from "../../utilties/fileUpload.js"
import { addBrand, deleteBrand, getAllBrandById, getAllBrands, updateBrand } from "./controller/brand.controller.js"
import { addBrandSchema, deleteBrandSchema, getBrandByIdSchema, updateBrandSchema } from "./controller/brand.validator.js"

const brandRoutes = express.Router()

brandRoutes.route("/")
    .post(uploadSingle('image'), validation(addBrandSchema), addBrand)
    .get(getAllBrands)

    brandRoutes.route("/:id")
    .get(validation(getBrandByIdSchema), getAllBrandById)
    .patch(validation(updateBrandSchema), updateBrand)
    .delete(validation(deleteBrandSchema), deleteBrand)    

export default brandRoutes