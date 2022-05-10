import houseSerVice from '../services/houseSerVice'
let getListLatestHouse = async (req, res) => {



    try {
        let response = await houseSerVice.getLastestHome();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            message: 'Lỗi của máy chủ'

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
            message: 'Lỗi của máy chủ'

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
let getBlockUserHasPostUnvailable = async (req, res) => {
    let q = req.body;
    let message = await houseSerVice.getBlockUserHasPostUnvailable(q);
    return res.status(200).json(message);


}
let handleDeleteHouse = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errorCode: 1,
            messageCode: " Không tìm thấy kết quả"
        })

    }
    let message = await houseSerVice.deleteHouse(req.body.id);
    return res.status(200).json(message)
}
let getFilterHouse = async (req, res) => {
    console.log(req.query);

    try {
        if (req.query) {
            let response = await houseSerVice.getFilterHouse(req.query);
            return res.status(200).json(response);

        }


    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            message: 'Lỗi của máy chủ'

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
            message: 'Lỗi của máy chủ'

        })

    }


}
let getListHouseByCity = async (req, res) => {
    try {
        let response = await houseSerVice.getListHouseByCity(req.query);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            message: 'Lỗi của máy chủ'

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
            message: 'Lỗi của máy chủ'

        })

    }


}


let getListHouseMobile = async (req, res) => {



    try {
        let response = await houseSerVice.getAllHomeMobile();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            message: 'Lỗi của máy chủ'

        })

    }
}
let getFilterHouseFromHomeMobile = async (req, res) => {
    try {
        let response = await houseSerVice.getFilterHouseFromHomeMobile(req.query);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            message: 'Lỗi của máy chủ'

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
    getAllTypeHouseById: getAllTypeHouseById,
    getListHouseMobile: getListHouseMobile,
    getFilterHouseFromHomeMobile: getFilterHouseFromHomeMobile,
    getListHouseByCity: getListHouseByCity,
    getBlockUserHasPostUnvailable: getBlockUserHasPostUnvailable
}