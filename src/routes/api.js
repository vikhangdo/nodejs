import * as AuthenController from '../controller/AuthenController.js';
import express from 'express';
const router = express.Router();

function API(app) {
    router.post("/register", AuthenController.register);
    router.post("/login", AuthenController.login);

    return app.use("/api/v1/", router);
}

export default API;