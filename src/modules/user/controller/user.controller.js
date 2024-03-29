import { userModel } from '../../../../database/models/user.model.js'
import { catchError } from '../../../middleware/catchError.js'
import { apiFeatures } from '../../../utilties/apiFeature.js'
import { appError } from '../../../utilties/appError.js'



const addUser = catchError(async (req, res, next) => {
    let user = new userModel(req.body)
    await user.save()
    !user && next(new appError('invalid data', 404))
    user && res.send({ msg: 'success', user: { name: user.name, email: user.email } })
})
const updateUser = catchError(async (req, res, next) => {
    let { name, role } = req.body
    let updateUser = await userModel.findByIdAndUpdate(req.user._id, { name, role }, { new: true })
    console.log(updateUser);
    res.send({ msg: "success", updateUser })
})

const deleteUser = catchError(async (req, res, next) => {
    await userModel.findByIdAndDelete(req.user._id)
    res.send({ msg: "success" })
})

const getUsers = catchError(async (req, res, next) => {
    let apiFeature = new apiFeatures(userModel.find(), req.query)
        .pagenation().fields().search('name','email').sort().filter()
    let users = await apiFeature.mongoseQuery
    res.send({ msg: "success", pageNumber: apiFeature.pageNumber, users })
})

const getSingleUser = catchError(async (req, res, next) => {
    let user = await userModel.findById(req.params.id)
    res.send({ msg: "success", user })
})



export {
    addUser,
    updateUser,
    deleteUser,
    getUsers,
    getSingleUser
}