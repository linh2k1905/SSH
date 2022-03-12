//import { reject } from 'bcrypt/promises';
import bookingService from '../services/bookingService'


let postBookingApointment = async (req, res) => {
    let data = req.body;


    if (!data) {
        return res.status(200).json({
            errorCode: 1,
            messageCode: " Missing input",
            users: []
        })
    }
    let booking = await bookingService.postBookingApointment(data);
    return res.status(200).json({
        errorCode: 0,
        errMessage: "ok",
        data: booking
    })

}
module.exports = {

    postBookingApointment: postBookingApointment
}