
import db from '../models/index'
import bcrypt from 'bcryptjs'
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let isExist = await checkEmailUser(email);

            let userData = {};
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'password'],
                    where: {
                        email: email,
                    },
                    raw: true
                });
                if (user) {
                    let rlt = await bcrypt.compareSync(password, user.password);
                    if (rlt) {
                        userData.errorCode = 0;
                        userData.messageCode = 'login success';
                        userData.user = user;

                    }
                    else {
                        userData.errorCode = 2;
                        userData.messageCode = 'wrong password';
                    }

                }

            }
            else {
                userData.errorCode = 1;
                userData.messageCode = 'wrong email';


            }

            resolve(userData);
        } catch (error) {
            reject(error);
        }
    })
}

let checkEmailUser = (mail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: mail
                }

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
                    }
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
    handleUserLogin: handleUserLogin
    ,
    getAllUser: getAllUser

}