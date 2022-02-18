import db from '../models/index'
let getLastestHome = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.House.findAll({

                order: [['createdAt', 'ASC']],
                attributes: {
                    exclude: ['password', 'image']
                },
                include: [
                    { model: db.HouseType },
                    { model: db.City },
                    { model: db.User },

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
module.exports = {

    getLastestHome: getLastestHome
}