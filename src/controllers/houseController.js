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
module.exports = {
    getListLatestHouse: getListLatestHouse
}