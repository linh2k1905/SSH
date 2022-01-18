import express, { Router } from "express";
import homeController from '../controllers/homeController'
import userController from '../controllers/userController'
let router = express.Router();

let initWebRoute = (app) => {
    router.get('/', homeController.getHomePage
    )
    router.get('/crud', homeController.getCRUD
    )
    router.get('/display-crud', homeController.displayCRUD
    )
    router.post('/post-crud', homeController.postCRUD
    )
    router.get('/edit-crud', homeController.geteditCRUD);
    router.get('/delete-crud', homeController.getdeleteCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    return app.use(router)
}
module.exports = initWebRoute