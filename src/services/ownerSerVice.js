import db from '../models/index';
import _ from 'lodash';
let getTopOwnertoHome = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({

                where: { roleId: +2 },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Role, as: 'RoleId', attributes: ['name', 'roleVi'] }
                ],
                raw: true,
                nest: true



            });
            resolve({
                errorCode: 0,
                data: users
            });


        } catch (error) {
            reject({
                errorCode: 1,
                messageCode: ' Loi' + error
            })
        }


    })
}
let createBulkSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.formatDate || !data.idOwner || !data.arrTime) {
                resolve({
                    errorCode: 1,
                    errMessage: "Missing required param!"
                })

            }
            else {
                let schedule = data.arrTime;
                let existing = await db.Schedule.findAll({
                    where: {
                        idOwner: data.idOwner,
                        date: data.formatDate
                    },
                    attributes: ['date', 'time', 'idOwner'],
                    raw: true
                })
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.time === b.time && a.date === b.date && a.idOwner === b.idOwner
                });
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }
                resolve({
                    errorCode: 0,
                    messageCode: "Ok "
                })

            }



        } catch (error) {
            reject(error);
        }
    })




}

let getScheduleOwner = (id, date) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!id || !date) {
                resolve({
                    errorMessage: "Vui lòng điền đủ thông tin",
                    errorCode: 0

                })
            }
            let schedules = await db.Schedule.findAll({

                where: {
                    idOwner: id,
                    date: date

                },




            });
            resolve({
                errorCode: 0,
                data: schedules
            });


        } catch (error) {
            reject({
                errorCode: 1,
                messageCode: ' Loi' + error
            })
        }


    })
}
module.exports = {

    getTopOwnertoHome: getTopOwnertoHome,
    createBulkSchedule: createBulkSchedule,
    getScheduleOwner: getScheduleOwner
}