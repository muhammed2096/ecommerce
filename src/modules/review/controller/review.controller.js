

import { handleAsyncError } from "../../../middleware/handleAsyncError.js";
import { appError } from "../../../utilties/appError.js";
import { deleteOne } from "../../handler/apiHandler.js";
import { apiFeatures } from "../../../utilties/apiFeature.js";
import reviewModel from "../../../../database/models/reviews.model.js";




const addReview = handleAsyncError(async (req, res)=>{
    req.body.user = req.user._id
    let isReviewExist = await reviewModel.findOne({user:req.user._id, product:req.body.product})
    if(isReviewExist) next(new appError('you have wrote already a review :)'))
    let preReview = new reviewModel(req.body);
    let addedReview = await preReview.save()
    res.json({message:"Success", addedReview})
})

const getAllReview = handleAsyncError(async (req, res)=>{
    let features = new apiFeatures(reviewModel.find({}), req.query).pagination().filter().sort().fields().keyword()
    let allReview = await features.mongooseQuery
    res.json({message:"Success",page:features.pageNumber, allReview})
})

const getAllReviewById = handleAsyncError(async (req, res)=>{
    let review = await reviewModel.findById(req.params.id);
    res.json({message:"Success", review})
})

const updateReview = handleAsyncError(async (req, res)=>{
    let updatedReview = await reviewModel.findOneAndUpdate({_id:req.params.id, user:req.user._id}, req.body, {new:true})
    updatedReview && res.json({message:"Success", updatedReview})
    !updatedReview && next(new appError("Review not found ! :(", 401))   
}
)

const deleteReview = deleteOne(reviewModel)

export {
    addReview,
    getAllReview,
    getAllReviewById,
    updateReview,
    deleteReview 
}