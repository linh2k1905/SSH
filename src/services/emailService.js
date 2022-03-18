require('dotenv').config();
const nodemailer = require("nodemailer");
// async..await is not allowed in global scope, must use a wrapper

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
let sendSimpleEmail = async (datasend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });
    let info = await transporter.sendMail({
        from: '"Xác nhận lịch hẹn trên web Phongtro123" <linhb1809144@ctu.edu.vn>', // sender address
        to: datasend.recieverEmail, // list of receivers
        subject: "Thông tin đặt lịch hẹn với chủ phòng trọ ", // Subject line
        html:

            `
        <p>Xin chào . Tên nhà trọ: ${datasend.name}</p>
        <p>Địa chỉ nhà trọ ${datasend.address}</p>
        <p>Chủ nhà trọ :${datasend.ownerName}</p>
        <p>Thời gian: ${datasend.time}</p>
        <a href="#">Nhấn để xác nhận</a>
        
        
        `
    });


}
module.exports = {
    sendSimpleEmail: sendSimpleEmail

}

