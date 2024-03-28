import express from "express"
import { validation } from "../../middleware/validation.js"
import { uploadSingle } from "../../utilties/fileUpload.js"
import { addBrand, deleteBrand, getAllBrandById, getAllBrands, updateBrand } from "./controller/brand.controller.js"
import { addBrandSchema, deleteBrandSchema, getBrandByIdSchema, updateBrandSchema } from "./controller/brand.validator.js"
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js"

const brandRoutes = express.Router()

brandRoutes.route("/")
    .post(protectedRoutes, allowedTo("admin"),uploadSingle('image'), validation(addBrandSchema), addBrand)
    .get(protectedRoutes,allowedTo("admin"),getAllBrands)

    brandRoutes.route("/:id")
    .get(protectedRoutes,allowedTo("admin"),validation(getBrandByIdSchema), getAllBrandById)
    .patch(protectedRoutes,allowedTo("admin"),validation(updateBrandSchema), updateBrand)
    .delete(protectedRoutes,allowedTo("admin"),validation(deleteBrandSchema), deleteBrand)    

export default brandRoutes