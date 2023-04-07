import express from "express";
// middlewares
import awaitHandlerFactory from "../middlewares/awaitHandlerFactory.middleware.js";

//controllers
import userController from "../controllers/user.controller.js";

const router = express.Router();



//Register
router.get('/get-contact', awaitHandlerFactory(userController.findContact));




export default router;