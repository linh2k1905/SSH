import express, { Router } from "express";
import homeController from '../controllers/homeController'
import userController from '../controllers/userController'
import ownerController from '../controllers/ownerController'
import houseController from "../controllers/houseController"
import bookingController from '../controllers/bookingController'
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
    router.post('/api/login-from-mobile', userController.handleLoginFromMobile);
    router.get('/api/get-all-users', userController.handleGetAllUsers);

    router.get('/api/get-all-users-by-type-user', userController.handleGetAllUsersByTypeUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.post('/api/create-new-post', userController.handleCreateNewPost);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/getRole', userController.handleGetRole);
    router.get('/api/getCity', userController.handleGetCity);
    router.get('/api/getTypeHouse', userController.handleGetTypeHouse);
    router.get('/api/get-info-booking', userController.handleGetInfoBooking);
    router.get('/api/top-owner-home', ownerController.getTopOwnertoHome);
    router.get('/api/get-filter-house-from-home-mobile', houseController.getFilterHouseFromHomeMobile);
    router.get('/api/get-all-house', houseController.getListLatestHouse);
    router.get('/api/get-all-home', houseController.getListHouse);
    router.get('/api/get-all-home-by-city', houseController.getListHouseByCity);
    router.get('/api/get-all-home-by-city-from-mobile', houseController.getListHouseByCityFromMobile);
    router.get('/api/get-all-home-to-mobile', houseController.getListHouseMobile);
    router.get('/api/detail-house-by-id', houseController.getDetailHouseById);
    router.put('/api/edit-house-by-id', houseController.handleEditHouse);
    router.delete('/api/delete-house-by-id', houseController.handleDeleteHouse);
    router.get('/api/get-all-type-house-by-id', houseController.getAllTypeHouseById);

    router.post('/api/create-new-city', userController.handleCreateNewCity);
    router.put('/api/edit-city-by-id', userController.handleEditCity);
    router.delete('/api/delete-city', userController.handleDeleteCity);

    router.get('/api/get-filter-house', houseController.getFilterHouse);
    router.get('/api/get-filter-house-from-home', houseController.getFilterHouseFromHome);
    router.post('/api/create-bulk-schedule', ownerController.createBulkSchedule);
    router.post('/api/user-booking', bookingController.postBookingApointment);
    router.post('/api/user-booking-none-password', bookingController.postBookingApointmentWithoutPass);
    router.get('/api/admin-booking', bookingController.getAllBookingApointment);
    router.delete('/api/delete-booking-by-id', userController.handleDeleteBookingById);
    router.put('/api/edit-booking-by-id', userController.handleEditBookingById);
    router.post('/api/user-comment', bookingController.commentPost);
    router.get('/api/get-schedule-owner', ownerController.getScheduleOwner);

    router.get('/api/get-user-by-id', userController.getUserById);
    router.get('/api/get-house-by-id-user', userController.getHouseByIdUser);
    router.get('/api/get-house-by-mail-user', userController.getHouseByMailUser);

    router.post('/api/verify-book-appoinment', bookingController.postVerifyBooking);
    router.post('/api/verify-book-appoinment-from-owner', bookingController.postVerifyBookingFromOwner);
    router.post('/api/verify-cancel-book-appoinment', bookingController.postCancelVerifyBooking);
    router.get('/api/get-all-comment', userController.getAllComment);
    router.post('/api/create-new-comment', userController.handleCreateNewComment);
    router.put('/api/edit-comment-by-id', userController.handleEditComment);
    router.delete('/api/delete-comment', userController.handleDeleteComment);
    router.get('/api/get-all-comment-by-houseId', userController.getAllCommentByIdHouse);
    router.get('/api/get-all-booking-by-user-id', userController.getAllBookingByUserId);
    router.put('/api/get-block-user-has-post-unvailable', houseController.getBlockUserHasPostUnvailable);
    return app.use(router)
}
module.exports = initWebRoute