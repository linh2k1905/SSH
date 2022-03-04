import ownerService from '../services/ownerSerVice'
let getTopOwnertoHome = async (req, res) => {



    try {
        let response = await ownerService.getTopOwnertoHome();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errorCode: -1,
            message: 'Error from Server!!!'

        })

    }
}
let createBulkSchedule = async (req, res) => {



    try {
        let response = await ownerService.createBulkSchedule(req.body);
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
    getTopOwnertoHome: getTopOwnertoHome,
    createBulkSchedule: createBulkSchedule
}