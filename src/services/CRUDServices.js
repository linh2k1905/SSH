import bcrypt from 'bcryptjs';
import db from '../models/index'
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashUserPasswordFromBcrypt = await hashUserPassword(data.password);

            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                password: hashUserPasswordFromBcrypt,
                email: data.email,
                tel: data.tel,
                address: data.address,
                roleId: data.roleId,

            })
            resolve('Create new user successfully')

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
let getAllUser = () => {

    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true
            });
            resolve(users)

        } catch (error) {
            reject(error)
        }
    }
    )
}
let getUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: false
            })
            if (user)
                resolve(user)
            else resolve([])
        } catch (error) {
            reject(error)

        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false

            })
            if (user) {
                user.address = data.address;
                user.lastName = data.lastName;
                user.firstName = data.firstName;
                await user.save();
                resolve(user)


            }


        } catch (error) {
            reject(error)
        }
    }
    )

}
let deleteUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                raw: false

            })
            if (user) {
                await user.destroy();
            }
            resolve()
        } catch (error) {
            reject(error)

        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}