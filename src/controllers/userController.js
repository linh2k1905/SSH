//import { reject } from 'bcrypt/promises';
import userService from '../services/userService'
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errorCode: 1,
            messageCode: 'not empty input',


        })
    }
    let userData = await userService.handleUserLogin(email, password)
    console.log(userData)
    return res.status(200).json({
        error: userData.errorCode,
        messageCode: userData.messageCode,
        userdata: userData.user ? userData.user : { 'user': 'user not found' },
    })

}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id
    if (!id) {
        return res.status(200).json({
            errorCode: 1,
            messageCode: " Missing input",
            users: []
        })
    }
    let users = await userService.getAllUser(id);
    return res.status(200).json({
        errorCode: 0,
        errMessage: "ok",
        users
    })

}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers
}