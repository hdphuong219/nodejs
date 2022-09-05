const express = require('express');
const router = express.Router();
const db = require('./dbConnection');
const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail')
const bcrypt = require('bcrypt');
require('dotenv').config()

router.post('/login', (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
        (err, result) => {
            // user does not exists
            if (err) {
                throw err;
            }
            if (!result.length) {
                return res.status(200).send({
                    success: false,
                    message: 'This email does not exist'
                });
            } else {
                // check password
                const passRequest = req.body.password;
                const passCheck = result[0]['password'];
                const verified = bcrypt.compareSync(passRequest, passCheck);

                // const expiresAt = new Date();
                // const abc = expiresAt.setHours(expiresAt.getHours() + 12)
                // console.log(abc);

                if (verified) {
                    const accessToken = jwt.sign({ id: result[0].id },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '12h' });
                    db.query(
                        `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                    );
                    return res.status(200).send({
                        success: true,
                        data: {
                            message: 'Logged in successfully!',
                            accessToken,
                            user: result[0]
                        }
                    });
                } else {
                    return res.status(200).send({
                        success: false,
                        message: 'Password is incorrect'
                    });
                }
            }

        }
    );
});

router.post('/register', (req, res) => {
    db.query(
        `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
        (err, result) => {
            // user does not exists
            if (err) {
                throw err;
            }
            if (result.length) {
                return res.status(200).send({
                    success: false,
                    message: 'Email này đã được đăng ký'
                });
            } else {
                const name = req.body.name;
                const email = req.body.email;
                const password = bcrypt.hashSync(req.body.password, 8);
                const sql = `INSERT INTO users (name, email, password) VALUES ('${name}','${email}', '${password}')`
                db.query(sql, (er, rs) => {
                    if (er) throw er;
                    sendMail(req.body.email)
                    return res.status(200).send({
                        success: true,
                        message: "Đăng ký thành công, vui lòng check mail"
                    });
                });
            }
        }
    );
});


router.get("/user", authenToken)

module.exports = router;