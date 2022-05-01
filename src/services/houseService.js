import { use } from 'bcrypt/promises';
import db from '../models/index'
const { Op } = require('@sequelize/core');
let getLastestHome = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.House.findAll({

                order: [['createdAt', 'ASC']],
                limit: 5,
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.HouseType },
                    { model: db.City },
                    { model: db.User, attributes: ['firstName', 'lastName', 'address', 'tel', 'image', 'email'] },

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
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.HouseType },
                    { model: db.City },
                    { model: db.User, attributes: ['firstName', 'lastName', 'address', 'tel', 'image'] },

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
                    messageCode: "Missing input"
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

            }
            await house.save();
            resolve({
                errorCode: 0,
                messageCode: 'Update successfully'
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
                    messageCode: 'Post not found'
                })
            }

            await db.House.destroy({
                where: { id: id }
            });
            resolve({
                errorCode: 0,
                messageCode: 'The post is deleted'
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
                where: { idTypeHouse: id },

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

                order: [['createdAt', 'ASC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.HouseType },
                    { model: db.City },
                    { model: db.User, attributes: ['firstName', 'lastName', 'address', 'tel', 'image', 'email'] },

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
module.exports = {

    getLastestHome: getLastestHome,
    editHouse: editHouse,
    getDetailHouse: getDetailHouse,
    deleteHouse: deleteHouse,
    getAllHome: getAllHome,
    getAllHomeMobile: getAllHomeMobile,
    getFilterHouse: getFilterHouse,
    getFilterHouseFromHome: getFilterHouseFromHome,
    getAllTypeHouseById: getAllTypeHouseById
}