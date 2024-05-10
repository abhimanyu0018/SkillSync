import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";


const requireAuth = async (req,res,next) => {

    //verify authorization
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error : 'Authentication token is required'})
    }

    const token = authorization.split(' ')[1]

    try {
       const { _id } = jwt.verify(token, process.env.SECRET)

       req.user = await User.findOne({ _id }).select('_id role')
       next()

    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'})
    }
}

export default requireAuth