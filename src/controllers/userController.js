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
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);

    return res.status(200).json({
        errorCode: message.errorCode,
        messageCode: message.messageCode
    });
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errorCode: 1,
            messageCode: " User not found"
        })

    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message)
}
let handleEditUser = async (req, res) => {

    let message = await userService.editUser(req.body);
    return res.status(200).json(message)


}
let handleGetRole = async (req, res) => {
    let data = await userService.getRoleUser();
    return res.status(200).json(data);
}
let handleGetCity = async (req, res) => {
    let data = await userService.getAllCity();
    return res.status(200).json(data);
}
let handleGetTypeHouse = async (req, res) => {
    let data = await userService.getAllTypeHouse();

    return res.status(200).json(data);
}
let handleCreateNewPost = async (req, res) => {
    let message = await userService.createNewPost(req.body);

    return res.status(200).json({
        errorCode: message.errorCode,
        messageCode: message.messageCode
    });
}
let handleCreateNewCity = async (req, res) => {
    let message = await userService.createNewCity(req.body);

    return res.status(200).json({
        errorCode: message.errorCode,
        messageCode: message.messageCode
    });
}
let handleEditCity = async (req, res) => {
    let data = req.body;
    let message = await userService.editCity(data);
    return res.status(200).json(message)
}
let handleDeleteCity = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errorCode: 1,
            messageCode: " City not found"
        })

    }
    let message = await userService.deleteCity(req.body.id);
    return res.status(200).json(message)
}
let handleCreateNewComment = async (req, res) => {
    let message = await userService.handleCreateNewComment(req.body);

    return res.status(200).json({
        errorCode: message.errorCode,
        messageCode: message.messageCode
    });
}
let handleEditComment = async (req, res) => {
    let data = req.body;
    let message = await userService.editComment(data);
    return res.status(200).json(message)
}
let handleDeleteComment = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errorCode: 1,
            messageCode: " Comment not found"
        })

    }
    let message = await userService.handleDeleteComment(req.body.id);
    return res.status(200).json(message)
}

let handleGetAllUsersByTypeUser = async (req, res) => {
    let id = req.query.roleId
    if (!id) {
        return res.status(200).json({
            errorCode: 1,
            messageCode: " Missing input",
            users: []
        })
    }
    let users = await userService.handleGetAllUsersByTypeUser(id);
    return res.status(200).json({
        errorCode: 0,
        errMessage: "ok",
        users
    })

}

let getHouseByIdUser = async (req, res) => {
    let id = req.query.id
    if (!id) {
        return res.status(200).json({
            errorCode: 1,
            messageCode: " Missing input",
            houses: []
        })
    }
    let houses = await userService.getHouseByIdUser(id);
    return res.status(200).json({
        errorCode: 0,
        errMessage: "ok",
        houses
    })

}
let getHouseByMailUser = async (req, res) => {
    let mail = req.query.email;
    if (!mail) {
        return res.status(200).json({
            errorCode: 1,
            messageCode: " Missing input",
            houses: []
        })
    }
    let houses = await userService.getHouseByMailUser(mail);
    return res.status(200).json({
        errorCode: 0,
        errMessage: "ok",
        houses
    })

}
let getUserById = async (req, res) => {
    let id = req.query.id
    if (!id) {
        return res.status(200).json({
            errorCode: 1,
            messageCode: " Missing input",
            users: []
        })
    }
    let users = await userService.getUserById(id);
    return res.status(200).json({
        errorCode: 0,
        errMessage: "ok",
        users
    })

}


let handleGetInfoBooking = async (req, res) => {
    let idOwner = req.query.idOwner;
    let idHouse = req.query.idHouse;

    if (!req.query.idOwner || !req.query.idHouse) {
        return res.status(200).json({
            errorCode: 1,
            messageCode: " Missing input",
            users: []
        })
    }
    let users = await userService.handleGetInfoBooking(idHouse, idOwner);
    return res.status(200).json({
        errorCode: 0,
        errMessage: "ok",
        users
    })

}


let getAllCommentByIdHouse = async (req, res) => {


    if (!req.query.idHouse) {
        return res.status(200).json({
            errorCode: 1,
            messageCode: " Missing input",
            comments: []
        })
    }
    let comments = await userService.getAllCommentByIdHouse(req.query.idHouse);
    return res.status(200).json({
        errorCode: 0,
        errMessage: "ok",
        comments: comments
    })

}
let getAllComment = async (req, res) => {



    let comments = await userService.getAllComment();
    return res.status(200).json({
        errorCode: 0,
        errMessage: "ok",
        comments: comments
    })

}
let handleDeleteBookingById = async (req, res) => {
    if (!req.query.id) {
        return res.status(200).json({
            errorCode: -1,
            errMessage: "Missing Parameter",

        })

    }


    let request = await userService.handleDeleteBookingById(req.query.id);
    return res.status(200).json({

        request: request

    })

}
let handleEditBookingById = async (req, res) => {
    let data = req.body;
    let message = await userService.handleEditBookingById(data);
    return res.status(200).json(message)


}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
    handleGetRole: handleGetRole,
    handleGetCity: handleGetCity,
    handleGetTypeHouse: handleGetTypeHouse,
    handleCreateNewPost: handleCreateNewPost,
    handleCreateNewCity: handleCreateNewCity,
    handleEditCity: handleEditCity,
    handleDeleteCity: handleDeleteCity,
    handleCreateNewComment: handleCreateNewComment,
    handleEditComment: handleEditComment,
    handleDeleteComment: handleDeleteComment,
    handleGetAllUsersByTypeUser: handleGetAllUsersByTypeUser,
    handleGetInfoBooking: handleGetInfoBooking,
    getAllCommentByIdHouse: getAllCommentByIdHouse,
    getAllComment: getAllComment,
    handleDeleteBookingById: handleDeleteBookingById,
    handleEditBookingById: handleEditBookingById,
    getUserById: getUserById,
    getHouseByIdUser: getHouseByIdUser,
    getHouseByMailUser: getHouseByMailUser


}