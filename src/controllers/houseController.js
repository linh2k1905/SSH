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
let handleEditHouse = async (req, res) => {
    let data = req.body;
    let message = await houseSerVice.editHouse(data);
    return res.status(200).json(message)


}
module.exports = {
    getListLatestHouse: getListLatestHouse,
    handleEditHouse: handleEditHouse
}