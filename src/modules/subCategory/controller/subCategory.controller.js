
import slugify from "slugify"
import { catchError } from './../../../middleware/catchError.js'
import { subCategoryModel } from "../../../../database/models/subCategory.model.js"
import { appError } from "../../../utilties/appError.js"
import { apiFeatures } from "../../../utilties/apiFeature.js"

const addSubCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let subCategory = new subCategoryModel(req.body)
    await subCategory.save()
    !subCategory && next(new appError('invalid data', 404))
    subCategory && res.send({ msg: 'success', subCategory })
})
const getAllSubCategory = catchError(async (req, res, next) => {
    let filterObject = {}
    if (req.params.category) {
        filterObject.category = req.params.category
    }
    let apiFeature = new apiFeatures(subCategoryModel.find(filterObject), req.query).fields().pagenation().sort().filter().search('name')
    let subCategory = await apiFeature.mongoseQuery
    !subCategory && next(new appError('subCategory not found', 404))
    subCategory && res.send({ msg: 'success', page: apiFeature.pageNumber, subCategory })
})

const getSingleSubCategory = catchError(async (req, res, next) => {
    let subCategory = await subCategoryModel.findById(req.params.id)
    !subCategory && next(new appError('subCategory not found', 404))
    subCategory && res.send({ msg: 'success', subCategory })
})
const updateSubCategory = catchError(async (req, res, next) => {
    console.log(req.file);
    if (req.body.name) req.body.slug = slugify(req.body.name)
    let subCategory = await subCategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !subCategory && next(new appError('SubCategory not found', 404))
    subCategory && res.send({ msg: 'success', subCategory })
})
const deleteSubCategory = catchError(async (req, res, next) => {
    const subCategory = await subCategoryModel.findByIdAndDelete(req.params.id)
    !subCategory && next(new appError('subCategory not found', 404))
    subCategory && res.send({ msg: 'success' })
})

export {
    addSubCategory,
    getAllSubCategory,
    updateSubCategory,
    getSingleSubCategory,
    deleteSubCategory
}