import express from "express";
import  requireAuth  from "../middlewares/requireAuth.js"
import { startLiveSession, endLiveSession, getLiveCode } from "../controllers/liveClassController.js"

const liveClassRouter = express.Router()

liveClassRouter.use(requireAuth);

// route for go live 
liveClassRouter.post("/go-live", startLiveSession )

// route for end live class
liveClassRouter.post("/end-live", endLiveSession )

// route for get live code
liveClassRouter.post("/live-code", getLiveCode )


export default liveClassRouter;