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
                console.log(schedule);
                let existing = await db.Schedule.findAll({
                    where: {
                        idOwner: data.idOwner,
                        date: data.formatDate
                    },
                    attributes: ['date', 'time', 'idOwner'],
                    raw: true
                })
                if (existing && existing.length > 0) {
                    existing = existing.map(item => {
                        item.date = new Date(item.date).getTime();
                        return item;
                    })
                }

                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.time === b.time && a.date === b.date
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
module.exports = {

    getTopOwnertoHome: getTopOwnertoHome,
    createBulkSchedule: createBulkSchedule
}