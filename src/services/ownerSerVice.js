import db from '../models/index'
let getTopOwnertoHome = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({

                where: { roleId: +2 },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Role, as: 'RoleId', attributes: ['name', 'roleVi'] }
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

    getTopOwnertoHome: getTopOwnertoHome
}