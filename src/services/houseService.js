import { use } from 'bcrypt/promises';
import db from '../models/index'
const { Op } = require('@sequelize/core');
import { STATUS } from '../../src/config/constant'
let getLastestHome = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.House.findAll({
                where: {
                    status: STATUS.STATUS_OK
                },
                order: [['createdAt', 'ASC']],
                limit: 5,
                include: [
                    { model: db.HouseType },
                    { model: db.City },
                    { model: db.User, attributes: ['firstName', 'lastName', 'address', 'tel', 'image', 'email', 'id'] },

                ],
                raw: true,
                nest: true,




            });
            resolve({
                errorCode: 0,
                data: users
            });


        } catch (error) {
            reject({
                errorCode: 1,
                messageCode: ' Loi' + error
            })
        }


    })
}
let getAllHome = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.House.findAll({

                order: [['createdAt', 'ASC']],
                include: [
                    { model: db.HouseType },
                    { model: db.City },
                    { model: db.User, attributes: ['firstName', 'lastName', 'address', 'tel', 'id', 'image', 'email'] },

                ],
                raw: true,
                nest: true,




            });
            resolve({
                errorCode: 0,
                data: users
            });


        } catch (error) {
            reject({
                errorCode: 1,
                messageCode: ' Loi' + error
            })
        }


    })
}

let editHouse = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errorCode: 2,
                    messageCode: "Vui lòng điền đủ thông tin"
                })
            }
            let house = await db.House.findOne({
                where: { id: data.id },
                raw: false

            })
            if (house && house.id) {
                house.name = data.name
                house.price = data.price
                house.address = data.address
                house.area = data.area
                house.lat = data.lat
                house.lang = data.lang
                house.descriptionEn = data.descEn
                house.descriptionVi = data.descVi
                house.image = data.image

            }
            await house.save();
            resolve({
                errorCode: 0,
                messageCode: 'Cập nhật thông tin thành công'
            })



        } catch (e) {
            reject(e)
        }
    })
}
let getDetailHouse = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let house = await db.House.findOne({
                where: { id: id },
                include: [
                    {
                        model: db.HouseType,

                    },
                    { model: db.City, attributes: ['name'] },
                    { model: db.User, as: 'User', attributes: ['id', 'firstName', 'lastName', 'address', 'tel', 'image'] },
                ],
                raw: true,
                nest: true

            });
            if (house && house.image)
                house.image = Buffer.from(house.image, 'base64').toString('binary');


            resolve({
                errorCode: 0,
                data: house
            });


        } catch (error) {
            reject({
                errorCode: 1,
                messageCode: ' Loi' + error
            })
        }


    })
}
let getBlockUserHasPostUnvailable = (data) => {

    let idUser = parseInt(data.idUser);

    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: idUser },
                raw: false,
            });
            if (user) {
                user.password = user.password + 'BLOCK';
                await user.save();
                let houseblock = await db.House.findOne({
                    where: {
                        id: parseInt(data.idHouse)
                    },
                    raw: false
                })
                houseblock.status = "Unvailable";
                await houseblock.save();
                resolve({
                    errorCode: 0,
                    messageCode: 'Khóa người dùng thành công'
                });
            }





        } catch (error) {
            reject({
                errorCode: 1,
                messageCode: ' Loi' + error
            })
        }


    }).catch((err) => {
        console.log(err);
    })
}
let deleteHouse = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let house = await db.House.findOne({
                where: { id: id },
                raw: false

            })
            if (!house) {
                resolve({
                    errorCode: 2,
                    messageCode: 'Không tìm thấy bài đăng hoặc bị xóa'
                })
            }

            await db.House.destroy({
                where: { id: id }
            });
            resolve({
                errorCode: 0,
                messageCode: 'Bài đăng bị xóa'
            })
        }


        catch (error) {
            reject(error)

        }
    }
    )
}
let getFilterHouse = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.idUser && data.idCity) {
                let house = await db.House.findAll({
                    where: {
                        idUser: data.idUser,
                        idCity: data.idCity,

                    },
                    include: [
                        {
                            model: db.HouseType,

                        },
                        { model: db.City },
                        { model: db.User, as: 'User', attributes: ['firstName', 'lastName', 'address', 'tel', 'email'] },

                    ],
                    raw: true,
                    nest: true
                });
                if (house && house.image)
                    house.image = Buffer.from(house.image, 'base64').toString('binary');
                resolve({
                    errorCode: 0,
                    data: house
                });
            }
            else {

                let house = await db.House.findAll({
                    where: {
                        [Op.or]: {
                            idUser: data.idUser,
                            idCity: data.idCity
                        }
                    },
                    include: [
                        {
                            model: db.HouseType,

                        },
                        { model: db.City },
                        { model: db.User, as: 'User', attributes: ['firstName', 'lastName', 'address', 'tel', 'image'] },

                    ],
                    raw: true,
                    nest: true
                });
                if (house && house.image)
                    house.image = Buffer.from(house.image, 'base64').toString('binary');
                resolve({
                    errorCode: 0,
                    data: house
                });

            }


        } catch (error) {
            reject({
                errorCode: 1,
                messageCode: ' Loi' + error
            })
        }


    })
}

let getFilterHouseFromHome = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let house = await db.House.findAll({
                where: {
                    status: STATUS.STATUS_OK,
                    idCity: parseInt(data.idCity),
                    idTypeHouse: parseInt(data.idTypeHouse),
                    price: {
                        [Op.lte]: parseInt(data.price) * 1000000,


                    },
                    area: {

                        [Op.lte]: parseInt(data.area),


                    },




                },
                include: [
                    {
                        model: db.HouseType,

                    },
                    { model: db.City },
                    { model: db.User, as: 'User', attributes: ['firstName', 'lastName', 'address', 'tel', 'image', 'email'] },

                ],
                raw: true,
                nest: true





            });
            if (house && house.image)
                house.image = Buffer.from(house.image, 'base64').toString('binary');


            resolve({
                errorCode: 0,
                data: house
            });


        } catch (error) {
            reject({
                errorCode: 1,
                messageCode: ' Loi' + error
            })
        }


    })
}
let getListHouseByCity = (data) => {
    console.log(data);
    return new Promise(async (resolve, reject) => {
        try {
            let house = await db.House.findAll({
                where: {
                    idCity: parseInt(data.idCity),
                    status: STATUS.STATUS_OK,
                },
                include: [
                    {
                        model: db.HouseType,

                    },
                    { model: db.City },
                    { model: db.User, as: 'User', attributes: ['firstName', 'lastName', 'address', 'tel', 'image', 'email', 'id'] },

                ],
                raw: true,
                nest: true
            });
            resolve({
                errorCode: 0,
                data: house
            });

        } catch (error) {
            reject({
                errorCode: 1,
                messageCode: ' Loi' + error
            })
        }


    })
}

let getAllTypeHouseById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let house = await db.House.findAll({
                where: {
                    idTypeHouse: id,
                    status: STATUS.STATUS_OK,
                },

                include: [
                    {
                        model: db.HouseType,

                    },
                    { model: db.City, attributes: ['name'] },
                    { model: db.User, as: 'User', attributes: ['id', 'firstName', 'lastName', 'address', 'tel', 'image', 'email'] },

                ],
                raw: true,
                nest: true



            });

            if (house && house.image)
                house.image = Buffer.from(house.image, 'base64').toString('binary');


            resolve({
                errorCode: 0,
                data: house
            });


        } catch (error) {
            reject({
                errorCode: 1,
                messageCode: ' Loi' + error
            })
        }


    })
}



let getAllHomeMobile = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.House.findAll({
                where: {
                    status: STATUS.STATUS_OK,
                },
                order: [['createdAt', 'ASC']],
                include: [
                    { model: db.HouseType },
                    { model: db.City },
                    { model: db.User, attributes: ['firstName', 'lastName', 'address', 'tel', 'image', 'email', 'id'] },

                ],
                raw: true,
                nest: true,
            });
            if (users) {
                users.map((item, index) => {
                    users[index].image = Buffer.from(item.image, 'base64').toString('binary');

                })

            }
            resolve({
                errorCode: 0,
                data: users
            });


        } catch (error) {
            reject({
                errorCode: 1,
                messageCode: ' Loi' + error
            })
        }


    })
}

let getFilterHouseFromHomeMobile = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let house = await db.House.findAll({
                where: {
                    status: STATUS.STATUS_OK,
                    idCity: parseInt(data.idCity),
                    idTypeHouse: parseInt(data.idTypeHouse),
                    price: {
                        [Op.lte]: parseInt(data.price) * 1000000,


                    },
                    area: {

                        [Op.lte]: parseInt(data.area),


                    },




                },
                include: [
                    {
                        model: db.HouseType,

                    },
                    { model: db.City },
                    { model: db.User, as: 'User', attributes: ['id', 'firstName', 'lastName', 'address', 'tel', 'email'] },

                ],
                raw: true,
                nest: true





            });
            if (house) {
                house.map((item, index) => {
                    house[index].image = Buffer.from(item.image, 'base64').toString('binary');

                })

            }

            resolve({
                errorCode: 0,
                data: house
            });


        } catch (error) {
            reject({
                errorCode: 1,
                messageCode: ' Loi' + error
            })
        }


    })
}
module.exports = {

    getLastestHome: getLastestHome,
    editHouse: editHouse,
    getDetailHouse: getDetailHouse,
    deleteHouse: deleteHouse,
    getAllHome: getAllHome,
    getAllHomeMobile: getAllHomeMobile,
    getFilterHouse: getFilterHouse,
    getFilterHouseFromHome: getFilterHouseFromHome,
    getAllTypeHouseById: getAllTypeHouseById,
    getFilterHouseFromHomeMobile: getFilterHouseFromHomeMobile,
    getListHouseByCity: getListHouseByCity,
    getBlockUserHasPostUnvailable: getBlockUserHasPostUnvailable
}