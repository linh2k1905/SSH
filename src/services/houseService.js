import db from '../models/index'
let getLastestHome = () => {
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
                nest: true



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
            if (house) {
                house.name = data.name;
                house.idCity = data.idCity;
                house.idTypeHouse = data.idTypeHouse;
                house.idUser = data.idUser;
                house.price = data.price;
                house.area = data.area;
                house.descriptionVi = data.descriptionVi;
                house.descriptionEn = data.descriptionEn;
                house.lang = data.lang;
                house.lat = data.lat;
                if (house.image) {
                    house.image = data.image;
                }

                await house.save();
                resolve({
                    errorCode: 0,
                    messageCode: 'Update successfully'
                })


            }
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
                    { model: db.City },
                    { model: db.User, as: 'User', attributes: ['firstName', 'lastName', 'address', 'tel', 'image'] },

                ],
                raw: true,
                nest: true



            });
            if (house && house.image)
                house.image = new Buffer(house.image, 'base64').toString('binary');


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

module.exports = {

    getLastestHome: getLastestHome,
    editHouse: editHouse,
    getDetailHouse: getDetailHouse,
    deleteHouse: deleteHouse
}