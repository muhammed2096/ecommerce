

import { handleAsyncError } from "../../../middleware/handleAsyncError.js";
import { appError } from "../../../utilties/appError.js";
import { deleteOne } from "../../handler/apiHandler.js";
import { apiFeatures } from "../../../utilties/apiFeature.js";
import couponModel from "../../../../database/models/coupon.model.js";

const addCoupon = handleAsyncError(async (req, res, next)=>{
    let isCouponExist = await couponModel.findOne({ code:req.body.code })
    if(isCouponExist) next(new appError('Coupon is exist :)'))
    let preCoupon = new couponModel(req.body);
    let addedCoupon = await preCoupon.save()
    res.json({message:"Success", addedCoupon})
})

const getAllCoupon = handleAsyncError(async (req, res, next)=>{
    let features = new apiFeatures(couponModel.find({}), req.query).pagination().filter().sort().fields().keyword()
    let allCoupon = await features.mongooseQuery
    res.json({message:"Success",page:features.pageNumber, allCoupon})
})

const getCouponById = handleAsyncError(async (req, res, next)=>{
    let coupon = await couponModel.findById(req.params.id);
    let url = await QRCode.toDataURL(coupon.code)
    res.json({message:"Success", coupon, url})
})

const updateCoupon = handleAsyncError(async (req, res, next)=>{
    let updatedCoupon = await couponModel.findOneAndUpdate({_id:req.params.id, user:req.user._id}, req.body, {new:true})
    updatedCoupon && res.json({message:"Success", updatedCoupon})
    !updatedCoupon && next(new appError("Coupon not found ! :(", 401))   
}
)

const deleteCoupon = deleteOne(couponModel)

export {
    addCoupon,
    getAllCoupon,
    getCouponById,
    updateCoupon,
    deleteCoupon 
}