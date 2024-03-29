
import { productModel } from '../../../../database/models/product.model.js';
import { reviewModel } from '../../../../database/models/reviews.model.js';
import { catchError } from '../../../middleware/catchError.js'
import { apiFeatures } from '../../../utilties/apiFeature.js';
import { appError } from '../../../utilties/appError.js';



const addReview = catchError(async (req, res, next) => {
    let product = await productModel.findById(req.body.product)
    if (!product) return next(new appError('product not founded', 404))

    product.rateCount += 1;
    if (product.rateCount !== 0) {
        if (product.rateCount === 1) {
            // If it's the first rating, set rateAvg to the new rating directly
            product.rateAvg = req.body.rate;
        } else {
            // Update rateAvg based on the existing average and the new rating
            product.rateAvg = (product.rateAvg * (product.rateCount - 1) + req.body.rate) / product.rateCount;
        }
        await product.save();
    } else {
        console.error("rateCount should not be zero");
    }

    req.body.user = req.user._id
    let isReviewExist = await reviewModel.findOne({ user: req.user._id, product: req.body.product })
    if (isReviewExist) return next(new appError('you are created Review before', 409))
    let review = new reviewModel(req.body)
    await review.save()
    !review && next(new appError('invalid data', 404))
    review && res.send({ msg: 'success', review })
})


const getAllreview = catchError(async (req, res, next) => {
    let apiFeature = new apiFeatures(reviewModel.find({}), req.query).fields().pagenation().sort().filter().search('text')
    let review = await apiFeature.mongoseQuery
    !review && next(new appError('review not found', 404))
    review && res.send({ msg: 'success', page: apiFeature.pageNumber, review })
})

const getSinglereview = catchError(async (req, res, next) => {
    let review = await reviewModel.findById(req.params.id)
    !review && next(new appError('review not found', 404))
    review && res.send({ msg: 'success', review })
})
const updateReview = catchError(async (req, res, next) => {
    let review = await reviewModel.findOneAndUpdate({ user: req.user._id, _id: req.params.id }, req.body, { new: true })
    !review && next(new appError('review not found', 404))
    review && res.send({ msg: 'success', review })
})
const deleteReview = catchError(async (req, res, next) => {
    const review = await reviewModel.findByIdAndDelete(req.params.id)
    !review && next(new appError('review not found', 404))
    review && res.send({ msg: 'success' })
})

export {
    addReview,
    getAllreview,
    updateReview,
    getSinglereview,
    deleteReview
}