
import { userModel } from '../../../../database/models/user.model.js'
import { catchError } from '../../../middleware/catchError.js'
import { appError } from '../../../utilties/appError.js'


const addAddress = catchError(async (req, res, next) => {
    let address = await userModel.findByIdAndUpdate(req.user._id, { $addToSet: { address: req.body } }, { new: true })
    !address && next(new appError('address not found', 404))
    address && res.send({ msg: 'success', address: address.address })
})
const removeAddress = catchError(async (req, res, next) => {
    let address = await userModel.findByIdAndUpdate(req.user._id, { $pull: { address: { _id: req.params.id } } }, { new: true })
    !address && next(new appError('Addrxess not found', 404))
    address && res.send({ msg: 'success', address: address.address })
})
const getLoggedAddress = catchError(async (req, res, next) => {
    let { address } = await userModel.findById(req.user._id)
    address && res.send({ msg: 'success', address })
})



export {
    addAddress,
    removeAddress,
    getLoggedAddress
}