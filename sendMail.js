var nodemailer = require('nodemailer');

const sendMail = (email) => {
    const option = {
        service: 'gmail',
        auth: {
            user: 'phuonghd@vnext.vn',
            pass: 'ybqlsgdigmprnfbj'
        }
    };
    var transporter = nodemailer.createTransport(option);

    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            var mail = {
                from: 'phuonghd@vnext.vn',
                to: email,
                subject: 'Đăng ký user thành công',
                text: 'Bạn đã đăng ký user thành công. Vui lòng đăng nhập để được sử dụng',
            };

            transporter.sendMail(mail, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    });
}

module.exports = sendMail;
