
import slugify from "slugify";
import { handleAsyncError } from "../../../middleware/handleAsyncError.js";
import { appError } from "../../../utilties/appError.js";
import productModel from "../../../../database/models/product.model.js";
import { deleteOne } from "../../handler/apiHandler.js";
import { apiFeatures } from "../../../utilties/apiFeature.js";






const addProduct = handleAsyncError(async (req, res)=>{
    req.body.slug = slugify(req.body.title)
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map(ele => ele.filename)
    let preProduct = new productModel(req.body);
    let added = await preProduct.save()
    res.json({message:"Success", added})
})

const getAllProducts = handleAsyncError(async (req, res, next)=>{
    let features = new apiFeatures(productModel.find(), req.query).pagination().filter().sort().fields().keyword()
    let products = await features.mongooseQuery
    res.json({message:"Success",page:features.pageNumber, products})
}) 

const getAllProductById = handleAsyncError(async (req, res)=>{
    let product = await productModel.findById(req.params.id);
    res.json({message:"Success", product})
})

const updateProduct = handleAsyncError(async (req, res)=>{
    req.body.slug = slugify(req.body.title)
    if(req.files.imageCover) req.body.imageCover = req.files.imageCover[0].filename;
    if(req.files.images) req.body.images = req.files.images.map(ele => ele.filename);
    let updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    updatedProduct && res.json({message:"Success", updatedProduct})
    !updatedProduct && next(new appError("Product not found ! :(", 401))   
}
)

const deleteProduct = deleteOne(productModel)

export {
    addProduct,
    getAllProducts,
    getAllProductById,
    updateProduct,
    deleteProduct 
}