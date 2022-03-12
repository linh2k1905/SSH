//import { reject } from 'bcrypt/promises';
import bookingService from '../services/bookingService'


let handleGetInfoBooking = async (req, res) => {
    let idOwner = req.query.idOwner;
    let idHouse = req.query.idHouse;
    console.log(idHouse, idOwner);

    if (!req.query.idOwner || !req.query.idHouse) {
        return res.status(200).json({
            errorCode: 1,
            messageCode: " Missing input",
            users: []
        })
    }
    let users = await userService.handleGetInfoBooking(idHouse, idOwner);
    return res.status(200).json({
        errorCode: 0,
        errMessage: "ok",
        users
    })

}
module.exports = {

    handleGetInfoBooking: handleGetInfoBooking
}