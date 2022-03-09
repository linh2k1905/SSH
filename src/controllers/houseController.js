import houseSerVice from '../services/houseSerVice'
let getListLatestHouse = async (req, res) => {



    try {
        let response = await houseSerVice.getLastestHome();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            message: 'Error from Server!!!'

        })

    }
}
let getListHouse = async (req, res) => {



    try {
        let response = await houseSerVice.getAllHome();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            message: 'Error from Server!!!'

        })

    }
}
let handleEditHouse = async (req, res) => {
    let data = req.body;
    let message = await houseSerVice.editHouse(data);
    return res.status(200).json(message)


}
let getDetailHouseById = async (req, res) => {
    let idHouse = req.query.id;
    let message = await houseSerVice.getDetailHouse(idHouse);
    return res.status(200).json(message)


}
let handleDeleteHouse = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errorCode: 1,
            messageCode: " House not found"
        })

    }
    let message = await houseSerVice.deleteHouse(req.body.id);
    return res.status(200).json(message)
}
let getFilterHouse = async (req, res) => {



    try {

        let response = await houseSerVice.getFilterHouse(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            message: 'Error from Server!!!'

        })

    }
}
let getFilterHouseFromHome = async (req, res) => {
    try {
        let response = await houseSerVice.getFilterHouseFromHome(req.query);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            message: 'Error from Server!!!'

        })

    }


}

let getAllTypeHouseById = async (req, res) => {
    try {
        let response = await houseSerVice.getAllTypeHouseById(req.query.id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            message: 'Error from Server!!!'

        })

    }


}
module.exports = {
    getListLatestHouse: getListLatestHouse,
    handleEditHouse: handleEditHouse,
    getDetailHouseById: getDetailHouseById,
    handleDeleteHouse: handleDeleteHouse,
    getListHouse: getListHouse,
    getFilterHouse: getFilterHouse,
    getFilterHouseFromHome: getFilterHouseFromHome,
    getAllTypeHouseById: getAllTypeHouseById
}