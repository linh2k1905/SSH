
import db from '../models/index'
import bcrypt from 'bcryptjs'
import { raw } from 'body-parser';
import { reject } from 'bcrypt/promises';

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
    handleGetInfoBooking: handleGetInfoBooking

}