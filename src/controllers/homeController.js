import db from '../models/index'
import CRUDServices from '../services/CRUDServices'
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data);
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }

}
let getAboutPage = (req, res) => {
    return res.render('./test/about.ejs');
}
let getCRUD = (req, res) => {
    return res.render("crud.ejs", {

    });
}

let postCRUD = async (req, res) => {
    let message = await CRUDServices.createNewUser(req.body);
    console.log(message)
    return res.send("post crud server");
}
let displayCRUD = async (req, res) => {
    let data = await CRUDServices.getAllUser()

    return res.render('displayCRUD', {
        dataTable: data
    });
}
let geteditCRUD = async (req, res) => {
    let userId = req.query.id

    if (userId) {
        let data = await CRUDServices.getUserById(userId);

        return res.render('editCRUD.ejs', {

            userdata: data
        })

    }
    else {
        return res.send('user not found')
    }
}
let putCRUD = async (req, res) => {

    let allusers = await CRUDServices.updateUserData(req.body);

    return res.render('displayCRUD', {
        dataTable: allusers
    });

}
let getdeleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDServices.deleteUserById(id);
        return res.send("delete user successfully")
    }
    else {
        return res.send('not found')
    }
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    geteditCRUD: geteditCRUD,
    getdeleteCRUD: getdeleteCRUD,
    putCRUD: putCRUD
}