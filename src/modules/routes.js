import { globalError } from "../utilties/globalError.js";
import addressRouter from "./address/address.routes.js";
import authRouter from "./auth/auth.routes.js";
import brandRouter from "./brand/brand.routes.js";
import cartRouter from "./cart/cart.routes.js";
import categoryRouter from "./category/category.routes.js";
import couponRouter from "./coupon/coupon.routes.js";
import orderRouter from "./order/order.routes.js";
import productRouter from "./product/product.routes.js";
import reviewRouter from "./review/review.routes.js";
import subCategoryRouter from "./subCategory/subCategory.routes.js";
import userRouter from "./user/user.routes.js";
import wishListRouter from "./wishList/wishList.routes.js";



export const bootstrab = (app)=>{
    app.use('/api/v1/categories',categoryRouter)
    app.use('/api/v1/subCategories',subCategoryRouter)
    app.use('/api/v1/brand',brandRouter)
    app.use('/api/v1/product',productRouter)
    app.use('/api/v1/user',userRouter)
    app.use('/api/v1',authRouter)
    app.use('/api/v1/review',reviewRouter)
    app.use('/api/v1/wishList',wishListRouter)
    app.use('/api/v1/address',addressRouter)
    app.use('/api/v1/coupon',couponRouter)
    app.use('/api/v1/cart',cartRouter)
    app.use('/api/v1/order',orderRouter)
    app.use(globalError)
} 