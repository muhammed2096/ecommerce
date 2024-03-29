import { couponModel } from '../../../../database/models/coupon.model.js';
import { catchError } from '../../../middleware/catchError.js'
import { apiFeatures } from '../../../utilties/apiFeature.js';
import { appError } from '../../../utilties/appError.js';
import { deleteOne } from '../../handler/apiHandler.js';

const addCoupon = catchError(async (req, res, next) => {
    let isCouponExist = await couponModel.findOne({ code: req.body.code })
    console.log(isCouponExist);
    if (isCouponExist) return next(new AppError('you are created Coupon before', 409))
    let Coupon = new couponModel(req.body)
    await Coupon.save()
    !Coupon && next(new appError('invalid data', 404))
    Coupon && res.send({ msg: 'success', Coupon })
})


const getAllCoupon = catchError(async (req, res, next) => {
    let apiFeature = new apiFeatures(couponModel.find({}), req.query).fields().pagenation().sort().filter().search()
    let coupon = await apiFeature.mongoseQuery
    !coupon && next(new appError('coupon not found', 404))
    coupon && res.send({ msg: 'success', page: apiFeature.pageNumber, coupon })
})

const getSingleCoupon = catchError(async (req, res, next) => {
    let coupon = await couponModel.findById(req.params.id)
    !coupon && next(new appError('coupon not found', 404))
    coupon && res.send({ msg: 'success', coupon })
})
const updateCoupon = catchError(async (req, res, next) => {
    let coupon = await couponModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !coupon && next(new appError('coupon not found', 404))
    coupon && res.send({ msg: 'success', coupon })
})
const deleteCoupon = deleteOne(couponModel)

export {
    addCoupon,
    getAllCoupon,
    updateCoupon,
    getSingleCoupon,
    deleteCoupon
}