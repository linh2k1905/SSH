
import db from '../models/index';
import bcrypt from 'bcryptjs';
const { Op } = require('@sequelize/core');
const salt = bcrypt.genSaltSync(10);
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

let postBookingApointment = (data) => {

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
                let hashUserPasswordFromBcrypt = await hashUserPassword(data.password);

                users = await db.User.findOrCreate({
                    where: {
                        email: data.email,
                        password: hashUserPasswordFromBcrypt
                    },
                    defaults: {
                        email: data.email,
                        roleId: 4,
                        tel: data.tel,
                        password: hashUserPasswordFromBcrypt,
                    }
                })
                if (users && users[0]) {
                    await db.Booking.findOrCreate({
                        where: {
                            idUser: users[0].id,
                            idHouse: data.idHouse,
                            time: data.time,
                            date: data.date,

                        },
                        defaults: {
                            idUser: users[0].id,
                            idHouse: data.idHouse,
                            time: data.time,
                            date: data.date,
                            description: data.desc,
                            status: 'Đang được xử lý'

                        }


                    })
                }
                resolve({
                    errorCode: 0,
                    errorMessage: "Create success",
                    users: users
                })

            }

        } catch (error) {
            reject(error)
        }
    }
    )
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
module.exports = {

    postBookingApointment: postBookingApointment,
    commentPost: commentPost,
    getAllBookingApointment: getAllBookingApointment

}