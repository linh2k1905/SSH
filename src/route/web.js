import express, { Router } from "express";
import homeController from '../controllers/homeController'
import userController from '../controllers/userController'
import ownerController from '../controllers/ownerController'
import houseController from "../controllers/houseController"
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
    router.get('/api/get-all-users', userController.handleGetAllUsers);

    router.get('/api/get-all-users-by-type-user', userController.handleGetAllUsersByTypeUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.post('/api/create-new-post', userController.handleCreateNewPost);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/getRole', userController.handleGetRole);
    router.get('/api/getCity', userController.handleGetCity);
    router.get('/api/getTypeHouse', userController.handleGetTypeHouse);
    router.get('/api/top-owner-home', ownerController.getTopOwnertoHome);

    router.get('/api/get-all-house', houseController.getListLatestHouse);
    router.get('/api/get-all-home', houseController.getListHouse);
    router.get('/api/detail-house-by-id', houseController.getDetailHouseById);
    router.put('/api/edit-house-by-id', houseController.handleEditHouse);
    router.delete('/api/delete-house-by-id', houseController.handleDeleteHouse);
    router.get('/api/get-all-type-house-by-id', houseController.getAllTypeHouseById);

    router.post('/api/create-new-city', userController.handleCreateNewCity);
    router.put('/api/edit-city-by-id', userController.handleEditCity);
    router.delete('/api/delete-city', userController.handleDeleteCity);
    router.post('/api/create-new-comment', userController.handleCreateNewComment);
    router.put('/api/edit-comment-by-id', userController.handleEditComment);
    router.delete('/api/delete-comment', userController.handleDeleteComment);
    router.get('/api/get-filter-house', houseController.getFilterHouse);
    router.get('/api/get-filter-house-from-home', houseController.getFilterHouseFromHome);
    router.post('/api/create-bulk-schedule', ownerController.createBulkSchedule);
    router.get('/api/get-schedule-owner', ownerController.getScheduleOwner);
    return app.use(router)
}
module.exports = initWebRoute