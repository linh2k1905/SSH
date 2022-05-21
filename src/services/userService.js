
import db from '../models/index'
import bcrypt from 'bcryptjs'
import fetch from 'node-fetch';
import { sendSimpleEmailChangeTime } from './emailService';
import moment from 'moment';
const salt = bcrypt.genSaltSync(10);
let buildUrlEmail = (houseId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&bookingId=${houseId}`
    return result;
}
let buildUrlEmailCancel = (houseId, token) => {
    let result = `${process.env.URL_REACT}/verify-cancel-booking?token=${token}&bookingId=${houseId}`
    return result;
}
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let isExist = await checkEmailUser(email);

            let userData = {};
            if (isExist) {
                let user = await db.User.findOne({

                    where: {
                        email: email,
                    },
                    raw: false
                });
                if (user) {
                    let rlt = await bcrypt.compareSync(password, user.password);
                    if (rlt) {
                        userData.errorCode = 0;
                        userData.messageCode = 'Đăng nhập thành công';
                        userData.user = user;

                    }
                    else {
                        userData.errorCode = 2;
                        userData.messageCode = 'Sai Mật Khẩu';
                    }

                }

            }
            else {
                userData.errorCode = 1;
                userData.messageCode = 'Sai địa chỉ email';


            }

            resolve(userData);
        } catch (error) {
            reject(error);
        }
    })
}

let handleUserLoginFromMobile = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let isExist = await checkEmailUser(email);

            let userData = {};
            if (isExist) {
                let user = await db.User.findOne({

                    where: {
                        email: email,
                    },
                    raw: false
                });
                if (user) {
                    if (user.image)
                        user.image = Buffer.from(user.image, 'base64').toString('binary');

                    let rlt = await bcrypt.compareSync(password, user.password);
                    if (rlt) {
                        userData.errorCode = 0;
                        userData.messageCode = 'Đăng nhập thành công';
                        userData.user = user;

                    }
                    else {
                        userData.errorCode = 2;
                        userData.messageCode = 'Sai mật khẩu';
                    }

                }

            }
            else {
                userData.errorCode = 1;
                userData.messageCode = 'Sai địa chỉ email';


            }

            resolve(userData);
        } catch (error) {
            reject(error);
        }
    }).catch(e => console.log(e));
}

let checkEmailUser = (mail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: mail
                },
                raw: false
            })

            if (user) {
                resolve(true);
            }
            else {

                resolve(false);
            }

        } catch (error) {
            reject(error);
        }
    })

}
let checkCity = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let city = await db.City.findOne({
                where: {
                    name: name
                },
                raw: false
            })

            if (city) {
                resolve(true);
            }
            else {

                resolve(false);
            }

        } catch (error) {
            reject(error);
        }
    })

}

let getAllUser = (id) => {

    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (id === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });

            }
            if (id && id != "ALL") {
                users = await db.User.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['password']
                    },
                    raw: false

                })
            }
            resolve(users)


        } catch (error) {
            reject(error)
        }
    }
    )
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkEmailUser(data.email)
            if (check) {
                resolve({
                    errorCode: 1,
                    messageCode: 'Email đã được sử dụng. Vui lòng nhập mail mới'
                })
            }
            else {
                let hashUserPasswordFromBcrypt = await hashUserPassword(data.password);

                await db.User.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: hashUserPasswordFromBcrypt,
                    email: data.email,
                    tel: data.tel,
                    address: data.address,
                    roleId: data.roleId,
                    image: data.image

                })
                resolve({
                    errorCode: 0,
                    messageCode: 'Tạo người dùng thành công'
                })
            }


        } catch (error) {
            reject(error);
        }
    }).catch(e => console.log(e));


}
let createNewCity = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkCity(data.name)
            if (check) {
                resolve({
                    errorCode: 1,
                    messageCode: 'Thành phố đã tồn tại . Vui lòng nhập thành phố mới'
                })
            }
            else {


                await db.City.create({
                    name: data.name

                })
                resolve({
                    errorCode: 0,
                    messageCode: 'Create  New City'
                })
            }


        } catch (error) {
            reject(error);
        }
    })


}
let createNewPost = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (dataInput.address) {
                let url = "https://nominatim.openstreetmap.org/search?format=json&q=" + encodeURIComponent(dataInput.address)

                if (dataInput) {
                    fetch(url)
                        .then(

                            async res => {
                                let data = await res.json();
                                if (data) {
                                    if (data.length === 0) {
                                        resolve({
                                            errorCode: -1,
                                            messageCode: 'Địa chỉ không phù hợp'
                                        })
                                    }
                                    else {
                                        let lang = data[0].lon ? data[0].lon : data[1].lon;
                                        let lat = data[0].lat ? data[0].lat : data[1].lat;

                                        await db.House.create({
                                            name: dataInput.name,
                                            idUser: dataInput.userId,
                                            idCity: dataInput.cityId,
                                            idTypeHouse: dataInput.typeHouseId,
                                            price: dataInput.price,
                                            address: dataInput.address,
                                            image: dataInput.image,
                                            area: dataInput.area,
                                            lat: lat ? lat : '0',
                                            lang: lang ? lang : '0',
                                            descriptionEn: dataInput.descEn,
                                            descriptionVi: dataInput.descVi


                                        });
                                        resolve({
                                            errorCode: 0,
                                            messageCode: 'Đăng thành công'
                                        })




                                    }
                                }

                            }).catch(e => console.log(e));


                }



            }

        } catch (error) {
            reject(error);
        }
    })


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
let deleteUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                raw: false

            })
            if (!user) {
                resolve({
                    errorCode: 2,
                    messageCode: 'Không tìm thấy người dùng'
                })
            }

            await db.User.destroy({
                where: { id: id }
            });
            resolve({
                errorCode: 0,
                messageCode: 'Đã xóa người dùng thành công'
            })
        }


        catch (error) {
            reject(error)

        }
    }
    )
}
let editUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId) {
                resolve({
                    errorCode: 2,
                    messageCode: "Vui lòng điền đủ thông tin"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false

            })

            if (user) {
                user.address = data.address;
                user.lastName = data.lastName;
                user.firstName = data.firstName;
                user.tel = data.tel;
                user.roleId = data.roleId
                if (data.image) {
                    user.image = data.image;
                }

                await user.save();
                resolve({
                    errorCode: 0,
                    messageCode: 'Cập nhật thành công'
                })


            }
        } catch (e) {
            reject(e)
        }
    })
}
let handleEditUserPassword = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errorCode: 2,
                    messageCode: "Vui lòng đăng nhập"
                })
            }
            if (!data.password || !data.newpassword) {
                resolve({
                    errorCode: 2,
                    messageCode: "Vui lòng nhập đủ thông tin"
                })
            }

            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false

            })
            let rlt = await bcrypt.compareSync(data.password, user.password);


            if (user && rlt) {
                let hashUserPasswordFromBcrypt = await hashUserPassword(data.newpassword);
                user.password = hashUserPasswordFromBcrypt;
                await user.save();
                resolve({
                    errorCode: 0,
                    messageCode: 'Cập nhật thành công'
                })


            }
            else {
                resolve({
                    errorCode: 2,
                    messageCode: 'Mật khẩu sai'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getRoleUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let role = await db.Role.findAll({


            });
            resolve({
                errorCode: 0,
                data: role
            });


        } catch (error) {
            reject({
                errorCode: 1,
                messageCode: 'Không tìm thấy dữ liệu'
            })
        }


    })
}
let getAllCity = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let city = await db.City.findAll({


            });
            resolve({
                errorCode: 0,
                data: city
            });


        } catch (error) {
            reject({
                errorCode: 1,
                messageCode: ' Khong tim thay thanh pho'
            })
        }


    })
}
let getAllTypeHouse = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let typeHouse = await db.HouseType.findAll({


            });
            resolve({
                errorCode: 0,
                data: typeHouse
            });


        } catch (error) {
            reject({
                errorCode: 1,
                messageCode: ' Khong tim thay loai nha'
            })
        }


    })
}

let editCity = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errorCode: 2,
                    messageCode: "Vui lòng điền đủ thông tin"
                })
            }
            let city = await db.City.findOne({
                where: { id: data.id },
                raw: false

            })
            if (city) {

                city.name = data.name;

                await city.save();
                resolve({
                    errorCode: 0,
                    messageCode: 'Cập nhật thành công'
                })


            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteCity = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let city = await db.City.findOne({
                where: { id: id },
                raw: false

            })
            if (!city) {
                resolve({
                    errorCode: 2,
                    messageCode: 'City not found'
                })
            }

            await db.City.destroy({
                where: { id: id }
            });
            resolve({
                errorCode: 0,
                messageCode: 'The city is deleted'
            })
        }


        catch (error) {
            reject(error)

        }
    }
    )
}
let handleCreateNewComment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            await db.Comment.create({
                userId: data.userId,
                houseId: data.houseId,
                content: data.content,


            })
            resolve({
                errorCode: 0,
                messageCode: 'Đã tải lên'
            })



        } catch (error) {
            reject(error);
        }
    })


}

let editComment = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errorCode: 2,
                    messageCode: "Vui lòng điền đủ thông tin"
                })
            }
            let comment = await db.Comment.findOne({
                where: { id: data.id },
                raw: false

            })
            if (comment) {

                comment.status = 'Hide';

                await comment.save();
                resolve({
                    errorCode: 0,
                    messageCode: 'Cập nhật thành công'
                })


            }
        } catch (e) {
            reject(e)
        }
    })
}
let handleDeleteComment = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let comment = await db.Comment.findOne({
                where: { id: id },
                raw: false

            })
            if (!comment) {
                resolve({
                    errorCode: 2,
                    messageCode: 'Không tìm thấy bình luận'
                })
            }

            await db.Comment.destroy({
                where: { id: id }
            });
            resolve({
                errorCode: 0,
                messageCode: 'Đã xóa bình luận thành công'
            })
        }


        catch (error) {
            reject(error)

        }
    }
    )
}
let handleGetAllUsersByTypeUser = (id) => {

    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (id === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });

            }
            if (id && id != "ALL") {
                users = await db.User.findAll({
                    where: { roleId: id },
                    attributes: {
                        exclude: ['password']
                    },
                    raw: false

                })
            }
            resolve(users)


        } catch (error) {
            reject(error)
        }
    }
    )
}


let handleGetInfoBooking = (idHouse, idOwner) => {

    return new Promise(async (resolve, reject) => {
        try {
            let users = ''

            if (idOwner && idHouse) {
                users = await db.House.findOne({
                    where: { id: idHouse },
                    include: [
                        { model: db.HouseType },
                        { model: db.City },
                        { model: db.User, attributes: ['firstName', 'lastName', 'address', 'tel', 'image', 'email'] },

                    ],


                    raw: true,
                    nest: true

                })
            }
            resolve(users)


        } catch (error) {
            reject(error)
        }
    }
    )
}


let getAllCommentByIdHouse = (idHouse) => {

    return new Promise(async (resolve, reject) => {
        try {
            let comments = '';


            if (idHouse) {
                comments = await db.Comment.findAll({
                    where: {
                        houseId: idHouse,
                        status: 'OK'
                    },
                    include: [
                        { model: db.User, as: 'User', attributes: ['firstName', 'lastName', 'address', 'tel', 'image'] },

                    ],
                    raw: true,
                    nest: true

                })

            }


            resolve(comments)


        } catch (error) {
            reject(error)
        }
    }
    )
}

let getAllComment = () => {

    return new Promise(async (resolve, reject) => {
        try {
            let comments = await db.Comment.findAll({

                include: [
                    { model: db.User, as: 'User', attributes: ['firstName', 'lastName', 'address', 'tel', 'image'] },

                    { model: db.House }
                ],



                raw: true,
                nest: true

            })




            resolve(comments)


        } catch (error) {
            reject(error)
        }
    }
    )
}
let getAllBookingByUserId = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let bookings = await db.Booking.findAll({
                include: [
                    { model: db.User, as: 'User', attributes: ['firstName', 'lastName', 'address', 'tel', 'email'] },
                    {
                        model: db.House,
                        where: {
                            idUser: data
                        }
                    }
                ],



                raw: true,
                nest: true

            })




            resolve(bookings)


        } catch (error) {
            reject(error)
        }
    }
    )
}
let handleDeleteBookingById = (idInput) => {

    return new Promise(async (resolve, reject) => {

        try {
            let booking = await db.Booking.findOne({
                id: idInput
            })
            if (!booking) {
                resolve({
                    errorCode: 0,
                    errorMessage: 'Không tìm thấy lịch hẹn'
                })
            }
            else {
                await db.Booking.destroy({
                    where: { id: idInput },
                    raw: false
                });
                resolve({
                    errorCode: 0,
                    messageCode: 'Lịch hẹn đã bị xóa'
                })

            }


        } catch (error) {
            reject(error)
        }
    }
    )
}
let handleEditBookingById = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errorCode: 2,
                    messageCode: "Vui lòng điền đủ thông tin"
                })
            }
            let booking = await db.Booking.findOne({
                where: { id: data.id },
                raw: false

            })
            if (booking) {

                if (booking.time === data.time && booking.date === data.date) {
                    booking.idUser = data.idUser;
                    booking.idHouse = data.idHouse;
                    booking.description = data.desc;
                    booking.status = data.status;
                    await booking.save();
                }
                else {
                    booking.time = data.time;
                    booking.date = data.date;
                    booking.idUser = data.idUser;
                    booking.idHouse = data.idHouse;
                    booking.description = data.desc;
                    booking.status = "Đã Dời Lịch Hẹn";
                    await booking.save();
                    let house = await db.House.findOne({
                        where: {
                            id: data.idHouse
                        },
                        include: [

                            { model: db.User, as: 'User', attributes: ['firstName', 'lastName', 'address', 'tel'] },
                        ],
                        raw: true,
                        nest: true

                    });
                    let nameOwner = " ";
                    let tel = " "
                    if (house.User) {
                        nameOwner = house.User.firstName + " " + house.User.lastName;
                        tel = house.User.tel;
                    }
                    let users = await db.User.findOne({
                        where: {
                            email: data.email
                        },
                        attributes: {
                            exclude: ['password', 'image']
                        },

                    })
                    let dateBooking = moment(new Date(parseInt(data.date))).format('DD/MM/YYYY')
                    await sendSimpleEmailChangeTime({
                        username: users.firstName + " " + users.lastName,
                        tel: tel,
                        recieverEmail: data.email,
                        name: house.name ? house.name : ' ',
                        address: house.address ? house.address : '',
                        time: data.time + " " + dateBooking,
                        ownerName: nameOwner ? nameOwner : '',
                        linkRedirect: buildUrlEmail(data.idHouse, booking.token),
                        linkRedirectCancel: buildUrlEmailCancel(data.idHouse, booking.token)
                    })
                }




                resolve({
                    errorCode: 0,
                    messageCode: 'Cập nhật thành công'
                })


            }
        } catch (e) {
            reject(e)
        }
    })
}

let getUserById = (id) => {

    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (id) {
                users = await db.User.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['password']
                    },


                })
            }
            resolve(users)


        } catch (error) {
            reject(error)
        }
    }
    )
}
let getHouseByIdUser = (id) => {

    return new Promise(async (resolve, reject) => {
        try {
            let houses = '';
            if (id) {
                houses = await db.House.findAll({
                    where: { idUser: id },
                    include: [
                        { model: db.HouseType },
                        { model: db.City },
                        { model: db.User, attributes: ['firstName', 'lastName', 'address', 'tel', 'email'] },

                    ],
                    raw: true,
                    nest: true
                })
            }
            resolve(houses)


        } catch (error) {
            reject(error)
        }
    }
    )
}
let getHouseByMailUser = (mail) => {

    return new Promise(async (resolve, reject) => {
        try {
            let houses = '';
            if (mail) {
                houses = await db.House.findAll({
                    include: [
                        { model: db.HouseType },
                        { model: db.City },
                        {
                            model: db.User,
                            where: {
                                email: mail

                            }
                        },

                    ],
                    raw: true,
                    nest: true
                })
            }
            resolve(houses)


        } catch (error) {
            reject(error)
        }
    }
    )
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    editUser: editUser,
    getRoleUser: getRoleUser,
    getAllCity: getAllCity,
    getAllTypeHouse: getAllTypeHouse,
    createNewPost: createNewPost,
    createNewCity: createNewCity,
    checkCity: checkCity,
    editCity: editCity,
    deleteCity: deleteCity,
    handleCreateNewComment: handleCreateNewComment,
    editComment: editComment,
    handleDeleteComment: handleDeleteComment,
    handleGetAllUsersByTypeUser: handleGetAllUsersByTypeUser,
    handleGetInfoBooking: handleGetInfoBooking,
    getAllCommentByIdHouse: getAllCommentByIdHouse,
    getAllComment: getAllComment,
    handleDeleteBookingById: handleDeleteBookingById,
    handleEditBookingById: handleEditBookingById,
    getUserById: getUserById,
    getHouseByIdUser: getHouseByIdUser,
    getHouseByMailUser: getHouseByMailUser,
    getAllBookingByUserId: getAllBookingByUserId,
    handleUserLoginFromMobile: handleUserLoginFromMobile,
    handleEditUserPassword: handleEditUserPassword
}
