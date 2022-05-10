//import { reject } from 'bcrypt/promises';

import bookingService from '../services/bookingService'

let postBookingApointment = async (req, res) => {
    let data = req.body;


    if (!data) {
        return res.status(200).json({
            errorCode: 1,
            messageCode: "Vui lòng điền đủ thông tin",
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
let postBookingApointmentWithoutPass = async (req, res) => {
    let data = req.body;
    console.log(data);


    if (!data) {
        return res.status(200).json({
            errorCode: 1,
            messageCode: "Vui lòng điền đủ thông tin",
            users: []
        })
    }
    let booking = await bookingService.postBookingApointmentWithoutPass(data);
    return res.status(200).json({
        errorCode: 0,
        errMessage: "ok",
        data: booking
    })

}
let commentPost = async (req, res) => {
    let data = req.body;


    if (!data) {
        return res.status(200).json({
            errorCode: 1,
            messageCode: "Vui lòng điền đủ thông tin",

        })
    }
    let comment = await bookingService.commentPost(data);
    return res.status(200).json({
        errorCode: 0,
        errMessage: "ok",
        data: comment
    })

}
let getAllBookingApointment = async (req, res) => {
    let data = req.query.id;


    if (!data) {
        return res.status(200).json({
            errorCode: 1,
            messageCode: "Vui lòng điền đủ thông tin",

        })
    }
    let booking = await bookingService.getAllBookingApointment(data);
    return res.status(200).json({
        errorCode: 0,
        errMessage: "ok",
        data: booking
    })

}
let postVerifyBooking = async (req, res) => {

    let booking = await bookingService.postVerifyBooking(req.body);
    return res.status(200).json({
        data: booking
    })

}
let postVerifyBookingFromOwner = async (req, res) => {

    let booking = await bookingService.postVerifyBookingFromOwner(req.body);
    return res.status(200).json({
        data: booking
    })

}
let postCancelVerifyBooking = async (req, res) => {

    let booking = await bookingService.postCancelVerifyBooking(req.body);
    return res.status(200).json({
        data: booking
    })

}

module.exports = {

    postBookingApointment: postBookingApointment,
    postBookingApointmentWithoutPass: postBookingApointmentWithoutPass,
    commentPost: commentPost,
    getAllBookingApointment: getAllBookingApointment,
    postVerifyBooking: postVerifyBooking,
    postCancelVerifyBooking: postCancelVerifyBooking,
    postVerifyBookingFromOwner: postVerifyBookingFromOwner
}