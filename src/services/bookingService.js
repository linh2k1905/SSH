
import db from '../models/index';
import bcrypt from 'bcryptjs';
const { Op } = require('@sequelize/core');
import { sendSimpleEmail } from './emailService';
const salt = bcrypt.genSaltSync(10);
import moment from 'moment';
require('dotenv').config();
import { v4 as uuidv4 } from 'uuid';
import localization from 'moment/locale/vi';
import { USER_ROLE } from './../config/constant'
let buildUrlEmail = (houseId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&bookingId=${houseId}`
    return result;
}
let buildUrlEmailCancel = (houseId, token) => {
    let result = `${process.env.URL_REACT}/verify-cancel-booking?token=${token}&bookingId=${houseId}`
    return result;
}



let postBookingApointment = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (!data.email || !data.idHouse || !data.time || !data.date || !data.password) {
                resolve({
                    errorCode: 0,
                    errorMessage: "Missing parameter"
                });
            }

            else {



                let hashUserPasswordFromBcrypt = await hashUserPassword(data.password);
                let token = uuidv4();
                users = await db.User.findOrCreate({
                    where: {
                        email: data.email
                    },
                    defaults: {
                        email: data.email,
                        roleId: USER_ROLE.USER,
                        tel: data.tel,
                        password: hashUserPasswordFromBcrypt,
                    }
                })
                if (users && users[0]) {
                    let rlt = await bcrypt.compareSync(data.password, users[0].password);
                    if (rlt) {
                        await db.Booking.findOrCreate({
                            where: {
                                idUser: users[0].id,
                                idHouse: data.idHouse,
                                time: data.time,
                                date: data.date,
                                token: token

                            },
                            defaults: {
                                idUser: users[0].id,
                                idHouse: data.idHouse,
                                time: data.time,
                                date: data.date,
                                description: data.desc,
                                token: token,
                                status: 'Đang được xử lý'

                            }


                        })
                        let dateBooking = moment(new Date(parseInt(data.date))).format('DD/MM/YYYY')
                        await sendSimpleEmail({
                            recieverEmail: data.email,
                            name: data.name ? data.name : ' ',
                            address: data.address ? data.address : '',
                            time: data.time + " " + dateBooking,
                            ownerName: data.nameOwner ? data.nameOwner : '',
                            linkRedirect: buildUrlEmail(data.idHouse, token),
                            linkRedirectCancel: buildUrlEmailCancel(data.idHouse, token)
                        })

                        resolve({
                            errorCode: 0,
                            errorMessage: "Create success",
                            users: users
                        })

                    }
                    resolve({
                        errorCode: -1,
                        errorMessage: 'Wrong password',
                        users: []
                    })

                }


            }

        } catch (error) {
            reject(error)
        }
    }
    )
}
let postBookingApointmentWithoutPass = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (!data.email || !data.idHouse || !data.time || !data.date) {
                resolve({
                    errorCode: 0,
                    errorMessage: "Missing parameter"
                });
            }

            else {




                let token = uuidv4();
                users = await db.User.findOne({
                    where: {
                        email: data.email
                    },
                    attributes: {
                        exclude: ['password', 'image']
                    },

                })
                if (users) {
                    console.log(users);

                    await db.Booking.findOrCreate({
                        where: {
                            idUser: users.id,
                            idHouse: data.idHouse,
                            time: data.time,
                            date: data.date,
                            token: token
                        },
                        defaults: {
                            idUser: users.id,
                            idHouse: data.idHouse,
                            time: data.time,
                            date: data.date,
                            description: data.desc,
                            token: token,
                            status: 'Đang được xử lý'

                        }


                    })
                    let dateBooking = moment(new Date(parseInt(data.date))).format('DD/MM/YYYY')
                    await sendSimpleEmail({
                        recieverEmail: data.email,
                        name: data.name ? data.name : ' ',
                        address: data.address ? data.address : '',
                        time: data.time + " " + dateBooking,
                        ownerName: data.nameOwner ? data.nameOwner : '',
                        linkRedirect: buildUrlEmail(data.idHouse, token),
                        linkRedirectCancel: buildUrlEmailCancel(data.idHouse, token)
                    })

                    resolve({
                        errorCode: 0,
                        errorMessage: "Create success",
                        users: users
                    })

                }


            }




        } catch (error) {
            reject(error)
        }
    }
    )
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash)

        } catch (error) {
            reject(error)

        }


    })
}



let commentPost = (data) => {

    return new Promise(async (resolve, reject) => {
        try {

            if (!data.userId || !data.content || !data.houseId) {
                resolve({
                    errorCode: 0,
                    errorMessage: "Missing parameter"
                });
            }
            else {
                await db.Comment.create({
                    userId: data.userId,
                    houseId: data.houseId,
                    content: data.content,
                    status: 'OK'

                })

                resolve({
                    errorCode: 0,
                    errorMessage: "Create success",

                })

            }

        } catch (error) {
            reject(error)
        }
    }
    )
}

let getAllBookingApointment = (data) => {

    return new Promise(async (resolve, reject) => {
        try {

            if (!data) {
                resolve({
                    errorCode: 0,
                    errorMessage: "Missing parameter"
                });
            }
            else {
                if (data === 'ALL') {
                    let bookings = await db.Booking.findAll({
                        include: [
                            {
                                model: db.House,

                            },
                            { model: db.User, as: 'User', attributes: ['email', 'tel'] },

                        ],
                        raw: true,
                        nest: true
                    });
                    resolve(bookings);
                }
                else {
                    let bookings = await db.Booking.findAll({
                        include: [
                            {
                                model: db.House,
                                where: {

                                    idUser: {
                                        [Op.eq]: data
                                    }
                                },
                                require: true

                            },
                            { model: db.User, as: 'User', attributes: ['firstName', 'lastName', 'address', 'tel', 'image'] },

                        ],
                        raw: true,
                        nest: true
                    });
                    resolve(bookings);

                }
            }

        } catch (error) {
            reject(error)
        }
    }
    )
}
let postVerifyBooking = (data) => {


    return new Promise(async (resolve, reject) => {
        try {

            if (!data.token || !data.idBooking) {
                resolve({
                    errorCode: 0,
                    errorMessage: "Missing parameter"
                });
            }
            else {

                let aBooking = await db.Booking.findOne({
                    where: {
                        idHouse: parseInt(data.idBooking),
                        token: data.token,

                    },
                    raw: false
                });
                if (aBooking) {
                    aBooking.status = "Đã Xác Nhận";
                    await aBooking.save();

                    resolve({
                        errorCode: 0,
                        errorMessage: 'Update success'
                    });

                }

            }


        } catch (error) {
            reject(error)
        }
    }
    )
}

let postVerifyBookingFromOwner = (data) => {


    return new Promise(async (resolve, reject) => {
        try {

            if (!data.token || !data.idBooking) {
                resolve({
                    errorCode: 0,
                    errorMessage: "Missing parameter"
                });
            }
            else {

                let aBooking = await db.Booking.findOne({
                    where: {
                        idHouse: parseInt(data.idBooking),
                        token: data.token,
                        status: "Đã xác nhận"

                    },
                    raw: false
                });
                if (aBooking) {
                    aBooking.status = "Đã Đồng Ý Hẹn";
                    await aBooking.save();

                    resolve({
                        errorCode: 0,
                        errorMessage: 'Update success'
                    });

                }

            }


        } catch (error) {
            reject(error)
        }
    }
    )
}

let postCancelVerifyBooking = (data) => {

    return new Promise(async (resolve, reject) => {
        try {

            if (!data.token || !data.idBooking) {
                resolve({
                    errorCode: 0,
                    errorMessage: "Missing parameter"
                });
            }
            else {

                let aBooking = await db.Booking.findOne({
                    where: {
                        idHouse: parseInt(data.idBooking),
                        token: data.token,
                        [Op.or]: {
                            status: "Đã Đồng Ý Hẹn",
                            status: "Đã Xác Nhận"
                        }

                    },
                    raw: false
                });

                if (aBooking) {
                    aBooking.status = "Đã Hủy Hẹn";
                    await aBooking.save();

                    resolve({
                        errorCode: 0,
                        errorMessage: 'Update success'
                    });

                }

            }


        } catch (error) {
            reject(error)
        }
    }
    )
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