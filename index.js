const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),

app= express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json());
const nodemailer = require("nodemailer");

const port = 6003;

app.post('/sendMail', async (req, res) => {
    
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "sender mail id", // sender mail id
                pass: "sender mail password", // sender mail password
            },
        });

        let info = await transporter.sendMail({
            from: "sender mail id (from mail id)", // sender mail id (from mail id)
            to: "receiver mail id (to mail id)", // receiver mail id (to mail id)
            subject: "Welcome ✔", // Subject line
            text: "Welcome !", // plain text body
            html: "<b>Welcome !</b>", // html body
        });

        res.send({"status": true, "message": "Successfully send"});

        console.log("Message sent: %s", info.messageId);
    } catch(ex) {
        res.send({"status": false, "message": ex});
    }
});

app.listen(port, () => {
    console.log("Server is listening on port" +port);
});